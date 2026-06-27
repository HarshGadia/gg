document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // MOBILE NAVIGATION MENU
  // ==========================================================================
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  
  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.classList.contains('open');
      if (isOpen) {
        mobileToggle.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      } else {
        mobileToggle.classList.add('open');
        mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
      }
    });

    // Close mobile menu when clicking nav links
    const mobileLinks = mobileOverlay.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================================================
  // STICKY HEADER, SCROLL PROGRESS & PARALLAX
  // ==========================================================================
  const header = document.querySelector('.header');
  
  // Create progress bar element dynamically
  const progressBar = document.createElement('div');
  progressBar.classList.add('scroll-progress-bar');
  document.body.appendChild(progressBar);
  
  const hero = document.querySelector('.hero');
  
  const handleScroll = () => {
    // Header transformation
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Scroll progress bar logic
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = scrolled + '%';
    
    // Hero image scroll parallax is now handled inside granite-motion.js utilizing translate3d
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run on load to set initial state

  // ==========================================================================
  // SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once animated, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12, // Trigger when 12% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly before it enters viewport
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(element => {
      element.classList.add('active');
    });
  }

  // ==========================================================================
  // HIGHLIGHT ACTIVE PAGE NAV LINK
  // ==========================================================================
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    // Simple path matching
    if (currentPath.endsWith(linkHref) || 
        (currentPath === '/' && linkHref === 'index.html') ||
        (currentPath === '' && linkHref === 'index.html') ||
        (currentPath.endsWith('/') && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ==========================================================================
  // SMOOTH ANCHOR LINK INTERACTION
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
