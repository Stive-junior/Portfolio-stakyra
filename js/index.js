/* ===== INDEX.JS - PAGE D'ACCUEIL ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Configuration initiale
  const DOM = {
    heroSection: document.querySelector('.hero-section'),
    avatarContainer: document.querySelector('.avatar-container'),
    techIcons: document.querySelectorAll('.tech-icon'),
    galleryItems: document.querySelectorAll('.gallery-item'),
    scrollDown: document.querySelector('.scroll-down')
    // Suppression de loadingScreen
  };

  const STATE = {
    isMobile: window.innerWidth < 768,
    isTouchDevice: 'ontouchstart' in window,
    scrollPosition: 0,
    lastScrollPosition: 0,
    isScrolling: false
  };

  // Initialisation des composants
  initTypingEffect();
  initAvatarInteraction();
  initGalleryHover();
  initScrollDown();
  initPageTransitions();
  initParallaxEffect();
  // Suppression de initLoadingScreen();

  // Écouteurs d'événements
  setupEventListeners();

  console.log('Page d\'accueil initialisée');

  /* ===== FONCTIONS D'INITIALISATION ===== */

  /**
   * Effet de texte tapé dynamique
   */
  function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const texts = [
      "Développeuse Full-Stack",
      "Spécialiste React & Node.js",
      "Passionnée d'UI/UX",
      "Créatrice de solutions digitales"
    ];

    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    let typingSpeed = 100;

    const type = () => {
      if (isPaused) return;

      const currentText = texts[currentIndex];
      let displayText;

      if (isDeleting) {
        displayText = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        displayText = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = charIndex % 3 === 0 ? 150 : 100; // Variation de vitesse
      }

      subtitle.textContent = displayText;

      // Gestion des états
      if (!isDeleting && charIndex === currentText.length) {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isDeleting = true;
          setTimeout(type, 200);
        }, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % texts.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, typingSpeed);
      }
    };

    // Démarrer après un léger délai
    setTimeout(type, 1500);
  }

  /**
   * Interactions avec l'avatar
   */
  function initAvatarInteraction() {
    if (!DOM.avatarContainer || STATE.isTouchDevice) return;

    const avatarImage = DOM.avatarContainer.querySelector('.avatar-image');
    const hoverEffect = document.createElement('div');
    hoverEffect.className = 'avatar-hover-effect';
    DOM.avatarContainer.appendChild(hoverEffect);

    DOM.avatarContainer.addEventListener('mousemove', (e) => {
      const rect = DOM.avatarContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = (x - centerX) / 15;
      const rotateX = (centerY - y) / 15;

      DOM.avatarContainer.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;
      hoverEffect.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(71, 181, 255, 0.3), transparent)`;
    });

    DOM.avatarContainer.addEventListener('mouseleave', () => {
      DOM.avatarContainer.style.transform = 'rotateY(0) rotateX(0)';
      hoverEffect.style.opacity = '0';
      setTimeout(() => {
        hoverEffect.style.background = 'transparent';
        hoverEffect.style.opacity = '1';
      }, 300);
    });
  }

  /**
   * Effets de hover sur la galerie
   */
  function initGalleryHover() {
    DOM.galleryItems.forEach(item => {
      const image = item.querySelector('.gallery-image');
      const overlay = item.querySelector('.gallery-overlay');

      // Pré-charge l'image pour éviter les sauts
      if (image.dataset.src) {
        image.src = image.dataset.src;
      }

      item.addEventListener('mouseenter', () => {
        if (STATE.isTouchDevice) return;

        item.style.zIndex = '10';
        overlay.style.transform = 'translateY(0)';
        image.style.transform = 'scale(1.1)';
      });

      item.addEventListener('mouseleave', () => {
        item.style.zIndex = '1';
        overlay.style.transform = 'translateY(100%)';
        image.style.transform = 'scale(1)';
      });

      // Gestion tactile
      if (STATE.isTouchDevice) {
        item.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          DOM.galleryItems.forEach(i => {
            i.classList.remove('active');
            i.querySelector('.gallery-overlay').style.transform = 'translateY(100%)';
            i.querySelector('.gallery-image').style.transform = 'scale(1)';
          });

          if (!isActive) {
            item.classList.add('active');
            overlay.style.transform = 'translateY(0)';
            image.style.transform = 'scale(1.1)';
          }
        });
      }
    });
  }

  /**
   * Animation du bouton "scroll down"
   */
  function initScrollDown() {
    if (!DOM.scrollDown) return;

    DOM.scrollDown.addEventListener('click', (e) => {
      e.preventDefault();
      const gallerySection = document.querySelector('.gallery-section');
      if (gallerySection) {
        gallerySection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });

    // Effet de pulsation
    setInterval(() => {
      if (window.scrollY === 0) {
        DOM.scrollDown.style.transform = 'translateY(0)';
        setTimeout(() => {
          DOM.scrollDown.style.transform = 'translateY(-10px)';
        }, 1000);
      }
    }, 2000);
  }

  /**
   * Effet de parallaxe sur la section hero
   */
  function initParallaxEffect() {
    if (STATE.isMobile) return;

    const parallaxElements = [
      { element: DOM.heroSection.querySelector('.hero-title'), factor: 0.1 },
      { element: DOM.heroSection.querySelector('.hero-subtitle'), factor: 0.15 },
      { element: DOM.avatarContainer, factor: 0.2 },
      { element: DOM.heroSection.querySelector('.tech-stack'), factor: 0.05 }
    ];

    window.addEventListener('scroll', () => {
      if (STATE.isScrolling) return;

      STATE.isScrolling = true;
      STATE.scrollPosition = window.scrollY;

      requestAnimationFrame(() => {
        parallaxElements.forEach(item => {
          if (!item.element) return;

          const position = (STATE.scrollPosition * item.factor);
          item.element.style.transform = `translateY(${position}px)`;
        });

        STATE.isScrolling = false;
      });
    });
  }

  /**
   * Transition entre les pages
   */
  function initPageTransitions() {
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.href === window.location.href) {
          e.preventDefault();
          return;
        }

        e.preventDefault();
        window.location.href = link.href; // Navigation immédiate sans preloader
      });
    });
  }

  /**
   * Configuration des écouteurs d'événements
   */
  function setupEventListeners() {
    // Redimensionnement
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        STATE.isMobile = window.innerWidth < 768;
        console.log(`Taille de l'écran mise à jour: Mobile? ${STATE.isMobile}`);
      }, 250);
    });

    // Scroll doux pour ancres internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Animation des icônes tech
    DOM.techIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-5px) scale(1.2)';
      });

      icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  /* ===== ANIMATIONS PERSONNALISÉES ===== */

  /**
   * Anime les éléments lorsqu'ils apparaissent à l'écran
   */
  function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.85;

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;

      if (elementPosition < triggerPoint) {
        const animation = element.dataset.animate || 'fadeInUp';
        element.style.animation = `${animation} 0.6s ease-out forwards`;
        element.style.opacity = '1';
      }
    });
  }

  // Initialisation et écouteur
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);

  /**
   * Effet de vague sur les boutons
   */
  function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn:not(.no-ripple)');

    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 1000);
      });
    });
  }

  initRippleEffect();
});