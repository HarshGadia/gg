document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // STONE DATASET FOR DYNAMIC MOTION DISPLAY
  // ==========================================================================
  const MOTION_STONES = [
    {
      id: 'black-galaxy',
      name: 'Black Galaxy Granite',
      material: 'Premium Granite',
      blockCode: 'GG-BG-451',
      image: 'images/closeup_black_galaxy.png',
      bgSize: '250%',
      desc: 'Celestial copper/gold flecks on obsidian black canvas. Sourced from Andhra Pradesh, finished to a mirror-like high gloss.',
      origin: 'Andhra Pradesh, India',
      whatsappText: 'Hi Gadia Granites, I have an enquiry about Black Galaxy Granite (Lot: GG-BG-451) from the Interactive Motion Gallery.'
    },
    {
      id: 'absolute-black',
      name: 'Absolute Black Granite',
      material: 'Premium Granite',
      blockCode: 'GG-AB-982',
      image: 'images/closeup_absolute_black.png',
      bgSize: '200%',
      desc: 'Pure, deep, uniform solid black. Exceptionally dense and highly polished with no visible grains or veins.',
      origin: 'Rajasthan, India',
      whatsappText: 'Hi Gadia Granites, I have an enquiry about Absolute Black Granite (Lot: GG-AB-982) from the Interactive Motion Gallery.'
    },
    {
      id: 'kashmir-white',
      name: 'Kashmir White Granite',
      material: 'Premium Granite',
      blockCode: 'GG-KW-710',
      image: 'images/kashmir_white_granite.png',
      bgSize: '220%',
      desc: 'White-grey background with deep red garnet speckles and cloud patterns. Ideal for high-end flooring and hotel lobbies.',
      origin: 'Tamil Nadu, India',
      whatsappText: 'Hi Gadia Granites, I have an enquiry about Kashmir White Granite (Lot: GG-KW-710) from the Interactive Motion Gallery.'
    },
    {
      id: 'makrana-white',
      name: 'Makrana White Marble',
      material: 'Premium Marble',
      blockCode: 'GG-MW-880',
      image: 'images/makrana_white_closeup.png',
      bgSize: '180%',
      desc: 'Luminous pure white calcite marble with subtle grey veining. Famous globally for its low absorption and natural gloss.',
      origin: 'Makrana, Rajasthan',
      whatsappText: 'Hi Gadia Granites, I have an enquiry about Makrana White Marble (Lot: GG-MW-880) from the Interactive Motion Gallery.'
    },
    {
      id: 'kota-blue',
      name: 'Kota Blue Stone',
      material: 'Kota Stone',
      blockCode: 'GG-KB-012',
      image: 'images/closeup_kota_blue.png',
      bgSize: '160%',
      desc: 'Earthy blue-grey fine-grained natural limestone. Celebrated for its extreme durability and non-slip texture in high-traffic corridors.',
      origin: 'Kota, Rajasthan',
      whatsappText: 'Hi Gadia Granites, I have an enquiry about Kota Blue Stone (Lot: GG-KB-012) from the Interactive Motion Gallery.'
    },
    {
      id: 'yellow-sandstone',
      name: 'Yellow Sandstone',
      material: 'Sandstone',
      blockCode: 'GG-YS-604',
      image: 'images/closeup_yellow_sandstone.png',
      bgSize: '150%',
      desc: 'Warm desert-sand yellow with sedimentary mineral layering. Sourced from Jaisalmer, highly weather-resistant and slip-resistant.',
      origin: 'Jaisalmer, Rajasthan',
      whatsappText: 'Hi Gadia Granites, I have an enquiry about Yellow Sandstone (Lot: GG-YS-604) from the Interactive Motion Gallery.'
    }
  ];

  // ==========================================================================
  // ELEMENT REFERENCES
  // ==========================================================================
  const track1 = document.getElementById('marquee-track-1');
  const track2 = document.getElementById('marquee-track-2');
  const viewerBlock = document.getElementById('interactive-viewer-block');
  const texturePan = document.getElementById('interactive-texture-pan');
  const shineOverlay = document.getElementById('interactive-shine-overlay');
  const imageFrame = document.getElementById('interactive-image-frame');
  
  const stoneMaterial = document.getElementById('viewer-stone-material');
  const stoneName = document.getElementById('viewer-stone-name');
  const stoneDesc = document.getElementById('viewer-stone-desc');
  const ctaLink = document.getElementById('viewer-cta-link');

  if (!track1 || !track2) return;

  // ==========================================================================
  // GENERATE MARQUEE CONTENT
  // ==========================================================================
  // We divide the stones between row 1 and row 2 to make it visually interesting
  const row1Stones = [...MOTION_STONES];
  const row2Stones = [...MOTION_STONES].reverse();

  const createGroupHTML = (stones) => {
    let html = `<div class="marquee-group">`;
    stones.forEach(stone => {
      html += `
        <div class="marquee-item" data-id="${stone.id}">
          <div class="marquee-item-img" style="background-image: url('${stone.image}');"></div>
          <div class="marquee-item-overlay">
            <span>${stone.material}</span>
            <h4>${stone.name}</h4>
          </div>
        </div>
      `;
    });
    html += `</div>`;
    return html;
  };

  // We set up duplicate groups for seamless CSS scrolling loop
  track1.innerHTML = createGroupHTML(row1Stones) + createGroupHTML(row1Stones);
  track2.innerHTML = createGroupHTML(row2Stones) + createGroupHTML(row2Stones);

  // ==========================================================================
  // LOAD SELECTED STONE INTO INTERACTIVE VIEWER
  // ==========================================================================
  let activeStone = null;
  let activeFinish = 'polished';
  let handleMove = () => {};

  // Finish configuration dictionary (controls specular lighting parameters)
  const FINISH_CONFIGS = {
    polished: {
      shineOpacity: 0.18,
      shineSize: 25,
      diffuseOpacity: 0.05
    },
    honed: {
      shineOpacity: 0.12,
      shineSize: 45,
      diffuseOpacity: 0.02
    },
    leathered: {
      shineOpacity: 0.04,
      shineSize: 15,
      diffuseOpacity: 0.0
    }
  };

  const loadStoneToViewer = (stoneId) => {
    const stone = MOTION_STONES.find(s => s.id === stoneId);
    if (!stone) return;

    activeStone = stone;

    // Show viewer block with animation
    viewerBlock.style.display = 'block';

    // Update viewer details
    stoneMaterial.textContent = `${stone.material} · Lot ID: ${stone.blockCode}`;
    stoneName.textContent = stone.name;
    stoneDesc.textContent = `${stone.desc} Origin: ${stone.origin}. Move your cursor across the stone slab to explore detailed texture veining and check the polished surface reflectivity.`;
    
    // Update WhatsApp link
    const linkText = encodeURIComponent(stone.whatsappText);
    ctaLink.setAttribute('href', `https://wa.me/919999999999?text=${linkText}`);
    ctaLink.setAttribute('target', '_blank');

    // Update texture background image
    texturePan.style.backgroundImage = `url('${stone.image}')`;
    texturePan.style.backgroundSize = stone.bgSize || '200%';

    // Reset background position and shine
    texturePan.style.backgroundPosition = '50% 50%';
    const config = FINISH_CONFIGS[activeFinish] || FINISH_CONFIGS.polished;
    shineOverlay.style.background = `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, ${config.shineOpacity / 2}) 0%, rgba(255, 255, 255, 0) 50%)`;

    // Highlight active item in marquee
    document.querySelectorAll('.marquee-item').forEach(item => {
      if (item.getAttribute('data-id') === stoneId) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
  };

  // Bind Finish Selector click listener once
  const finishSelector = document.getElementById('viewer-finish-selector');
  if (finishSelector) {
    const finishBtns = finishSelector.querySelectorAll('.finish-btn');
    finishBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button
        finishBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update active finish state
        activeFinish = btn.getAttribute('data-finish');

        // Trigger coordinate shift recalculation (visually matches the change immediately)
        if (imageFrame) {
          const rect = imageFrame.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          handleMove(centerX, centerY);
        }
      });
    });
  }

  // Bind click handlers to marquee items
  document.querySelectorAll('.marquee-item').forEach(item => {
    item.addEventListener('click', () => {
      const stoneId = item.getAttribute('data-id');
      loadStoneToViewer(stoneId);
    });
  });

  // Load the first stone (Black Galaxy) as default on window load
  loadStoneToViewer('black-galaxy');

  // ==========================================================================
  // INTERACTIVE 3D PAN & SHINE EFFECT
  // ==========================================================================
  if (imageFrame && texturePan && shineOverlay) {
    handleMove = (clientX, clientY) => {
      const rect = imageFrame.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Restrict percentage between 0 and 100
      const percentX = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const percentY = Math.max(0, Math.min(100, (y / rect.height) * 100));

      // Calculate panning offsets (-12% to +12% shift around center 50%)
      const panLimit = 12; // Maximum offset percentage
      const panX = 50 + ((percentX - 50) / 50) * panLimit;
      const panY = 50 + ((percentY - 50) / 50) * panLimit;

      // Update style properties
      texturePan.style.backgroundPosition = `${panX}% ${panY}%`;

      // Read values from active finish config
      const config = FINISH_CONFIGS[activeFinish] || FINISH_CONFIGS.polished;

      // Simulates light reflection (specular highlight) shifting with the cursor
      shineOverlay.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, ${config.shineOpacity}) 0%, rgba(255, 255, 255, ${config.diffuseOpacity}) ${config.shineSize}%, rgba(0, 0, 0, 0) 55%)`;
    };

    imageFrame.addEventListener('mousemove', (e) => {
      handleMove(e.clientX, e.clientY);
    });

    // Touch support for tablets and phones
    imageFrame.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        // Prevent scrolling while panning inside the frame
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });

    // Reset reflection on mouse leave
    imageFrame.addEventListener('mouseleave', () => {
      texturePan.style.transition = 'background-position 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      shineOverlay.style.transition = 'background 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      
      texturePan.style.backgroundPosition = '50% 50%';
      const config = FINISH_CONFIGS[activeFinish] || FINISH_CONFIGS.polished;
      shineOverlay.style.background = `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, ${config.shineOpacity / 2}) 0%, rgba(255, 255, 255, 0) 50%)`;
    });

    imageFrame.addEventListener('mouseenter', () => {
      // Clear transitions to allow real-time coordinate updates
      texturePan.style.transition = 'none';
      shineOverlay.style.transition = 'none';
    });
  }

  // ==========================================================================
  // HERO INTERACTIVE MOTION (CURSOR & SCROLL PARALLAX)
  // ==========================================================================
  const heroSection = document.getElementById('hero-section');
  const heroTexture = document.getElementById('hero-texture-pan-bg');
  const heroShine = document.getElementById('hero-shine-overlay-bg');

  if (heroSection && heroTexture && heroShine) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let scrollY = window.scrollY;

    const updateHeroPosition = () => {
      // Calculate coordinates relative to screen center
      const moveX = (mouseX - window.innerWidth / 2) / (window.innerWidth / 2);
      const moveY = (mouseY - window.innerHeight / 2) / (window.innerHeight / 2);

      const cursorLimit = 25; // max displacement in pixels
      const scrollFactor = 0.18; // scroll offset factor

      const translateX = -moveX * cursorLimit;
      const translateY = (-moveY * cursorLimit) + (scrollY * scrollFactor);

      // Perform high-performance GPU translation
      heroTexture.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(1.15)`;

      // Map radial shine overlay based on relative mouse percentage
      const percentX = (mouseX / window.innerWidth) * 100;
      const percentY = (mouseY / window.innerHeight) * 100;
      heroShine.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.03) 25%, rgba(0, 0, 0, 0) 55%)`;
    };

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      updateHeroPosition();
    });

    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
      updateHeroPosition();
    });

    // Handle touch move for tablets and phones
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        updateHeroPosition();
      }
    });

    // Run initial setting
    updateHeroPosition();
  }
});
