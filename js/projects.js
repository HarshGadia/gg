document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // PROJECTS DATASET (B2B ARCHITECTURAL CASE STUDIES)
  // ==========================================================================
  const PROJECTS_DATA = [
    {
      id: 'oberoi-rajvilas',
      title: 'The Oberoi Rajvilas Lobby',
      category: 'Hospitality',
      material: 'Makrana White Marble',
      productId: 'makrana-white',
      location: 'Jaipur, Rajasthan',
      year: '2024',
      architect: 'Lal & Associates',
      quantity: '18,000 Sq. Ft. Slabs',
      finish: 'Mirror Polished',
      image: 'images/projects_oberoi_lobby.png',
      closeup: 'images/makrana_white_closeup.png',
      scope: 'Complete lobby flooring redesign. We supplied bookmatched premium calacatta-grade Makrana marble slabs. The layouts were dry-laid in our godown prior to dispatch to ensure flawless vein flow continuity.',
      testimonial: 'Gadia Granites delivered exceptional quality control. The prep-laying service in their Jaipur godown made the installation seamless.'
    },
    {
      id: 'trump-towers',
      title: 'Trump Towers Penthouse',
      category: 'Residential',
      material: 'Black Galaxy Granite',
      productId: 'black-galaxy',
      location: 'Mumbai, Maharashtra',
      year: '2025',
      architect: 'Karan Grover Partners',
      quantity: '4,500 Sq. Ft. Custom Cut',
      finish: 'High-Gloss Polished',
      image: 'images/projects_trump_penthouse.png',
      closeup: 'images/closeup_black_galaxy.png',
      scope: 'Slab selection and custom edge-profiling for double-island kitchens, high-traffic flooring, and master vanity walls. Features premium dark copper-flecked galaxy granite lot GG-BG-451.',
      testimonial: 'The golden flecks in the Black Galaxy granite are perfectly uniform across all slabs. Excellent grade sourcing by Gadia Granites.'
    },
    {
      id: 'dlf-cybercity',
      title: 'DLF Cybercity HQ',
      category: 'Commercial',
      material: 'Absolute Black Granite',
      productId: 'absolute-black',
      location: 'Gurugram, Haryana',
      year: '2023',
      architect: 'Morphogenesis',
      quantity: '35,000 Sq. Ft. Cladding',
      finish: 'Flamed (Exterior) & Polished (Lobby)',
      image: 'images/projects_dlf_hq.png',
      closeup: 'images/closeup_absolute_black.png',
      scope: 'High-rise facade exterior cladding and main lobby flooring. Granite was processed with thermal-flamed slip-resistant surface finishes for outdoor pathways, and high-shine polish inside.',
      testimonial: 'Our building required extreme stone density for the exterior cladding. Gadia\'s Absolute Black met all civil strength specs easily.'
    },
    {
      id: 'jaipur-airport',
      title: 'Jaipur Airport Terminal 2',
      category: 'Landscaping',
      material: 'Kota Blue Stone',
      productId: 'kota-blue',
      location: 'Jaipur, Rajasthan',
      year: '2024',
      architect: 'Architects Co-op',
      quantity: '50,000 Sq. Ft. Tiles',
      finish: 'Satin Honed & Non-Slip Rough',
      image: 'images/projects_jaipur_airport.png',
      closeup: 'images/closeup_kota_blue.png',
      scope: 'Pedestrian corridors, baggage claim zones, and drop-off ramps. Kota Blue limestone was calibrated to 25mm thickness to withstand intensive luggage trolley traffic without chipping.',
      testimonial: 'Kota Stone from Gadia was density-tested to the highest standards. High-traffic durability has been exceptional.'
    },
    {
      id: 'amanbagh-resort',
      title: 'Amanbagh Resort Pool Decks',
      category: 'Hospitality',
      material: 'Yellow Sandstone & Kota Brown',
      productId: 'yellow-sandstone',
      location: 'Alwar, Rajasthan',
      year: '2023',
      architect: 'Jaya Design International',
      quantity: '12,500 Sq. Ft. Paving',
      finish: 'Sandblasted & Hand-Dressed',
      image: 'images/projects_amanbagh_pool.png',
      closeup: 'images/closeup_yellow_sandstone.png',
      scope: 'Pool decks, outdoor resort pathways, and luxury pavilion cladding. The yellow sandstone was sandblasted to deliver a cool-underfoot, slip-resistant surface around pool zones.',
      testimonial: 'Stones stay cool even in 42°C Jaipur heat. Natural golden tone matches the heritage resort aesthetics perfectly.'
    },
    {
      id: 'luxury-villa',
      title: 'Luxury Villa Estate',
      category: 'Residential',
      material: 'Dholpur Pink Sandstone',
      productId: 'pink-sandstone',
      location: 'Alibaug, Maharashtra',
      year: '2025',
      architect: 'Studio Mumbai',
      quantity: '12,000 Sq. Ft. Ashlar',
      finish: 'Natural Split Face & Honed',
      image: 'images/projects_luxury_villa.png',
      closeup: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=800&q=80',
      scope: 'Facade wall panels, columns, and exterior courtyard paving. Dholpur Pink sandstone block lots were extracted and hand-dressed by local Rajasthani artisans at our facility.',
      testimonial: 'The natural pink textures of Dholpur stone create a serene wall facade. Gadia Granite\'s artisan craftsmanship is top-tier.'
    }
  ];

  const portfolioGrid = document.getElementById('portfolio-grid');
  const portfolioTabs = document.getElementById('portfolio-tabs');
  const modal = document.getElementById('portfolio-modal');
  const modalBody = document.getElementById('modal-body-content');
  const modalClose = document.getElementById('modal-close-btn');

  let activeFilter = 'All';

  // ==========================================================================
  // RENDER PORTFOLIO MASONRY GRID
  // ==========================================================================
  const renderGrid = () => {
    if (!portfolioGrid) return;

    // Filter projects
    const filtered = PROJECTS_DATA.filter(p => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Landscaping') return p.category === 'Landscaping';
      return p.category === activeFilter;
    });

    // Clear grid
    portfolioGrid.innerHTML = '';

    if (filtered.length === 0) {
      portfolioGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 0;">
          <p style="font-size: 18px; font-family: var(--font-editorial); font-style: italic;">
            No projects found in this category.
          </p>
        </div>`;
      return;
    }

    // Build cards with structured layout classes for perfect visual alignment
    filtered.forEach((project, idx) => {
      const card = document.createElement('div');
      
      let layoutClass = 'normal';
      if (filtered.length === 6) {
        if (idx === 0) layoutClass = 'featured-wide';
        else if (idx === 1) layoutClass = 'normal-tall';
        else if (idx === 5) layoutClass = 'featured-full';
      } else if (filtered.length === 2) {
        if (idx === 0) layoutClass = 'featured-wide';
        else if (idx === 1) layoutClass = 'normal-tall';
      } else if (filtered.length === 1) {
        layoutClass = 'featured-full';
      }
      
      card.className = `project-card ${layoutClass} reveal reveal-delay-${(idx % 3) + 1} active`;
      card.setAttribute('data-id', project.id);
      
      card.innerHTML = `
        <div class="project-card-bg" style="background-image: url('${project.image}');"></div>
        <div class="project-info">
          <span class="project-tag">${project.category} · ${project.material}</span>
          <h3>${project.title}</h3>
          <p class="project-meta">${project.location} · ${project.year}</p>
        </div>
      `;

      card.addEventListener('click', () => {
        openModal(project.id);
      });

      portfolioGrid.appendChild(card);
    });
  };

  // ==========================================================================
  // TAB SELECTION CONTROLLER
  // ==========================================================================
  if (portfolioTabs) {
    const tabs = portfolioTabs.querySelectorAll('.portfolio-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all
        tabs.forEach(t => t.classList.remove('active'));
        // Add to clicked
        tab.classList.add('active');
        
        // Update active filter state
        activeFilter = tab.getAttribute('data-filter');
        
        // Re-render grid
        renderGrid();
      });
    });
  }

  // ==========================================================================
  // CASE STUDY MODAL OVERLAY
  // ==========================================================================
  const openModal = (projectId) => {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project || !modal || !modalBody) return;

    const whatsappText = `Hi Gadia Granites, I saw your case study for "${project.title}" (${project.material}) located in ${project.location}. I have a similar installation requirement. Can we book a consultation?`;
    const whatsappLink = `https://wa.me/919999999999?text=${encodeURIComponent(whatsappText)}`;

    modalBody.innerHTML = `
      <div class="modal-grid">
        <!-- Left Column: Gallery -->
        <div class="modal-gallery">
          <div class="modal-main-img" id="modal-primary-view" style="background-image: url('${project.image}');"></div>
          <div class="modal-thumbs-grid">
            <div class="modal-thumb-img active" style="background-image: url('${project.image}');" data-src="${project.image}"></div>
            <div class="modal-thumb-img" style="background-image: url('${project.closeup}');" data-src="${project.closeup}"></div>
          </div>
        </div>

        <!-- Right Column: Specs & B2B Inquiries -->
        <div class="modal-details">
          <span class="modal-tag">${project.category}</span>
          <h2 class="modal-title">${project.title}</h2>
          
          <table class="specs-table">
            <tr>
              <td class="label">Stone Supplied</td>
              <td class="value">
                <a href="products.html#detail/${project.productId}" class="modal-product-link" title="View product specifications">
                  ${project.material} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 10px; margin-left: 4px;"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td class="label">Location</td>
              <td class="value">${project.location}</td>
            </tr>
            <tr>
              <td class="label">Project Architect</td>
              <td class="value">${project.architect}</td>
            </tr>
            <tr>
              <td class="label">Completion Year</td>
              <td class="value">${project.year}</td>
            </tr>
            <tr>
              <td class="label">Volume Sourced</td>
              <td class="value" style="color: var(--color-accent); font-weight: 600;">${project.quantity}</td>
            </tr>
            <tr>
              <td class="label">Finish Spec</td>
              <td class="value">${project.finish}</td>
            </tr>
          </table>

          <div class="modal-section-title">Case Study Scope</div>
          <p class="modal-text">${project.scope}</p>

          <div class="modal-quote-card">
            <i class="fa-solid fa-quote-left"></i>
            <p class="modal-quote">${project.testimonial}</p>
            <div class="modal-quote-author">— Project Site Manager / Client Representative</div>
          </div>

          <div style="margin-top: 30px;">
            <a href="${whatsappLink}" target="_blank" class="btn btn-primary" style="width: 100%;">
              <i class="fa-brands fa-whatsapp" style="margin-right: 8px; font-size: 16px;"></i> Request Case Study Consult
            </a>
          </div>
        </div>
      </div>
    `;

    // Bind modal thumbnail clicks
    const thumbs = modalBody.querySelectorAll('.modal-thumb-img');
    const primaryView = modalBody.querySelector('#modal-primary-view');
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // Toggle active thumbnail styling
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        // Swap primary image background
        const src = thumb.getAttribute('data-src');
        if (primaryView) {
          primaryView.style.backgroundImage = `url('${src}')`;
        }
      });
    });

    // Show modal with smooth styling
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  const closeModal = () => {
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = ''; // Unlock scroll
    }
  };

  // Close triggers
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Run initial grid rendering
  renderGrid();
});
