/* ==========================================================================
   NAVIGATION.JS
   Comportamiento del header: fondo sólido al hacer scroll y menú móvil
   (hamburguesa) con apertura/cierre accesible.
   ========================================================================== */

const SCROLL_THRESHOLD = 40;
const DESKTOP_BREAKPOINT = 860;

/**
 * Activa/desactiva la clase `is-scrolled` según la posición de scroll.
 * @param {HTMLElement} nav
 */
function handleScrollState(nav) {
  return () => {
    nav.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
  };
}

/**
 * Inicializa el comportamiento completo de navegación.
 */
export function initNavigation() {
  const nav = document.getElementById('siteNav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (!nav) return;

  // --- Fondo sólido al hacer scroll ---
  const onScroll = handleScrollState(nav);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (!navToggle || !navLinks) return;

  // --- Menú móvil ---
  const closeMobileMenu = () => {
    nav.classList.remove('nav--open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  const toggleMobileMenu = () => {
    const isOpen = nav.classList.toggle('nav--open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  };

  navToggle.addEventListener('click', toggleMobileMenu);

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Cierra el menú si el usuario redimensiona a escritorio
  window.addEventListener('resize', () => {
    if (window.innerWidth > DESKTOP_BREAKPOINT) {
      closeMobileMenu();
    }
  });

  // Cierra el menú con la tecla Escape (accesibilidad / teclado)
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('nav--open')) {
      closeMobileMenu();
      navToggle.focus();
    }
  });
}
