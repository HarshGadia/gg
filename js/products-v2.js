document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // PRODUCT DATA COLLECTION (REFINED FOR B2B STONE TRADE)
  // ==========================================================================
  const PRODUCTS_DATA = [
    {
      id: 'black-galaxy',
      name: 'Black Galaxy Granite',
      material: 'Granite',
      color: 'Black',
      finishes: ['Polished', 'Honed', 'Leathered'],
      applications: ['Countertop', 'Wall Cladding', 'Flooring'],
      origin: 'Andhra Pradesh, India',
      sizes: 'Gang Saw: 280 x 160 cm & up, Cutter: 180 x 60 cm & up',
      thickness: '18mm, 20mm, 30mm',
      availability: 'In Stock',
      blockCode: 'GG-BG-451',
      stockArea: '14,250 Sq. Ft. (52 Slabs in Lot)',
      waterAbsorption: '0.02% (High Density)',
      compressiveStrength: '154 MPa',
      pattern: 'Celestial copper/gold flecks on obsidian black canvas',
      description: 'A deeply dramatic black granite accented with coppery, golden metallic flecks resembling a star-studded sky. Prized for its luxury shine, extreme durability, and scratch resistance in kitchen counters.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      closeups: [
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'absolute-black',
      name: 'Absolute Black Granite',
      material: 'Granite',
      color: 'Black',
      finishes: ['Polished', 'Honed', 'Flamed', 'Leathered'],
      applications: ['Countertop', 'Wall Cladding', 'Flooring', 'Exterior'],
      origin: 'Rajasthan, India',
      sizes: 'Gang Saw: 300 x 180 cm & up, Cutter: 180 x 60 cm & up',
      thickness: '20mm, 30mm',
      availability: 'In Stock',
      blockCode: 'GG-AB-982',
      stockArea: '22,400 Sq. Ft. (78 Slabs in Lot)',
      waterAbsorption: '0.01% (Highly Impermeable)',
      compressiveStrength: '172 MPa',
      pattern: 'Pure, deep, uniform solid black without veins',
      description: 'An exceptionally dense, pure solid black granite with a uniform texture. Its deep tone offers a striking architectural contrast in minimalist commercial installations and luxury vanity counters.',
      image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80',
      closeups: [
        'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'kashmir-white',
      name: 'Kashmir White Granite',
      material: 'Granite',
      color: 'White',
      finishes: ['Polished', 'Honed', 'Satin'],
      applications: ['Flooring', 'Countertop', 'Wall Cladding'],
      origin: 'Tamil Nadu, India',
      sizes: 'Gang Saw: 270 x 150 cm & up, Cutter: 180 x 60 cm & up',
      thickness: '18mm, 20mm',
      availability: 'In Stock',
      blockCode: 'GG-KW-710',
      stockArea: '9,800 Sq. Ft. (34 Slabs in Lot)',
      waterAbsorption: '0.12%',
      compressiveStrength: '135 MPa',
      pattern: 'White-grey background with granular garnets and clouds',
      description: 'A beautiful white granite featuring a canvas of soft grey veins and deep red garnet speckles. Its bright tone expands space visually and is highly favored for hotel lobbies and flooring.',
      image: 'images/kashmir_white_granite.png',
      closeups: [
        'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'indian-green',
      name: 'Indian Green Marble',
      material: 'Marble',
      color: 'Green',
      finishes: ['Polished', 'Honed', 'Antique'],
      applications: ['Wall Cladding', 'Flooring', 'Bathroom Design'],
      origin: 'Udaipur, Rajasthan',
      sizes: 'Slabs: 240 x 140 cm & up, Custom Tiles',
      thickness: '16mm, 18mm',
      availability: 'In Stock',
      blockCode: 'GG-IG-203',
      stockArea: '11,100 Sq. Ft. (40 Slabs in Lot)',
      waterAbsorption: '0.15%',
      compressiveStrength: '124 MPa',
      pattern: 'Forest green background with rich serpentine veins',
      description: 'A rich forest-green marble laced with serpentine dark green and white veins. Highly valued in premium bathroom designs, luxury fireplaces, and feature wall installations.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      closeups: [
        'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'makrana-white',
      name: 'Makrana White Marble',
      material: 'Marble',
      color: 'White',
      finishes: ['Polished', 'Honed', 'Natural'],
      applications: ['Flooring', 'Sculpting', 'Temples', 'Custom Cut'],
      origin: 'Makrana, Rajasthan',
      sizes: 'Slabs: 200 x 120 cm & up, Blocks available',
      thickness: '15mm, 18mm, 20mm',
      availability: 'On Order',
      blockCode: 'GG-MW-880',
      stockArea: 'Tailored extraction on request (Block Code: #GG-MW-880)',
      waterAbsorption: '0.04% (Resistant to stains)',
      compressiveStrength: '146 MPa',
      pattern: 'Luminous pure white calcite with subtle grey veins',
      description: 'The world\'s most famous white marble, renowned for its low water absorption, high calcium purity, and historic legacy (used in the Taj Mahal). Develops a beautiful natural gloss over time.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      closeups: [
        'images/makrana_white_closeup.png',
        'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'kota-blue',
      name: 'Kota Blue Stone',
      material: 'Kota Stone',
      color: 'Blue',
      finishes: ['Polished', 'Honed', 'Rough', 'Natural'],
      applications: ['Flooring', 'Exterior', 'Patios', 'Commercial Corridors'],
      origin: 'Kota, Rajasthan',
      sizes: 'Tiles: 60x60, 60x90, 60x120 cm',
      thickness: '20mm to 40mm',
      availability: 'In Stock',
      blockCode: 'GG-KB-012',
      stockArea: '45,000 Sq. Ft. (Ready Crates)',
      waterAbsorption: '0.06% (Dense Limestone)',
      compressiveStrength: '138 MPa',
      pattern: 'Earthy blue-grey fine-grained matte/sheen surface',
      description: 'A legendary fine-grained blue-grey limestone with exceptional toughness, non-slip texture, and oil resistance. Perfect for high-traffic public areas, industrial flooring, and gardens.',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
      closeups: [
        'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'kota-brown',
      name: 'Kota Brown Stone',
      material: 'Kota Stone',
      color: 'Brown',
      finishes: ['Polished', 'Honed', 'Natural'],
      applications: ['Flooring', 'Exterior', 'Cladding'],
      origin: 'Kota, Rajasthan',
      sizes: 'Tiles: 60x60, 60x90 cm',
      thickness: '22mm, 30mm',
      availability: 'In Stock',
      blockCode: 'GG-KB-015',
      stockArea: '28,000 Sq. Ft. (Ready Crates)',
      waterAbsorption: '0.07%',
      compressiveStrength: '132 MPa',
      pattern: 'Warm, earthy, chocolate brown consistent limestone',
      description: 'A brown variety of the traditional Kota stone limestone. Offers a warm, earthy, chocolate tone that looks superb when combined with blue Kota stone or used in exterior landscaping.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      closeups: [
        'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'yellow-sandstone',
      name: 'Yellow Sandstone',
      material: 'Sandstone',
      color: 'Yellow',
      finishes: ['Rough', 'Natural', 'Honed', 'Shot Blasted'],
      applications: ['Wall Cladding', 'Exterior', 'Landscaping', 'Paving'],
      origin: 'Jaisalmer, Rajasthan',
      sizes: 'Slabs: 180 x 60 cm & up, Custom Tiles',
      thickness: '20mm, 30mm, 40mm',
      availability: 'In Stock',
      blockCode: 'GG-YS-604',
      stockArea: '16,500 Sq. Ft.',
      waterAbsorption: '1.20% (Porous/Breatheable)',
      compressiveStrength: '68 MPa (Tough structural sandstone)',
      pattern: 'Warm desert-sand yellow with soft mineral layers',
      description: 'A warm, sun-kissed golden-yellow sandstone that withstands severe weathering. Primarily processed for historical exterior cladding, garden paving, and pool decks.',
      image: 'https://images.unsplash.com/photo-1595206133361-b1fe343e5e23?auto=format&fit=crop&w=800&q=80',
      closeups: [
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'pink-sandstone',
      name: 'Pink Sandstone (Dholpur)',
      material: 'Sandstone',
      color: 'Pink',
      finishes: ['Natural', 'Honed', 'Sandblasted'],
      applications: ['Wall Cladding', 'Exterior', 'Carving', 'Garden Paving'],
      origin: 'Dholpur, Rajasthan',
      sizes: 'Slabs: 200 x 90 cm & up, Custom blocks',
      thickness: '25mm, 35mm',
      availability: 'In Stock',
      blockCode: 'GG-PS-108',
      stockArea: '19,000 Sq. Ft.',
      waterAbsorption: '1.10%',
      compressiveStrength: '72 MPa',
      pattern: 'Soft buff pink with layered sedimentary veins',
      description: 'Dholpur Pink is a soft, buff-pink colored sandstone that offers a distinct heritage aesthetic. Extremely popular for traditional structures, cladding, columns, and hand-carved screens.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      closeups: [
        'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'desert-brown',
      name: 'Desert Brown Granite',
      material: 'Granite',
      color: 'Brown',
      finishes: ['Polished', 'Honed', 'Flamed'],
      applications: ['Countertop', 'Flooring', 'Wall Cladding'],
      origin: 'Jalore, Rajasthan',
      sizes: 'Gang Saw: 290 x 170 cm & up, Cutter: 180 x 60 cm & up',
      thickness: '18mm, 20mm',
      availability: 'In Stock',
      blockCode: 'GG-DB-302',
      stockArea: '8,400 Sq. Ft. (30 Slabs in Lot)',
      waterAbsorption: '0.03%',
      compressiveStrength: '148 MPa',
      pattern: 'Consistent brown and tan crystals peppered with black',
      description: 'A beautiful medium-grained granite in shades of brown, yellow, and black. Favored for its earthy warmth and excellent structural consistency in large residential floor designs.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      closeups: [
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
      ]
    }
  ];

  // ==========================================================================
  // ELEMENT REFERENCES & ACTIVE FILTER STATES
  // ==========================================================================
  const listingView = document.getElementById('products-listing-view');
  const detailView = document.getElementById('products-detail-view');
  const productGrid = document.getElementById('product-grid');
  const searchInput = document.getElementById('stone-search-input');
  const activeResultsCount = document.getElementById('active-results-count');
  
  let activeFilters = {
    material: 'All',
    color: 'All',
    application: 'All'
  };

  // ==========================================================================
  // FILTER HANDLING & RENDER (DROPDOWNS WITH TRADE INTEGRATION)
  // ==========================================================================
  const initFilters = () => {
    const dropdownGroups = document.querySelectorAll('.filter-dropdown-group');
    
    // Toggle dropdown menus on trigger click
    dropdownGroups.forEach(group => {
      const trigger = group.querySelector('.dropdown-trigger');
      
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close all other dropdowns first
        dropdownGroups.forEach(otherGroup => {
          if (otherGroup !== group) {
            otherGroup.classList.remove('open');
          }
        });
        
        // Toggle current dropdown
        group.classList.toggle('open');
      });
    });

    // Close dropdowns when clicking anywhere outside
    document.addEventListener('click', () => {
      dropdownGroups.forEach(group => group.classList.remove('open'));
    });

    // Handle dropdown item selections
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const filterType = item.getAttribute('data-filter-type');
        const value = item.getAttribute('data-value');
        
        // Update state
        activeFilters[filterType] = value;
        
        // Update UI: active class on selected item
        const siblings = item.parentElement.querySelectorAll('.dropdown-item');
        siblings.forEach(sib => sib.classList.remove('active'));
        item.classList.add('active');
        
        // Update UI: active label text on button trigger
        const parentGroup = item.closest('.filter-dropdown-group');
        const labelSpan = parentGroup.querySelector('.active-val');
        
        // Pretty labels matching values
        let displayLabel = value;
        if (value === 'All') {
          if (filterType === 'material') displayLabel = 'All Stones';
          if (filterType === 'color') displayLabel = 'All Colors';
          if (filterType === 'application') displayLabel = 'All Uses';
        }
        
        labelSpan.textContent = displayLabel;
        
        // Close the menu
        parentGroup.classList.remove('open');
        
        // Re-filter grid
        renderProductGrid();
      });
    });

    // Listen to query string parameters on load (e.g. ?material=Granite)
    const urlParams = new URLSearchParams(window.location.search);
    const materialParam = urlParams.get('material');
    if (materialParam) {
      activeFilters.material = materialParam;
      
      // Update DOM
      const materialItems = document.querySelectorAll('[data-filter-type="material"]');
      materialItems.forEach(item => {
        if (item.getAttribute('data-value') === materialParam) {
          item.classList.add('active');
          const parentGroup = item.closest('.filter-dropdown-group');
          parentGroup.querySelector('.active-val').textContent = materialParam;
          
          // Clear active sibling
          const siblings = item.parentElement.querySelectorAll('.dropdown-item');
          siblings.forEach(sib => {
            if (sib !== item) sib.classList.remove('active');
          });
        }
      });
    }

    // Bind search input events
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        renderProductGrid();
      });
    }
  };

  const renderProductGrid = () => {
    if (!productGrid) return;
    
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    // Filter logic
    const filteredProducts = PRODUCTS_DATA.filter(product => {
      const matchMaterial = activeFilters.material === 'All' || product.material === activeFilters.material;
      const matchColor = activeFilters.color === 'All' || product.color === activeFilters.color;
      const matchApp = activeFilters.application === 'All' || product.applications.includes(activeFilters.application);
      
      const matchSearch = !query || 
                          product.name.toLowerCase().includes(query) || 
                          product.description.toLowerCase().includes(query) ||
                          product.material.toLowerCase().includes(query) ||
                          product.color.toLowerCase().includes(query) ||
                          product.origin.toLowerCase().includes(query) ||
                          product.blockCode.toLowerCase().includes(query);
      
      return matchMaterial && matchColor && matchApp && matchSearch;
    });

    // Update active count dynamically
    if (activeResultsCount) {
      activeResultsCount.textContent = filteredProducts.length;
    }

    // Clear grid
    productGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
      productGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 0;">
          <p style="font-size: 18px; font-family: var(--font-editorial); font-style: italic;">
            No stone varieties match the selected criteria.
          </p>
        </div>`;
      return;
    }

    // Build cards
    filteredProducts.forEach((product, idx) => {
      const card = document.createElement('div');
      card.className = `product-card reveal reveal-delay-${(idx % 3) + 1} active`;
      card.setAttribute('data-id', product.id);
      
      card.innerHTML = `
        <div class="product-card-img-wrapper">
          <div class="product-card-img" style="background-image: url('${product.image}');"></div>
        </div>
        <div class="product-card-info">
          <span class="product-card-tag">${product.material} · Lot ID: ${product.blockCode}</span>
          <h3 class="product-card-title">${product.name}</h3>
          <p class="product-card-finishes">${product.finishes.join(' · ')}</p>
          <button class="btn btn-ghost product-card-btn">Request B2B Quote</button>
        </div>
      `;

      card.addEventListener('click', () => {
        // Change route via hash
        window.location.hash = `detail/${product.id}`;
      });

      productGrid.appendChild(card);
    });
  };

  // ==========================================================================
  // DYNAMIC DETAIL SCREEN RENDERING WITH TRADE TOOLS
  // ==========================================================================
  const renderDetailView = (productId) => {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product || !detailView) return;

    // Clear previous details
    detailView.innerHTML = '';

    // Enquire Pre-filled WhatsApp link
    const textEnquire = `Hi Gadia Granites, I have an enquiry about Lot ID: "${product.blockCode}" (${product.name}). Please share the pricing details and loading configurations.`;
    
    // Sample Pre-filled WhatsApp link
    const textSample = `Hi Gadia Granites, I am an architect/builder and I would like to request a physical sample of "${product.name}" stone. Please let me know the sample dispatch process.`;
    
    // Video Tour WhatsApp link
    const textVideo = `Hi Gadia Granites, I want to book a live WhatsApp video tour of Lot ID: "${product.blockCode}" (${product.name}) currently stocked in your Jaipur godown.`;

    const linkEnquire = `https://wa.me/919999999999?text=${encodeURIComponent(textEnquire)}`;
    const linkSample = `https://wa.me/919999999999?text=${encodeURIComponent(textSample)}`;
    const linkVideo = `https://wa.me/919999999999?text=${encodeURIComponent(textVideo)}`;

    // Get related products
    const related = PRODUCTS_DATA.filter(p => p.material === product.material && p.id !== product.id).slice(0, 3);
    let relatedHTML = '';
    related.forEach((rel, idx) => {
      relatedHTML += `
        <div class="product-card" onclick="window.location.hash='detail/${rel.id}'">
          <div class="product-card-img-wrapper">
            <div class="product-card-img" style="background-image: url('${rel.image}');"></div>
          </div>
          <div class="product-card-info">
            <span class="product-card-tag">${rel.material} · Lot ID: ${rel.blockCode}</span>
            <h3 class="product-card-title">${rel.name}</h3>
            <p class="product-card-finishes">${rel.finishes.join(' · ')}</p>
            <button class="btn btn-ghost product-card-btn">Request B2B Quote</button>
          </div>
        </div>
      `;
    });

    detailView.innerHTML = `
      <span class="back-btn" id="detail-back-btn">
        <i class="fa-solid fa-arrow-left-long"></i> Back to Collection
      </span>
      
      <div class="detail-grid">
        <!-- Left: Image Gallery -->
        <div class="detail-images">
          <div class="detail-main-img-wrapper" id="detail-primary-frame">
            <div class="detail-texture-pan" id="detail-texture-pan" style="background-image: url('${product.image}');"></div>
            <div class="detail-shine-overlay" id="detail-shine-overlay"></div>
            <div class="detail-instruction"><i class="fa-solid fa-expand" style="margin-right: 6px;"></i>Move cursor to inspect veins & gloss</div>
          </div>
          <div class="detail-thumbs-grid">
            <div class="detail-thumb-img active" style="background-image: url('${product.image}');" data-src="${product.image}"></div>
            <div class="detail-thumb-img" style="background-image: url('${product.closeups[0]}');" data-src="${product.closeups[0]}"></div>
            <div class="detail-thumb-img" style="background-image: url('${product.closeups[1]}');" data-src="${product.closeups[1]}"></div>
          </div>
        </div>
        
        <!-- Right: Specifications Sheet & B2B Trading Tools -->
        <div class="detail-content-wrapper">
          <span class="detail-meta-tag">Lot ID: ${product.blockCode}</span>
          <h1 class="detail-title">${product.name}</h1>
          <p class="detail-desc">${product.description}</p>
          
          <table class="specs-table">
            <tr>
              <td class="label">Total Stock Area</td>
              <td class="value" style="color: var(--color-accent); font-weight: 600;">${product.stockArea}</td>
            </tr>
            <tr>
              <td class="label">Slab Origin</td>
              <td class="value">${product.origin}</td>
            </tr>
            <tr>
              <td class="label">Pattern Classification</td>
              <td class="value">${product.pattern}</td>
            </tr>
            <tr>
              <td class="label">Water Absorption</td>
              <td class="value">${product.waterAbsorption}</td>
            </tr>
            <tr>
              <td class="label">Compressive Strength</td>
              <td class="value">${product.compressiveStrength}</td>
            </tr>
            <tr>
              <td class="label">Available Sizes</td>
              <td class="value">${product.sizes}</td>
            </tr>
            <tr>
              <td class="label">Thickness Options</td>
              <td class="value">${product.thickness}</td>
            </tr>
            <tr>
              <td class="label">Finishes Available</td>
              <td class="value">${product.finishes.join(' · ')}</td>
            </tr>
          </table>
          
          <div class="chips-container">
            ${product.applications.map(app => `<span class="chip">${app}</span>`).join('')}
          </div>
          
          <!-- B2B Interactive Action Panel -->
          <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 30px;">
            <a href="${linkEnquire}" target="_blank" class="btn btn-primary" style="width: 100%;" id="detail-enquiry-cta">
              <i class="fa-brands fa-whatsapp" style="margin-right: 8px; font-size: 16px;"></i> Request Commercial Quote
            </a>
            
            <div class="form-row-2col" style="gap: 12px; margin-bottom: 0;">
              <a href="${linkSample}" target="_blank" class="btn btn-ghost" style="font-size: 12px;" id="detail-sample-cta">
                <i class="fa-solid fa-box-open" style="margin-right: 6px;"></i> Order Sample
              </a>
              <a href="${linkVideo}" target="_blank" class="btn btn-ghost" style="font-size: 12px;" id="detail-video-cta">
                <i class="fa-solid fa-video" style="margin-right: 6px;"></i> Video Block Tour
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom: Related Varieties -->
      ${related.length > 0 ? `
        <div class="related-section">
          <h3>Related ${product.material} Slabs</h3>
          <div class="product-grid" style="padding: 0; background-color: transparent;">
            ${relatedHTML}
          </div>
        </div>` : ''
      }
    `;

    // Bind image thumb clicks
    const thumbs = detailView.querySelectorAll('.detail-thumb-img');
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const targetSrc = thumb.getAttribute('data-src');
        const texturePan = detailView.querySelector('#detail-texture-pan');
        if (texturePan) {
          texturePan.style.backgroundImage = `url('${targetSrc}')`;
        }
        
        // Toggle active visual highlight
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });

    // Attach coordinate panning and gloss listeners to detail frame
    const detailPan = detailView.querySelector('#detail-texture-pan');
    const detailShine = detailView.querySelector('#detail-shine-overlay');
    const detailFrame = detailView.querySelector('#detail-primary-frame');

    console.log("Attached elements checked:", !!detailFrame, !!detailPan, !!detailShine);

    if (detailFrame && detailPan && detailShine) {
      const handleDetailMove = (clientX, clientY) => {
        const rect = detailFrame.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const percentX = Math.max(0, Math.min(100, (x / rect.width) * 100));
        const percentY = Math.max(0, Math.min(100, (y / rect.height) * 100));

        // Panning offsets (-10% to +10% shift around center 50%)
        const panLimit = 10;
        const panX = 50 + ((percentX - 50) / 50) * panLimit;
        const panY = 50 + ((percentY - 50) / 50) * panLimit;

        detailPan.style.backgroundPosition = `${panX}% ${panY}%`;

        // Specular highlight radial gradient (polished gloss simulation)
        detailShine.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.03) 25%, rgba(0, 0, 0, 0) 55%)`;
      };

      detailFrame.addEventListener('mousemove', (e) => {
        handleDetailMove(e.clientX, e.clientY);
      });

      detailFrame.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
          e.preventDefault();
          handleDetailMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: false });

      detailFrame.addEventListener('mouseleave', () => {
        detailPan.style.transition = 'background-position 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        detailShine.style.transition = 'background 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        detailPan.style.backgroundPosition = '50% 50%';
        detailShine.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 50%)';
      });

      detailFrame.addEventListener('mouseenter', () => {
        detailPan.style.transition = 'none';
        detailShine.style.transition = 'none';
      });
    }

    // Bind back button
    const backBtn = detailView.querySelector('#detail-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.location.hash = '';
      });
    }

    // Scroll to top on detail load
    window.scrollTo(0, 0);
  };

  // ==========================================================================
  // ROUTING LOGIC (HASH WATCHER)
  // ==========================================================================
  const handleRoute = () => {
    const hash = window.location.hash;
    
    if (hash.startsWith('#detail/')) {
      const productId = hash.split('#detail/')[1];
      
      // Hide listing, show details with fading transition
      if (listingView) listingView.style.display = 'none';
      if (detailView) {
        detailView.style.display = 'block';
        detailView.classList.remove('fade-in-up');
        void detailView.offsetWidth; // Trigger reflow to reset CSS transition
        detailView.classList.add('fade-in-up');
        renderDetailView(productId);
      }
    } else {
      // Hide details, show listing with fading transition
      if (detailView) detailView.style.display = 'none';
      if (listingView) {
        listingView.style.display = 'block';
        listingView.classList.remove('fade-in-up');
        void listingView.offsetWidth; // Trigger reflow to reset CSS transition
        listingView.classList.add('fade-in-up');
        renderProductGrid();
      }
    }
  };

  // Initialize page
  initFilters();
  window.addEventListener('hashchange', handleRoute);
  handleRoute(); // Run initial route check
});
