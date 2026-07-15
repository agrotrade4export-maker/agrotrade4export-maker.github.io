/* ==========================================================================
   MAIN.JS
   Punto de entrada único del sitio (cargado como `type="module"`).
   Orquesta la inicialización de los demás módulos y contiene únicamente
   utilidades triviales que no ameritan un archivo propio.
   ========================================================================== */

import { initNavigation } from './navigation.js';
import { initScrollReveal, initCounters } from './animations.js';
import { initWhatsappLinks } from './whatsapp.js';

/** Escribe el año actual en el elemento #year del footer. */
function setCurrentYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

function init() {
  initNavigation();
  initScrollReveal();
  initCounters();
  initWhatsappLinks();
  setCurrentYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // El DOM ya está listo (script cargado con defer/module tras el parseo)
  init();
}
