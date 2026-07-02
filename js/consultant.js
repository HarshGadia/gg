// WhatsApp-based AI Stone Selection & Sales Assistant
// Mock Simulation logic for Gadia Granites Web Showroom

document.addEventListener('DOMContentLoaded', () => {
  // Grab PRODUCTS_DATA from products-v2.js (fallback if not loaded)
  const products = window.PRODUCTS_DATA || [
    { id: 'black-galaxy', name: 'Black Galaxy Granite', material: 'Granite', color: 'Black', finishes: ['Polished'], applications: ['Countertop', 'Flooring'], origin: 'Andhra Pradesh', stockArea: '14,250 Sq.Ft.', description: 'Gold flecks on black', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', waterAbsorption: '0.02%', compressiveStrength: '154 MPa', pattern: 'Speckled' },
    { id: 'absolute-black', name: 'Absolute Black Granite', material: 'Granite', color: 'Black', finishes: ['Polished'], applications: ['Countertop', 'Wall Cladding'], origin: 'Rajasthan', stockArea: '22,400 Sq.Ft.', description: 'Pure solid black', image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80', waterAbsorption: '0.01%', compressiveStrength: '172 MPa', pattern: 'Solid' },
    { id: 'kashmir-white', name: 'Kashmir White Granite', material: 'Granite', color: 'White', finishes: ['Polished'], applications: ['Flooring', 'Countertop'], origin: 'Tamil Nadu', stockArea: '9,800 Sq.Ft.', description: 'White grey speckles', image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80', waterAbsorption: '0.12%', compressiveStrength: '135 MPa', pattern: 'Speckled' },
    { id: 'indian-green', name: 'Indian Green Marble', material: 'Marble', color: 'Green', finishes: ['Polished'], applications: ['Wall Cladding', 'Flooring'], origin: 'Udaipur', stockArea: '11,100 Sq.Ft.', description: 'Forest green with veins', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', waterAbsorption: '0.15%', compressiveStrength: '124 MPa', pattern: 'Veined' },
    { id: 'makrana-white', name: 'Makrana White Marble', material: 'Marble', color: 'White', finishes: ['Polished'], applications: ['Flooring', 'Temples'], origin: 'Makrana', stockArea: 'On request', description: 'Pure white calcite', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', waterAbsorption: '0.04%', compressiveStrength: '146 MPa', pattern: 'Veined' },
    { id: 'kota-blue', name: 'Kota Blue Stone', material: 'Kota Stone', color: 'Blue', finishes: ['Honed', 'Polished'], applications: ['Flooring', 'Exterior'], origin: 'Kota', stockArea: '45,000 Sq.Ft.', description: 'Earthy blue-grey limestone', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80', waterAbsorption: '0.06%', compressiveStrength: '138 MPa', pattern: 'Consistent' }
  ];

  // Price points for estimation (mock, per sq.ft.)
  const PRICE_RANGES = {
    'black-galaxy': { min: 300, max: 350 },
    'absolute-black': { min: 280, max: 320 },
    'kashmir-white': { min: 240, max: 280 },
    'indian-green': { min: 180, max: 220 },
    'makrana-white': { min: 450, max: 650 },
    'kota-blue': { min: 45, max: 75 },
    'kota-brown': { min: 50, max: 80 },
    'yellow-sandstone': { min: 90, max: 130 },
    'pink-sandstone': { min: 95, max: 135 },
    'desert-brown': { min: 140, max: 180 }
  };

  // State Management
  let sessionState = {
    step: 0,
    clientName: 'Guest Customer',
    projectType: '',
    area: '',
    style: '',
    color: '',
    budget: '',
    priorities: [],
    shortlist: [],
    currentEstimate: null
  };

  // DOM Elements
  const chatBody = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  const typingBubble = document.getElementById('typing-bubble');
  const attachmentTrigger = document.getElementById('attachment-trigger');
  const attachmentDropdown = document.getElementById('attachment-dropdown');
  const chatImagePreview = document.getElementById('chat-image-preview');
  const previewThumb = document.getElementById('preview-thumb');
  const previewTime = document.getElementById('preview-time');

  // Console Side Panel DOM Elements
  const consoleName = document.getElementById('console-name');
  const consoleProject = document.getElementById('console-project');
  const consoleArea = document.getElementById('console-area');
  const consoleStyle = document.getElementById('console-style');
  const consoleColor = document.getElementById('console-color');
  const consoleBudget = document.getElementById('console-budget');
  const consoleShortlistContainer = document.getElementById('console-shortlist-container');
  const shortlistEmpty = document.getElementById('shortlist-empty');
  const handoffWhatsappBtn = document.getElementById('handoff-whatsapp-btn');

  // Comparison & Calculator UI Sections
  const consoleEstimatorSection = document.getElementById('console-estimator-section');
  const consoleCalcStone = document.getElementById('console-calc-stone');
  const consoleCalcDims = document.getElementById('console-calc-dims');
  const consoleCalcArea = document.getElementById('console-calc-area');
  const consoleCalcMaterialCost = document.getElementById('console-calc-material-cost');
  const consoleCalcWaste = document.getElementById('console-calc-waste');
  const consoleCalcTotal = document.getElementById('console-calc-total');

  const consoleComparisonSection = document.getElementById('console-comparison-section');
  const compHeader1 = document.getElementById('comp-header-1');
  const compHeader2 = document.getElementById('comp-header-2');
  const comparisonTableBody = document.getElementById('comparison-table-body');

  // Images for Room Simulation uploads
  const mockRoomImages = {
    kitchen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    bathroom: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80',
    staircase: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
  };

  // Helper: Format Time
  function getFormattedTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  }

  // Helper: Scroll Chat to Bottom
  function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Show/Hide Typing Indicator
  function showTyping() {
    typingBubble.style.display = 'block';
    scrollToBottom();
  }

  function hideTyping() {
    typingBubble.style.display = 'none';
  }

  // Render a Text Message Bubble
  function addMessageBubble(sender, text) {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', sender);
    bubble.innerHTML = `${text.replace(/\n/g, '<br>')}<span class="bubble-time">${getFormattedTime()}</span>`;
    chatBody.appendChild(bubble);
    scrollToBottom();
  }

  // Render Quick Reply Buttons
  function addQuickReplyButtons(options, callback) {
    const container = document.createElement('div');
    container.classList.add('chat-buttons-container');
    
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.classList.add('chat-btn-option');
      btn.innerText = opt;
      btn.addEventListener('click', () => {
        // Disable other buttons in this set
        const siblingButtons = container.querySelectorAll('.chat-btn-option');
        siblingButtons.forEach(b => {
          b.disabled = true;
          if (b !== btn) b.style.opacity = '0.5';
        });
        btn.classList.add('selected');
        
        // Handle selection
        callback(opt);
      });
      container.appendChild(btn);
    });
    chatBody.appendChild(container);
    scrollToBottom();
  }

  // Update Right Console Lead Qualification Data
  function updateConsoleLead() {
    consoleName.innerText = sessionState.clientName;
    consoleProject.innerText = sessionState.projectType || '-';
    consoleArea.innerText = sessionState.area || '-';
    consoleStyle.innerText = sessionState.style || '-';
    consoleColor.innerText = sessionState.color || '-';
    consoleBudget.innerText = sessionState.budget || '-';
    
    updateHandoffLink();
  }

  // Handle Handoff Link Update
  function updateHandoffLink() {
    let messageText = `Hi Gadia Granites, I completed a Stone Showroom consultation with your AI Assistant.\n\n`;
    messageText += `*Lead Summary:*\n`;
    messageText += `• *Name:* ${sessionState.clientName}\n`;
    messageText += `• *Project:* ${sessionState.projectType || 'Not specified'}\n`;
    messageText += `• *Area:* ${sessionState.area || 'Not specified'}\n`;
    messageText += `• *Style:* ${sessionState.style || 'Not specified'}\n`;
    messageText += `• *Color:* ${sessionState.color || 'Not specified'}\n`;
    messageText += `• *Budget:* ${sessionState.budget || 'Not specified'}\n\n`;
    
    if (sessionState.shortlist.length > 0) {
      messageText += `*Shortlisted Stones:*\n`;
      sessionState.shortlist.forEach(stone => {
        messageText += `• ${stone.name} (${stone.material})\n`;
      });
      messageText += `\n`;
    }
    
    if (sessionState.currentEstimate) {
      const est = sessionState.currentEstimate;
      messageText += `*Cost Estimate Summary:*\n`;
      messageText += `• *Selected Stone:* ${est.stoneName}\n`;
      messageText += `• *Dimensions:* ${est.length} x ${est.width} ${est.unit}\n`;
      messageText += `• *Area:* ${est.totalArea} sq.ft.\n`;
      messageText += `• *Estimated Price Range:* ₹${est.totalCostMin} - ₹${est.totalCostMax}\n\n`;
    }
    
    messageText += `Please schedule a consultation call with me.`;
    
    // Gadia Granites Real Sales Hotline (placeholder: 919999999999)
    const encodedText = encodeURIComponent(messageText);
    handoffWhatsappBtn.href = `https://wa.me/919999999999?text=${encodedText}`;
  }

  // Chat State Machine Flow
  function proceedWorkflow() {
    showTyping();
    setTimeout(() => {
      hideTyping();
      
      switch (sessionState.step) {
        case 0:
          addMessageBubble('ai', `Hi 👋 Welcome to Gadia Granites!
          
I'd love to help you find the perfect stone for your project.

Let's narrow it down together in just a couple of minutes.`);
          
          showTyping();
          setTimeout(() => {
            hideTyping();
            addMessageBubble('ai', `What type of project are you working on?`);
            addQuickReplyButtons(['🏡 New Home', '🏠 Renovation', '🏢 Commercial Space', '🏨 Hotel/Villas', '👷 Builder/Architect Project'], (selected) => {
              // Post user selection
              addMessageBubble('user', selected);
              sessionState.projectType = selected.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, '').trim(); // Remove emojis
              updateConsoleLead();
              
              // Proceed to Step 1
              sessionState.step = 1;
              proceedWorkflow();
            });
          }, 800);
          break;
          
        case 1:
          addMessageBubble('ai', `Got it! Which area are you looking to install the stone in?`);
          addQuickReplyButtons(['Kitchen Countertop', 'Flooring', 'Living Room / Accent Wall', 'Bathroom vanity/cladding', 'Staircase', 'Outdoor / Garden Area', 'Temple'], (selected) => {
            addMessageBubble('user', selected);
            sessionState.area = selected;
            updateConsoleLead();
            
            sessionState.step = 2;
            proceedWorkflow();
          });
          break;
          
        case 2:
          addMessageBubble('ai', `What kind of aesthetic or look are you aiming for in this space?`);
          addQuickReplyButtons(['Modern & Sleek', 'Luxury & Grand', 'Minimalist', 'Traditional', 'Rustic & Organic', 'Not Sure'], (selected) => {
            addMessageBubble('user', selected);
            sessionState.style = selected;
            updateConsoleLead();
            
            sessionState.step = 3;
            proceedWorkflow();
          });
          break;
          
        case 3:
          addMessageBubble('ai', `Do you have a preferred stone color in mind?`);
          addQuickReplyButtons(['White & Light Grey', 'Obsidian Black', 'Earthy Browns / Beige', 'Vibrant Green / Blue', 'No Preference'], (selected) => {
            addMessageBubble('user', selected);
            sessionState.color = selected;
            updateConsoleLead();
            
            sessionState.step = 4;
            proceedWorkflow();
          });
          break;
          
        case 4:
          addMessageBubble('ai', `Which option best matches your budget per square foot?`);
          addQuickReplyButtons(['Budget Friendly (₹45 - ₹150)', 'Balanced (₹150 - ₹300)', 'Premium (₹300 - ₹450)', 'Luxury Calcite (₹450+)', 'Not Sure Yet'], (selected) => {
            addMessageBubble('user', selected);
            sessionState.budget = selected;
            updateConsoleLead();
            
            sessionState.step = 5;
            proceedWorkflow();
          });
          break;
          
        case 5:
          addMessageBubble('ai', `And what's most important to you for this stone?`);
          addQuickReplyButtons(['Easy Maintenance & Cleaning', 'Luxury Gloss & Reflection', 'Unique Natural Veins', 'Maximum Scratch Resistance', 'Weather Proof (Outdoors)'], (selected) => {
            addMessageBubble('user', selected);
            sessionState.priorities.push(selected);
            
            sessionState.step = 6;
            proceedWorkflow();
          });
          break;
          
        case 6:
          addMessageBubble('ai', `Thank you! Based on your parameters:
• *Project:* ${sessionState.projectType}
• *Area:* ${sessionState.area}
• *Color:* ${sessionState.color}
• *Budget:* ${sessionState.budget}

Here are the top 3 premium recommendations from our Jaipur stockyard that match your requirements perfectly:`);
          
          showTyping();
          setTimeout(() => {
            hideTyping();
            
            // Generate Recommendations
            const recStones = generateRecommendations();
            recStones.forEach(stone => {
              renderProductCard(stone);
            });
            
            showTyping();
            setTimeout(() => {
              hideTyping();
              addMessageBubble('ai', `What would you like to do next with these recommendations?`);
              addQuickReplyButtons(['Estimate Cost', 'Compare Stones', 'Talk to Expert', 'Start Over'], (selected) => {
                handlePostRecAction(selected);
              });
            }, 1200);
            
          }, 1500);
          break;
      }
    }, 1000);
  }

  // Recommendation Generation Engine (Dynamic Matcher)
  function generateRecommendations() {
    let matches = [];
    const matPref = sessionState.area.toLowerCase();
    const colorPref = sessionState.color.toLowerCase();
    const budgetPref = sessionState.budget.toLowerCase();
    
    // Filter logic
    products.forEach(stone => {
      let score = 0;
      
      // Material & Application mapping
      if (matPref.includes('kitchen') && stone.material === 'Granite') {
        score += 3; // Granite is highly suited for kitchens
      } else if (matPref.includes('kitchen') && stone.material === 'Marble') {
        score += 1; // Marble gets lower score for kitchens
      } else if (matPref.includes('bathroom') && stone.material === 'Granite') {
        score += 2;
      } else if (matPref.includes('bathroom') && stone.material === 'Marble') {
        score += 3;
      } else if (matPref.includes('flooring') && stone.material === 'Marble') {
        score += 3;
      } else if (matPref.includes('flooring') && stone.material === 'Kota Stone') {
        score += 3;
      } else if (matPref.includes('outdoor') && stone.material === 'Kota Stone') {
        score += 3;
      } else if (matPref.includes('outdoor') && stone.material === 'Sandstone') {
        score += 3;
      }
      
      // Color matching
      const stoneColor = stone.color.toLowerCase();
      if (colorPref.includes('black') && stoneColor === 'black') score += 3;
      else if (colorPref.includes('white') && stoneColor === 'white') score += 3;
      else if (colorPref.includes('brown') && stoneColor === 'brown') score += 3;
      else if (colorPref.includes('green') && stoneColor === 'green') score += 3;
      else if (colorPref.includes('blue') && stoneColor === 'blue') score += 3;
      
      // Budget tier matching
      const priceRange = PRICE_RANGES[stone.id] || { min: 100, max: 150 };
      if (budgetPref.includes('budget') && priceRange.min < 150) score += 4;
      else if (budgetPref.includes('balanced') && priceRange.min >= 150 && priceRange.min <= 300) score += 4;
      else if (budgetPref.includes('premium') && priceRange.min >= 250 && priceRange.min <= 450) score += 4;
      else if (budgetPref.includes('luxury') && priceRange.min >= 450) score += 4;
      
      stone.score = score;
      matches.push(stone);
    });
    
    // Sort and return top 3
    matches.sort((a, b) => b.score - a.score);
    return matches.slice(0, 3);
  }

  // Render Stone Card inside Chat Box
  function renderProductCard(stone) {
    const card = document.createElement('div');
    card.classList.add('chat-product-card');
    
    const priceRange = PRICE_RANGES[stone.id] || { min: 100, max: 150 };
    
    card.innerHTML = `
      <img src="${stone.image}" class="chat-product-img" alt="${stone.name}">
      <div class="chat-product-content">
        <h4 class="chat-product-title">${stone.name}</h4>
        <div class="chat-product-price">Approx Price: ₹${priceRange.min} - ₹${priceRange.max}/sq.ft.</div>
        <ul class="chat-product-features">
          <li><i class="fa-solid fa-circle-check"></i> ${stone.pattern} pattern</li>
          <li><i class="fa-solid fa-circle-check"></i> Origin: ${stone.origin}</li>
          <li><i class="fa-solid fa-circle-check"></i> Water Abs.: ${stone.waterAbsorption}</li>
          <li><i class="fa-solid fa-circle-check"></i> Stock: ${stone.stockArea}</li>
        </ul>
        <div class="chat-product-actions">
          <button class="chat-product-btn primary add-shortlist-btn" data-id="${stone.id}">Shortlist</button>
          <button class="chat-product-btn secondary chat-compare-btn" data-id="${stone.id}">Compare</button>
        </div>
      </div>
    `;
    
    // Setup Card Button Event Listeners
    const shortlistBtn = card.querySelector('.add-shortlist-btn');
    shortlistBtn.addEventListener('click', () => {
      addToShortlist(stone);
      shortlistBtn.innerText = 'Shortlisted ✓';
      shortlistBtn.disabled = true;
    });

    const compareBtn = card.querySelector('.chat-compare-btn');
    compareBtn.addEventListener('click', () => {
      triggerDirectComparison(stone);
    });

    chatBody.appendChild(card);
    scrollToBottom();
  }

  // Add Stone to Shortlist
  function addToShortlist(stone) {
    // Prevent duplicate entries
    if (sessionState.shortlist.some(s => s.id === stone.id)) return;
    
    sessionState.shortlist.push(stone);
    shortlistEmpty.style.display = 'none';
    
    const item = document.createElement('div');
    item.classList.add('shortlist-item');
    item.setAttribute('data-id', stone.id);
    item.innerHTML = `
      <img src="${stone.image}" class="shortlist-item-img" alt="${stone.name}">
      <div class="shortlist-item-info">
        <h5 class="shortlist-item-title">${stone.name}</h5>
        <p class="shortlist-item-subtitle">${stone.material} · Origin: ${stone.origin.split(',')[0]}</p>
      </div>
      <i class="fa-solid fa-trash shortlist-item-remove" title="Remove"></i>
    `;
    
    item.querySelector('.shortlist-item-remove').addEventListener('click', () => {
      sessionState.shortlist = sessionState.shortlist.filter(s => s.id !== stone.id);
      item.remove();
      if (sessionState.shortlist.length === 0) {
        shortlistEmpty.style.display = 'block';
      }
      updateConsoleLead();
    });

    consoleShortlistContainer.appendChild(item);
    updateConsoleLead();
  }

  // Direct product comparison trigger
  function triggerDirectComparison(stoneA) {
    // Find another stone in the same category or overall top matching to compare
    const listMatches = generateRecommendations();
    const stoneB = listMatches.find(s => s.id !== stoneA.id) || products.find(s => s.id !== stoneA.id);
    
    if (!stoneB) return;
    
    showTyping();
    setTimeout(() => {
      hideTyping();
      addMessageBubble('ai', `Generating Comparison Sheet between *${stoneA.name}* and *${stoneB.name}* in the right panel.`);
      
      // Update Table Headers
      compHeader1.innerText = stoneA.name;
      compHeader2.innerText = stoneB.name;
      
      const priceA = PRICE_RANGES[stoneA.id] || { min: 100, max: 150 };
      const priceB = PRICE_RANGES[stoneB.id] || { min: 100, max: 150 };

      // Generate Table Body
      comparisonTableBody.innerHTML = `
        <tr>
          <td><strong>Material Type</strong></td>
          <td>${stoneA.material}</td>
          <td>${stoneB.material}</td>
        </tr>
        <tr>
          <td><strong>Est. Price</strong></td>
          <td>₹${priceA.min} - ₹${priceA.max}/sq.ft.</td>
          <td>₹${priceB.min} - ₹${priceB.max}/sq.ft.</td>
        </tr>
        <tr>
          <td><strong>Durability/Strength</strong></td>
          <td>${stoneA.compressiveStrength || '140 MPa'}</td>
          <td>${stoneB.compressiveStrength || '135 MPa'}</td>
        </tr>
        <tr>
          <td><strong>Stain/Water Resistance</strong></td>
          <td>${stoneA.waterAbsorption === '0.01%' || stoneA.waterAbsorption === '0.02%' ? 'Excellent (Very High Density)' : 'Good (Requires Sealing)'}</td>
          <td>${stoneB.waterAbsorption === '0.01%' || stoneB.waterAbsorption === '0.02%' ? 'Excellent' : 'Good (Needs Sealing)'}</td>
        </tr>
        <tr>
          <td><strong>Pattern Style</strong></td>
          <td>${stoneA.pattern}</td>
          <td>${stoneB.pattern}</td>
        </tr>
        <tr>
          <td><strong>Typical Finishes</strong></td>
          <td>${stoneA.finishes ? stoneA.finishes.join(', ') : 'Polished'}</td>
          <td>${stoneB.finishes ? stoneB.finishes.join(', ') : 'Polished'}</td>
        </tr>
        <tr>
          <td><strong>Best For</strong></td>
          <td>Kitchen countertops, Flooring, High-traffic</td>
          <td>Living rooms, Accent walls, Decorative flooring</td>
        </tr>
      `;
      
      consoleComparisonSection.style.display = 'block';
      consoleComparisonSection.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  }

  // Handle Action selection post recommendations
  function handlePostRecAction(selectedAction) {
    addMessageBubble('user', selectedAction);
    
    if (selectedAction.includes('Estimate Cost')) {
      showTyping();
      setTimeout(() => {
        hideTyping();
        addMessageBubble('ai', `Sure, I can estimate the material cost for you. Which stone would you like to calculate for?`);
        
        // Show shortlist or recommendations to choose from
        const calcStones = sessionState.shortlist.length > 0 ? sessionState.shortlist : generateRecommendations();
        const stoneOptions = calcStones.map(s => s.name);
        
        addQuickReplyButtons(stoneOptions.slice(0, 3), (selectedStoneName) => {
          addMessageBubble('user', selectedStoneName);
          const chosenStone = products.find(s => s.name === selectedStoneName);
          showCostCalculatorForm(chosenStone);
        });
      }, 800);
      
    } else if (selectedAction.includes('Compare Stones')) {
      const recs = generateRecommendations();
      if (recs.length >= 2) {
        triggerDirectComparison(recs[0]);
      } else {
        addMessageBubble('ai', `Add stones to the showroom shortlist first, then select Compare.`);
      }
      
      // prompt next buttons
      showTyping();
      setTimeout(() => {
        hideTyping();
        addMessageBubble('ai', `Would you like to perform a cost calculation or connect with our stone expert?`);
        addQuickReplyButtons(['Estimate Cost', 'Talk to Expert', 'Start Over'], (selected) => {
          handlePostRecAction(selected);
        });
      }, 1500);
      
    } else if (selectedAction.includes('Talk to Expert')) {
      showTyping();
      setTimeout(() => {
        hideTyping();
        addMessageBubble('ai', `I have qualified your inquiry. Click the green button on the right panel to hand off this chat directly to our showroom sales expert. Or enter your name here to personalize:`);
        
        // Listen for name input
        chatInput.placeholder = "Enter your full name...";
        chatInput.focus();
        
        // Overwrite standard send listener temporarily
        const originalSendHandler = sendBtn.onclick;
        
        sendBtn.onclick = () => {
          const name = chatInput.value.trim();
          if (name.length > 0) {
            sessionState.clientName = name;
            updateConsoleLead();
            addMessageBubble('user', `My name is ${name}`);
            chatInput.value = '';
            chatInput.placeholder = "Type a message...";
            
            showTyping();
            setTimeout(() => {
              hideTyping();
              addMessageBubble('ai', `Thank you, *${name}*! I've updated the lead file. Clicking the handoff button on the right will now open WhatsApp with your full project shortlist, calculated costs, and custom recommendations.`);
            }, 800);
          }
          // Restore original handler
          sendBtn.onclick = originalSendHandler;
        };
      }, 800);
      
    } else if (selectedAction.includes('Start Over')) {
      sessionState.step = 0;
      sessionState.projectType = '';
      sessionState.area = '';
      sessionState.style = '';
      sessionState.color = '';
      sessionState.budget = '';
      sessionState.priorities = [];
      sessionState.currentEstimate = null;
      consoleEstimatorSection.style.display = 'none';
      consoleComparisonSection.style.display = 'none';
      
      updateConsoleLead();
      proceedWorkflow();
    }
  }

  // Display Interactive Calculator Form
  function showCostCalculatorForm(stone) {
    const calcBox = document.createElement('div');
    calcBox.classList.add('chat-calculator-box');
    
    calcBox.innerHTML = `
      <h5 class="chat-calc-title">Calculator: ${stone.name}</h5>
      <div class="chat-calc-grid">
        <div class="chat-calc-field">
          <label class="chat-calc-label">Length</label>
          <input type="number" class="chat-calc-input calc-len" value="10" min="1">
        </div>
        <div class="chat-calc-field">
          <label class="chat-calc-label">Width</label>
          <input type="number" class="chat-calc-input calc-wid" value="6" min="1">
        </div>
        <div class="chat-calc-field" style="grid-column: span 2;">
          <label class="chat-calc-label">Unit</label>
          <select class="chat-calc-input calc-unit">
            <option value="feet">Feet (ft)</option>
            <option value="meters">Meters (m)</option>
          </select>
        </div>
      </div>
      <button class="chat-calc-submit">Calculate Material & Slabs</button>
    `;
    
    calcBox.querySelector('.chat-calc-submit').addEventListener('click', () => {
      const len = parseFloat(calcBox.querySelector('.calc-len').value) || 0;
      const wid = parseFloat(calcBox.querySelector('.calc-wid').value) || 0;
      const unit = calcBox.querySelector('.calc-unit').value;
      
      // Calculate
      let totalArea = 0;
      if (unit === 'feet') {
        totalArea = Math.round(len * wid);
      } else {
        totalArea = Math.round(len * wid * 10.764); // convert to sq ft
      }
      
      const price = PRICE_RANGES[stone.id] || { min: 100, max: 150 };
      const wasteArea = Math.round(totalArea * 0.1);
      const totalSlabsNeeded = Math.ceil((totalArea + wasteArea) / 45); // avg gangsaw slab size = 45 sq ft
      
      const totalCostMin = totalArea * price.min;
      const totalCostMax = totalArea * price.max;

      // Store in state
      sessionState.currentEstimate = {
        stoneName: stone.name,
        length: len,
        width: wid,
        unit: unit,
        totalArea: totalArea,
        totalCostMin: totalCostMin,
        totalCostMax: totalCostMax
      };

      // Disable inputs
      calcBox.querySelectorAll('input, select, button').forEach(el => el.disabled = true);
      
      // Print calculation bubble
      addMessageBubble('user', `Calculated dimensions: ${len} x ${wid} ${unit}`);
      
      showTyping();
      setTimeout(() => {
        hideTyping();
        
        addMessageBubble('ai', `Here is your estimate for *${stone.name}*:
• *Total Area:* ${totalArea} Sq.Ft.
• *Estimated Slabs:* ~${totalSlabsNeeded} slabs (based on avg 45 sq.ft. slabs)
• *Price Range:* ₹${totalCostMin.toLocaleString()} - ₹${totalCostMax.toLocaleString()}
*(Excluding GST, cutting, installation, and delivery)*

I have loaded the breakdown in your live console on the right.`);

        // Populate Right Side Estimator
        document.getElementById('console-calc-stone').innerText = stone.name;
        document.getElementById('console-calc-dims').innerText = `${len} x ${wid} ${unit === 'feet' ? 'ft' : 'm'}`;
        document.getElementById('console-calc-area').innerText = `${totalArea} Sq. Ft.`;
        document.getElementById('console-calc-material-cost').innerText = `₹${totalCostMin.toLocaleString()} - ₹${totalCostMax.toLocaleString()}`;
        document.getElementById('console-calc-waste').innerText = `${wasteArea} Sq. Ft.`;
        document.getElementById('console-calc-total').innerText = `₹${(totalCostMin + (wasteArea * price.min)).toLocaleString()} - ₹${(totalCostMax + (wasteArea * price.max)).toLocaleString()}`;
        
        consoleEstimatorSection.style.display = 'block';
        consoleEstimatorSection.scrollIntoView({ behavior: 'smooth' });
        
        updateConsoleLead();

        showTyping();
        setTimeout(() => {
          hideTyping();
          addMessageBubble('ai', `Would you like to connect with a Gadia stone expert to lock in a final quotation?`);
          addQuickReplyButtons(['Talk to Expert', 'Compare Stones', 'Start Over'], (selected) => {
            handlePostRecAction(selected);
          });
        }, 1200);

      }, 1000);
    });

    chatBody.appendChild(calcBox);
    scrollToBottom();
  }

  // Simulated AI Design Assistant (Image Analyzer)
  function simulateImageUpload(roomType) {
    const roomUrl = mockRoomImages[roomType];
    
    // Close attachment dropdown
    attachmentDropdown.style.display = 'none';

    // Show simulated user upload
    const userImgBubble = document.createElement('div');
    userImgBubble.classList.add('chat-bubble', 'user');
    userImgBubble.style.padding = '4px';
    userImgBubble.innerHTML = `
      <img src="${roomUrl}" style="width: 100%; max-height: 150px; object-fit: cover; border-radius: 6px;" alt="Simulated room upload">
      <span class="bubble-time">${getFormattedTime()}</span>
    `;
    chatBody.appendChild(userImgBubble);
    scrollToBottom();

    showTyping();
    setTimeout(() => {
      hideTyping();
      
      let analysisText = "";
      let recommendations = [];
      
      if (roomType === 'kitchen') {
        analysisText = `📸 *AI Room Analysis:*
I detected a *modern kitchen space* with:
• Dark charcoal/black cabinets
• Bright natural window lighting
• Sleek chrome fixtures

For an elegant contrasting design, I recommend a bright white granite or quartz. Here are matching stones:`;
        
        // Find Kashmir White or Makrana
        recommendations = [
          products.find(s => s.id === 'kashmir-white'),
          products.find(s => s.id === 'makrana-white')
        ].filter(Boolean);
        
        sessionState.area = 'Kitchen Countertop';
        sessionState.color = 'White & Light Grey';
        sessionState.style = 'Modern & Sleek';
        
      } else if (roomType === 'bathroom') {
        analysisText = `📸 *AI Room Analysis:*
I detected a *luxurious bathroom layout* with:
• Warm wood highlights
• Neutral grey tiling
• Glass wall enclosures

To build a high-end spa aesthetic, I recommend rich forest-green or premium black stones. Here are matching materials:`;
        
        recommendations = [
          products.find(s => s.id === 'indian-green'),
          products.find(s => s.id === 'black-galaxy')
        ].filter(Boolean);

        sessionState.area = 'Bathroom vanity/cladding';
        sessionState.color = 'Vibrant Green / Blue';
        sessionState.style = 'Luxury & Grand';
        
      } else if (roomType === 'staircase') {
        analysisText = `📸 *AI Room Analysis:*
I detected a *spacious entryway staircase* with:
• High traffic corridor
• Open ceiling structure
• Wrought iron handrails

For maximum durability and structural safety, I recommend heavy-density granite or fine-grained blue Kota stone. Here are matching options:`;
        
        recommendations = [
          products.find(s => s.id === 'kota-blue'),
          products.find(s => s.id === 'absolute-black')
        ].filter(Boolean);

        sessionState.area = 'Staircase';
        sessionState.color = 'Obsidian Black';
        sessionState.style = 'Traditional';
      }

      addMessageBubble('ai', analysisText);
      
      showTyping();
      setTimeout(() => {
        hideTyping();
        
        recommendations.forEach(stone => {
          renderProductCard(stone);
        });
        
        updateConsoleLead();

        showTyping();
        setTimeout(() => {
          hideTyping();
          addMessageBubble('ai', `How would you like to proceed with these matches?`);
          addQuickReplyButtons(['Estimate Cost', 'Talk to Expert', 'Start Over'], (selected) => {
            handlePostRecAction(selected);
          });
        }, 1000);
      }, 1000);

    }, 1500);
  }

  // Setup Input Box Submit
  function handleInputSubmit() {
    const text = chatInput.value.trim();
    if (text.length === 0) return;
    
    // Echo user text
    addMessageBubble('user', text);
    chatInput.value = '';
    
    showTyping();
    setTimeout(() => {
      hideTyping();
      
      const lowerText = text.toLowerCase();
      
      // Simple FAQ replies or fallback replies
      if (lowerText.includes('kitchen') && lowerText.includes('best')) {
        addMessageBubble('ai', `For busy kitchens, *Granite* is the undisputed king. Unlike Marble, Granite is heat-resistant, doesn't scratch easily, and doesn't stain from acids like lemon juice or vinegar.
        
I'd recommend checking out *Black Galaxy Granite* or *Absolute Black Granite* for countertops.`);
      } else if (lowerText.includes('difference') || (lowerText.includes('granite') && lowerText.includes('marble'))) {
        addMessageBubble('ai', `Here is the quick breakdown:
• *Granite:* Igneous rock, extremely hard, resists scratches, heat, and acidic stains. Best for kitchens and heavy B2B flooring.
• *Marble:* Metamorphic limestone, softer, highly porous, beautiful natural veins, stains easily. Best for luxury accent walls, temples, and low-traffic residential floors.`);
      } else if (lowerText.includes('price') || lowerText.includes('cost')) {
        addMessageBubble('ai', `Granite prices range from ₹140/sq.ft for basic varieties up to ₹350/sq.ft for premium ones like Black Galaxy. Kota Stone is very economical (₹45 - ₹80/sq.ft). Makrana Marble ranges from ₹450 to ₹650+/sq.ft.
        
I can calculate your exact cost if you select *Estimate Cost* from the menu options.`);
      } else if (lowerText.includes('stain') || lowerText.includes('maintain')) {
        addMessageBubble('ai', `Granite is highly stain-resistant (water absorption of ~0.02%). Marble is much more porous and needs chemical sealing every 1-2 years to prevent food or wine stains.`);
      } else {
        addMessageBubble('ai', `I'm here to help you select, compare, and estimate stones. Try choosing one of the interactive options below or ask me about stone properties (e.g., "Granite vs Marble" or "What is best for kitchen?"):`);
        addQuickReplyButtons(['Estimate Cost', 'Compare Stones', 'Talk to Expert', 'Start Over'], (selected) => {
          handlePostRecAction(selected);
        });
      }
    }, 1000);
  }

  // Event Listeners
  sendBtn.addEventListener('click', handleInputSubmit);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleInputSubmit();
  });

  // Paperclip dropdown toggle
  attachmentTrigger.addEventListener('click', (e) => {
    // If clicking target is the clip itself
    if (e.target.closest('#attachment-trigger') && !e.target.closest('#attachment-dropdown')) {
      const show = attachmentDropdown.style.display === 'flex';
      attachmentDropdown.style.display = show ? 'none' : 'flex';
    }
  });

  // Close attachment dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!attachmentTrigger.contains(e.target)) {
      attachmentDropdown.style.display = 'none';
    }
  });

  // Simulated Room image selections
  const attachmentItems = document.querySelectorAll('.attachment-menu-item');
  attachmentItems.forEach(item => {
    item.addEventListener('click', () => {
      const roomType = item.getAttribute('data-room');
      simulateImageUpload(roomType);
    });
  });

  // Initialize
  updateConsoleLead();
  proceedWorkflow();
});
