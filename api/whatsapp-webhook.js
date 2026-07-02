/**
 * Gadia Granites - WhatsApp Business API Webhook Handler
 * 
 * Powered by: Gemini 2.5 Flash API
 * Platform: Vercel Serverless Function (Node.js 18+)
 * 
 * This file handles:
 * 1. Webhook Verification (GET request from Meta)
 * 2. Message Processing (POST request from Meta):
 *    - Parses text, button replies, or image uploads.
 *    - Calls Gemini API with the Master Sales Consultant context and product catalog.
 *    - Dispatches response messages/buttons back to the user via WhatsApp Graph API.
 * 
 * Environment Variables required:
 * - WHATSAPP_VERIFY_TOKEN: Token you define in the Meta Developer Console
 * - WHATSAPP_ACCESS_TOKEN: System User Access Token from Meta (Permanent)
 * - WHATSAPP_PHONE_NUMBER_ID: ID of your business phone number
 * - GEMINI_API_KEY: Your Google Gemini API Key
 * - KV_REST_API_URL & KV_REST_API_TOKEN: (Optional) Vercel KV / Upstash Redis for multi-message session history
 */

// Stone Catalog Database Context for the Gemini AI
const STONE_CATALOG = `
- Black Galaxy Granite:
  * Pattern: Gold/copper metallic flecks on obsidian black canvas
  * Best for: Kitchen countertops, luxury flooring, high-traffic counters
  * Strength: 154 MPa (Extreme Durability)
  * Price: ₹300 - ₹350/sq.ft.
  * Availability: In Stock (Jaipur Godown)
  
- Absolute Black Granite:
  * Pattern: Pure, solid uniform deep black
  * Best for: Minimalist designs, vanity countertops, commercial flooring
  * Strength: 172 MPa (Very high density)
  * Price: ₹280 - ₹320/sq.ft.
  * Availability: In Stock

- Kashmir White Granite:
  * Pattern: Soft grey veins and deep red garnet speckles on a white canvas
  * Best for: Flooring, columns, hotel lobbies, kitchen counters
  * Strength: 135 MPa
  * Price: ₹240 - ₹280/sq.ft.
  * Availability: In Stock

- Indian Green Marble:
  * Pattern: Dark forest green background with rich serpentine veins
  * Best for: Accent walls, bathroom vanity, fireplace surrounds, flooring
  * Strength: 124 MPa (Softer than Granite)
  * Price: ₹180 - ₹220/sq.ft.
  * Availability: In Stock

- Makrana White Marble:
  * Pattern: Luminous white calcite with subtle grey veins (Taj Mahal marble)
  * Best for: High-end residential floors, temples, spiritual rooms, sculptures
  * Strength: 146 MPa (Develops natural shine over time)
  * Price: ₹450 - ₹650/sq.ft.
  * Availability: On Order / Custom Sawn

- Kota Blue Stone:
  * Pattern: Consistent earthy blue-grey limestone
  * Best for: Public corridors, patios, exterior landscaping, industrial flooring
  * Strength: 138 MPa (Non-slip, oil-resistant, highly durable)
  * Price: ₹45 - ₹75/sq.ft.
  * Availability: In Stock (45,000 sq.ft. ready)
`;

// Simple memory-based session store fallback (resets on serverless recycle)
const localSessionStore = {};

export default async function handler(req, res) {
  // 1. WEBHOOK VERIFICATION (GET)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
      if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
        console.log('Webhook Verified Successfully.');
        return res.status(200).send(challenge);
      } else {
        return res.status(403).json({ error: 'Verification token mismatch' });
      }
    }
    return res.status(400).json({ error: 'Missing webhook params' });
  }

  // 2. MESSAGE PROCESSING (POST)
  if (req.method === 'POST') {
    try {
      const body = req.body;

      // Check if this is a WhatsApp status update or event payload
      if (!body.object || !body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
        return res.status(200).json({ status: 'ignored_payload' });
      }

      const value = body.entry[0].changes[0].value;
      const message = value.messages[0];
      const customerPhone = message.from;
      const customerName = value.contacts?.[0]?.profile?.name || 'Customer';
      
      // Determine input message content
      let customerText = '';
      if (message.type === 'text') {
        customerText = message.text.body;
      } else if (message.type === 'button') {
        customerText = message.button.text; // Quick replies
      } else if (message.type === 'interactive' && message.interactive.type === 'button_reply') {
        customerText = message.interactive.button_reply.title; // Interactive buttons
      } else if (message.type === 'image') {
        customerText = "[Simulated Photo Attachment]"; // Image upload indicator
      }

      if (!customerText) {
        return res.status(200).json({ status: 'no_supported_text' });
      }

      // Retrieve conversation history
      const history = await getSessionHistory(customerPhone);
      history.push({ role: 'user', content: customerText });

      // Generate response using Gemini API
      const aiResponseText = await generateGeminiAIResponse(customerName, history);
      history.push({ role: 'model', content: aiResponseText });

      // Persist session history
      await saveSessionHistory(customerPhone, history);

      // Dispatch message back via WhatsApp Cloud API
      await sendWhatsAppMessage(customerPhone, aiResponseText);

      return res.status(200).json({ status: 'success' });
    } catch (error) {
      console.error('Webhook processing error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}

/**
 * Calls Gemini 2.5 Flash to generate the showroom assistant's response.
 */
async function generateGeminiAIResponse(clientName, history) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY env variable.");
  }

  // Build full system prompt + catalog + chat logs
  const systemInstruction = `You are "Gadia Stone Consultant", an experienced showroom manager representing Gadia Granites (based in Jaipur, Rajasthan, India) with 20+ years of stone sales expertise.

Your objective is NOT to push immediate sales. You are a trusted interior consultant. Help the client find the right material (Granite vs Marble vs Kota Stone etc.), matching color, and estimated costs based on their project needs.

SALES RULES & BEHAVIOR:
- Ask questions sequentially. Never dump multiple questions.
- Keep answers concise, formatted with bullet points, and highly professional.
- Recommend Granite for: kitchens, high-traffic flooring, rentals, commercial surfaces.
- Recommend Marble for: luxury accent walls, living rooms, temples, custom carvings.
- Recommend Kota Stone/Sandstone for: budget corridors, outdoor gardens, landscaping.
- Remember client inputs. Do not repeat questions (e.g. if they say they want a kitchen countertop, never ask what area they are installing it in).
- When giving recommendations, show maximum 3 products from the catalog. Explain WHY each suits the project.

AVAILABLE STONE CATALOG:
${STONE_CATALOG}

Client Name: ${clientName}
`;

  // Format history for the Gemini API
  const contents = history.map(msg => ({
    role: msg.role === 'model' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: contents,
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.2 // Lower temp for factual, consistent sales consulting
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error: ${response.status} - ${errText}`);
  }

  const result = await response.json();
  return result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, let's try that again. How can I help you choose your stone?";
}

/**
 * Sends a message back to the customer's phone via Meta WhatsApp Cloud API.
 */
async function sendWhatsAppMessage(recipientPhone, textContent) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneId) {
    console.warn("WhatsApp credentials missing. Logging AI response instead:");
    console.log(`[To: ${recipientPhone}]: ${textContent}`);
    return;
  }

  const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;

  // WhatsApp Message structure (sending text, supports markdown)
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhone,
    type: "text",
    text: {
      preview_url: false,
      body: textContent
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error(`WhatsApp Send Error: ${response.status} - ${errText}`);
  }
}

/**
 * Session persistence helper using memory or Redis.
 */
async function getSessionHistory(phone) {
  // If Vercel KV (Upstash Redis) is available, use it for persistent storage
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const url = `${process.env.KV_REST_API_URL}/get/session_${phone}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.result) {
          return JSON.parse(data.result);
        }
      }
    } catch (e) {
      console.warn("Redis read failed, falling back to local memory:", e);
    }
  }

  // Memory fallback
  return localSessionStore[phone] || [];
}

async function saveSessionHistory(phone, history) {
  // Keep history truncated to last 20 messages to keep contexts small
  const trimmed = history.slice(-20);

  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const url = `${process.env.KV_REST_API_URL}/set/session_${phone}`;
      await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
        body: JSON.stringify(trimmed)
      });
      return;
    } catch (e) {
      console.warn("Redis write failed:", e);
    }
  }

  // Memory fallback
  localSessionStore[phone] = trimmed;
}
