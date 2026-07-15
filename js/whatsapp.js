/* ==========================================================================
   WHATSAPP.JS
   Fuente única de verdad para el número de WhatsApp del sitio.
   Cualquier elemento con el atributo `data-whatsapp-msg` recibirá
   automáticamente su enlace `https://wa.me/...` con el mensaje indicado,
   evitando duplicar el número de teléfono en el HTML.

   Uso en HTML:
   <a href="#" data-whatsapp-msg="Hola, quiero más información.">Escríbenos</a>
   <a href="#" data-whatsapp-msg="">Hablar por WhatsApp</a>  (sin mensaje predefinido)
   ========================================================================== */

// Número oficial de WhatsApp de Operaciones Logísticas Beltrán S.A.S.
// Formato requerido por la API de WhatsApp: solo dígitos, con código de país, sin "+".
export const WHATSAPP_NUMBER = '573208296411';

/**
 * Construye una URL válida de wa.me a partir de un mensaje opcional.
 * @param {string} [message] Mensaje predefinido (se codifica automáticamente).
 * @returns {string} URL lista para usar en un atributo href.
 */
export function buildWhatsappLink(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Recorre el documento y asigna el href correspondiente a cada elemento
 * marcado con `data-whatsapp-msg`.
 */
export function initWhatsappLinks() {
  const links = document.querySelectorAll('[data-whatsapp-msg]');

  links.forEach((link) => {
    const message = link.getAttribute('data-whatsapp-msg');
    link.setAttribute('href', buildWhatsappLink(message));
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
  });
}
