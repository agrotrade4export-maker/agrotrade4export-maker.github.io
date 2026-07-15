/* ==========================================================================
   ANIMATIONS.JS
   Animaciones de aparición (scroll reveal) y contadores numéricos animados
   para la sección de estadísticas. Usa IntersectionObserver nativo,
   sin dependencias externas, con fallback si el navegador no lo soporta.
   ========================================================================== */

/**
 * Revela suavemente los elementos `.reveal` cuando entran en el viewport.
 */
export function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/**
 * Anima un contador numérico desde 0 hasta el valor de `data-count-to`.
 * @param {HTMLElement} el
 */
function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count-to'), 10) || 0;
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1600;
  let startTime = null;

  const easeOutQuad = (t) => t * (2 - t);

  function step(timestamp) {
    if (startTime === null) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = easeOutQuad(progress);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString('es-CO') + suffix;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      el.textContent = target.toLocaleString('es-CO') + suffix;
    }
  }

  window.requestAnimationFrame(step);
}

/**
 * Observa la sección de estadísticas y dispara el conteo animado
 * una sola vez, cuando el bloque entra en el viewport.
 */
export function initCounters() {
  const statNumbers = document.querySelectorAll('.stat__number');
  if (!statNumbers.length) return;

  if (!('IntersectionObserver' in window)) {
    statNumbers.forEach((el) => {
      const target = parseInt(el.getAttribute('data-count-to'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      el.textContent = target.toLocaleString('es-CO') + suffix;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  statNumbers.forEach((el) => observer.observe(el));
}
