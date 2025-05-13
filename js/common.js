/* ===== COMMON.JS - VERSION ULTRA COMPLÈTE ===== */
/**
 * 
 * @type {Object}
 */
const PortfolioConfig = {
 
  isMobile: window.innerWidth < 992,
  isTouch: 'ontouchstart' in window,
  prefersDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
  
  
  dom: {
    body: document.body,
    header: document.querySelector('.main-header'),
    burgerButton: document.querySelector('.burger-menu'),
    mobileMenu: document.querySelector('.mobile-menu'),
    themeToggle: document.querySelector('#theme-toggle'),
    scrollToTop: document.querySelector('.scroll-to-top'),
    currentYear: document.querySelector('.current-year'),
    allAnimated: document.querySelectorAll('[data-animate]'),
    tooltips: document.querySelectorAll('[data-tooltip]')
  },

  // États
  states: {
    menuOpen: false,
    darkMode: false,
    scrolled: false
  },

  // LocalStorage keys
  storage: {
    theme: 'portfolio_theme_preference',
    visited: 'portfolio_first_visit'
  }
};

/**
 * Initialise l'application
 */
function initApp() {
  // Vérifie la première visite
  checkFirstVisit();

  // Initialise les composants
  initThemeSystem();
  initMobileMenu();
  initSmoothScrolling();
  initScrollEffects();
  initTooltips();
  initCurrentYear();
  initObservers();
  initAnalytics();


  setupEventListeners();

  console.log('Application initialisée - Portfolio Stakyra');
}

/**
 * Système de thème sombre/clair
 */
function initThemeSystem() {
  // Récupère la préférence sauvegardée ou utilise la préférence système
  const savedTheme = localStorage.getItem(PortfolioConfig.storage.theme);
  PortfolioConfig.states.darkMode = savedTheme 
    ? savedTheme === 'dark'
    : PortfolioConfig.prefersDark;

  // Applique le thème initial
  applyTheme(PortfolioConfig.states.darkMode);

  // Initialise le bouton de bascule
  if (PortfolioConfig.dom.themeToggle) {
    PortfolioConfig.dom.themeToggle.addEventListener('click', toggleTheme);
    updateThemeIcon();
  }

  // Surveille les changements de préférence système
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(PortfolioConfig.storage.theme)) {
      applyTheme(e.matches);
    }
  });
}

/**
 * Applique le thème sélectionné
 * @param {boolean} isDark - Si true, active le thème sombre
 */
function applyTheme(isDark) {
  PortfolioConfig.states.darkMode = isDark;
  PortfolioConfig.dom.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  localStorage.setItem(PortfolioConfig.storage.theme, isDark ? 'dark' : 'light');
  updateThemeIcon();
}

/**
 * Bascule entre les thèmes
 */
function toggleTheme() {
  applyTheme(!PortfolioConfig.states.darkMode);
}

/**
 * Met à jour l'icône du thème
 */
function updateThemeIcon() {
  if (!PortfolioConfig.dom.themeToggle) return;
  
  const icon = PortfolioConfig.dom.themeToggle.querySelector('i');
  if (!icon) return;
  
  icon.classList.toggle('fa-moon', !PortfolioConfig.states.darkMode);
  icon.classList.toggle('fa-sun', PortfolioConfig.states.darkMode);
}

/**
 * Gestion du menu mobile
 */
function initMobileMenu() {
  if (!PortfolioConfig.dom.burgerButton || !PortfolioConfig.dom.mobileMenu) return;

  PortfolioConfig.dom.burgerButton.addEventListener('click', function() {
    PortfolioConfig.states.menuOpen = !PortfolioConfig.states.menuOpen;
    this.classList.toggle('active');
    PortfolioConfig.dom.mobileMenu.classList.toggle('active');
    PortfolioConfig.dom.body.classList.toggle('no-scroll', PortfolioConfig.states.menuOpen);

    // Annimation des lignes du burger
    this.querySelectorAll('.burger-line').forEach(line => {
      line.classList.toggle('active', PortfolioConfig.states.menuOpen);
    });
  });

  // Ferme le menu quand on clique sur un lien
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (PortfolioConfig.states.menuOpen) {
        PortfolioConfig.dom.burgerButton.click();
      }
    });
  });
}

/**
 * Défilement fluide vers les ancres
 */
function initSmoothScrolling() {
  // Polyfill pour les anciens navigateurs
  if (!('scrollBehavior' in document.documentElement.style)) {
    import('https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js')
      .then(() => smoothscroll.polyfill());
  }

  // Intercepte les clics sur les ancres
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.hash === '#') return;

    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.hash);
      if (!target) return;

      // Scroll vers la cible
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Met à jour l'URL sans rechargement
      if (history.pushState) {
        history.pushState(null, null, this.hash);
      } else {
        window.location.hash = this.hash;
      }

      // Met à jour la navigation active
      updateActiveNav(this.hash);
    });
  });
}

/**
 * Met à jour le lien actif dans la navigation
 * @param {string} hash - Le hash de l'URL
 */
function updateActiveNav(hash) {
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const linkPath = link.getAttribute('href');
    link.classList.toggle('active', linkPath === hash);
  });
}

/**
 * Effets au scroll
 */
function initScrollEffects() {
  // Header qui rétrécit au scroll
  window.addEventListener('scroll', () => {
    PortfolioConfig.states.scrolled = window.scrollY > 100;
    PortfolioConfig.dom.header?.classList.toggle('scrolled', PortfolioConfig.states.scrolled);
  });

  // Bouton "back to top"
  if (PortfolioConfig.dom.scrollToTop) {
    window.addEventListener('scroll', () => {
      const show = window.scrollY > window.innerHeight;
      PortfolioConfig.dom.scrollToTop.classList.toggle('visible', show);
    });

    PortfolioConfig.dom.scrollToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * Initialise les tooltips
 */
function initTooltips() {
  PortfolioConfig.dom.tooltips.forEach(element => {
    const tooltipText = element.getAttribute('data-tooltip');
    if (!tooltipText) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    document.body.appendChild(tooltip);

    // Positionnement
    const updatePosition = () => {
      const rect = element.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
      tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    };

    // Gestion des événements
    element.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
      updatePosition();
    });

    element.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });

    element.addEventListener('mousemove', updatePosition);
  });
}

/**
 * Initialise l'année courante
 */
function initCurrentYear() {
  if (PortfolioConfig.dom.currentYear) {
    PortfolioConfig.dom.currentYear.textContent = new Date().getFullYear();
  }
}

/**
 * Initialise les Observers Intersection
 */
function initObservers() {
  // Observer pour les animations
  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        animateObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observe tous les éléments avec data-animate
  PortfolioConfig.dom.allAnimated.forEach(el => {
    animateObserver.observe(el);
  });

  // Observer pour le lazy loading
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyElement = entry.target;
          if (lazyElement.dataset.src) {
            lazyElement.src = lazyElement.dataset.src;
          }
          if (lazyElement.dataset.srcset) {
            lazyElement.srcset = lazyElement.dataset.srcset;
          }
          lazyObserver.unobserve(lazyElement);
        }
      });
    });

    document.querySelectorAll('[data-src], [data-srcset]').forEach(el => {
      lazyObserver.observe(el);
    });
  }
}

/**
 * Vérifie si c'est la première visite
 */
function checkFirstVisit() {
  if (!localStorage.getItem(PortfolioConfig.storage.visited)) {
    localStorage.setItem(PortfolioConfig.storage.visited, 'true');
    console.log('Première visite - Bienvenue !');
    
    // Animation spéciale pour la première visite
    document.querySelector('.preloader')?.classList.add('active');
  }
}

/**
 * Initialise Google Analytics (optionnel)
 */
function initAnalytics() {
  if (typeof gtag !== 'undefined') {
    console.log('Google Analytics initialisé');
    // Configuration supplémentaire peut être ajoutée ici
  }
}

/**
 * Configure les écouteurs d'événements globaux
 */
function setupEventListeners() {
  // Redimensionnement de la fenêtre
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      PortfolioConfig.isMobile = window.innerWidth < 992;
      console.log(`Redimensionnement détecté - Mobile: ${PortfolioConfig.isMobile}`);
    }, 250);
  });

  // Clic en dehors du menu mobile pour le fermer
  document.addEventListener('click', (e) => {
    if (PortfolioConfig.states.menuOpen && 
        !e.target.closest('.mobile-menu') && 
        !e.target.closest('.burger-menu')) {
      PortfolioConfig.dom.burgerButton.click();
    }
  });

  // Touche Escape pour fermer le menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && PortfolioConfig.states.menuOpen) {
      PortfolioConfig.dom.burgerButton.click();
    }
  });
}

// Export pour les tests (si module)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initApp,
    applyTheme,
    toggleTheme,
    PortfolioConfig
  };
} else {
  // Initialisation au chargement du DOM
  document.addEventListener('DOMContentLoaded', initApp);
}