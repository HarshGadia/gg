/**
 * Gadia Granites - Twilio WhatsApp API Webhook Handler
 * 
 * Powered by: Gemini 2.5 Flash API
 * Platform: Vercel Serverless Function (Node.js 18+)
 * 
 * This file handles:
 * 1. Webhook parsing of incoming WhatsApp messages from Twilio.
 * 2. Calling Gemini API with the Master Sales Consultant context and product catalog.
 * 3. Replying to the customer using Twilio's TwiML (XML) response or Twilio REST API.
 * 
 * Environment Variables required in Vercel:
 * - TWILIO_ACCOUNT_SID: Found on your Twilio Console home page
 * - TWILIO_AUTH_TOKEN: Found on your Twilio Console home page
 * - TWILIO_SENDER_NUMBER: Your Twilio WhatsApp number (e.g. whatsapp:+14155238886 for Sandbox)
 * - GEMINI_API_KEY: Your Google Gemini API Key
 * - KV_REST_API_URL & KV_REST_API_TOKEN: (Optional) Vercel KV / Upstash Redis for session memory
 */

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

// Session store fallback
const localSessionStore = {};

export default async function handler(req, res) {
  // Twilio sends data as URL-encoded form parameters (POST method)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const body = req.body;

    // Verify this is an incoming message from Twilio
    if (!body.From || !body.Body) {
      console.warn("Invalid webhook payload received:", body);
      return res.status(400).send("Missing Twilio message parameters.");
    }

    const customerPhone = body.From.replace('whatsapp:', ''); // e.g. "+919999999999"
    const customerName = body.ProfileName || 'Customer';
    const customerText = body.Body.trim();

    console.log(`Received message from ${customerName} (${customerPhone}): "${customerText}"`);

    // 1. Retrieve Conversation History
    const history = await getSessionHistory(customerPhone);
    history.push({ role: 'user', content: customerText });

    // 2. Call Gemini API to generate response
    const aiResponseText = await generateGeminiAIResponse(customerName, history);
    history.push({ role: 'model', content: aiResponseText });

    // 3. Save Conversation History
    await saveSessionHistory(customerPhone, history);

    // 4. Send Message Back to WhatsApp
    // Method A: Return XML TwiML directly in the response (Free, Instant, Serverless-friendly)
    res.setHeader('Content-Type', 'text/xml');
    const twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${escapeXml(aiResponseText)}</Message>
</Response>`;
    
    return res.status(200).send(twimlResponse);

  } catch (error) {
    console.error('Twilio Webhook Error:', error);
    // Send basic error reply via Twilio XML so the user isn't stuck
    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Sorry, I encountered an issue processing your request. Please try again in a moment.</Message>
</Response>`);
  }
}

/**
 * Call Gemini 2.5 Flash to generate response.
 */
async function generateGeminiAIResponse(clientName, history) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY env variable.");
  }

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
        temperature: 0.2
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
 * Session persistence helper using memory or Redis.
 */
async function getSessionHistory(phone) {
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

  return localSessionStore[phone] || [];
}

async function saveSessionHistory(phone, history) {
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

  localSessionStore[phone] = trimmed;
}

/**
 * Escapes characters for XML safety.
 */
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}
