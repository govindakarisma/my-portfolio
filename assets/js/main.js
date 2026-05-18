/**
* Template Name: FlexStart
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        aos_init();
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfokio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Blur Lock Overlay - Triggered on custom scroll position
   */
  const blurLockOverlay = select('#blurLockOverlay');
  const unlockBtn = select('#unlockBtn');

  // Atur trigger blur di sini (scrollY dalam pixel)
  const blurTriggerPosition = 340; // Ganti angka ini sesuai posisi yang diinginkan
  
  let blurLocked = false;
  let touchStartY = 0;

  // Activate blur lock
  const activateBlurLock = () => {
    if (!blurLocked && blurLockOverlay) {
      blurLockOverlay.classList.add('active');
      blurLocked = true;
    }
  };

  // Deactivate blur lock
  const deactivateBlurLock = () => {
    if (blurLocked && blurLockOverlay) {
      blurLockOverlay.classList.remove('active');
      blurLocked = false;
    }
  };

  // Check if user has scrolled past trigger position
  const checkAboutSectionScroll = () => {
    if (!blurLockOverlay) return;

    const currentScroll = window.scrollY;

    if (currentScroll >= blurTriggerPosition) {
      activateBlurLock();
    } else {
      deactivateBlurLock();
    }
  };

  // Restrict downward scrolling when blur is locked
  const restrictScroll = (e) => {
    if (!blurLocked || !aboutSection) return;

    const aboutTop = getAboutSectionTop();
    const currentScroll = window.scrollY;

    if (currentScroll < aboutTop - 100) return;

    if (e.type === 'wheel') {
      if (e.deltaY > 0) {
        e.preventDefault();
      }
    }

    if (e.type === 'keydown') {
      const scrollDownKeys = ['ArrowDown', 'PageDown', ' ', 'End'];
      if (scrollDownKeys.includes(e.key)) {
        e.preventDefault();
      }
    }

    if (e.type === 'touchmove') {
      const touchMoveY = e.touches[0].clientY;
      const isSwipeUp = touchMoveY < touchStartY;
      if (isSwipeUp) {
        e.preventDefault();
      }
    }
  };

  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  // Fun gimmick animation for button (no unlock function)
  if (unlockBtn) {
    unlockBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Fun bounce animation
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = 'bounce 0.6s ease';
      }, 10);
      
      // Wiggle animation
      this.classList.add('wiggle');
      setTimeout(() => {
        this.classList.remove('wiggle');
      }, 600);
    });
    
    // Hover effects (gimmick)
    unlockBtn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    unlockBtn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  }

  // Listen to scroll events
  window.addEventListener('scroll', checkAboutSectionScroll, { passive: true, capture: true });
  window.addEventListener('load', checkAboutSectionScroll);

  // Restrict scroll with wheel, keyboard, and touch events
  document.addEventListener('wheel', restrictScroll, { passive: false, capture: true });
  document.addEventListener('keydown', restrictScroll, false);
  document.addEventListener('touchmove', restrictScroll, { passive: false, capture: true });

  // Initialize blur state on load
  checkAboutSectionScroll();

  // Add CSS animations for gimmick effects
  const style = document.createElement('style');
  style.textContent = `
    @keyframes bounce {
      0%, 100% { transform: translateY(0) scale(1); }
      25% { transform: translateY(-10px) scale(1.05); }
      50% { transform: translateY(0) scale(1); }
      75% { transform: translateY(-5px) scale(1.02); }
    }
    
    .btn-unlock.wiggle {
      animation: wiggle 0.6s ease !important;
    }
    
    @keyframes wiggle {
      0%, 100% { transform: rotateZ(0deg); }
      15% { transform: rotateZ(-5deg); }
      30% { transform: rotateZ(5deg); }
      45% { transform: rotateZ(-5deg); }
      60% { transform: rotateZ(5deg); }
      75% { transform: rotateZ(-5deg); }
    }
  `;
  document.head.appendChild(style);

})();