# OLB-Website

Landing page corporativa de **Operaciones Logísticas Beltrán S.A.S.** — operador logístico 4PL en Colombia.

Proyecto **100% HTML5 + CSS3 + JavaScript ES6+ puro**, sin frameworks ni dependencias de build (no requiere `npm install`, `webpack`, `vite` ni ningún compilador). Se ejecuta abriendo la carpeta directamente.

---

## 📁 Estructura del proyecto

```
OLB-Website/
│
├── index.html              → Documento único de la landing page
├── README.md                → Este archivo
├── robots.txt                → Directivas para motores de búsqueda
├── sitemap.xml                → Mapa del sitio para SEO
│
├── css/
│   ├── variables.css        → Tokens de diseño: color, tipografía, espaciado (SIEMPRE primero)
│   ├── layout.css            → Reset, contenedores, grid y estructura
│   ├── components.css        → Apariencia de cada componente (botones, tarjetas, nav…)
│   └── responsive.css        → Breakpoints Desktop First → Tablet → Mobile (SIEMPRE al final)
│
├── js/
│   ├── navigation.js        → Nav sticky + menú móvil (ES Module)
│   ├── animations.js         → Scroll reveal + contadores animados (ES Module)
│   ├── whatsapp.js           → Fuente única del número de WhatsApp (ES Module)
│   └── main.js                → Punto de entrada; importa y orquesta los módulos
│
├── images/
│   ├── favicon.svg
│   ├── logo-mark.svg
│   ├── hero-illustration.svg
│   └── network-diagram.svg
│
├── documents/                → Carpeta reservada para PDFs/brochures descargables (vacía)
└── assets/                    → Carpeta reservada para futuros recursos (vacía)
```

> `documents/` y `assets/` incluyen un archivo `.gitkeep` para que Git las versione aunque estén vacías. Elimínalo cuando agregues contenido real.

---

## 🧩 Arquitectura CSS

El CSS está dividido en 4 capas con una única responsabilidad cada una, cargadas **siempre en este orden** en `index.html`:

1. **`variables.css`** — Única fuente de verdad de la marca (colores, fuentes, espaciados, sombras, transiciones). Ningún otro archivo debe declarar un color o `font-family` "a mano"; siempre se consume vía `var(--nombre)`.
2. **`layout.css`** — Estructura: reset, `.container`, grids, posicionamiento. No contiene color ni tipografía de marca.
3. **`components.css`** — Piel visual de cada componente (botones, tarjetas, nav, footer, etc.), construida sobre las variables.
4. **`responsive.css`** — Sobrescrituras Desktop First para tablet (`≤1080px`), menú móvil (`≤860px`) y móvil (`≤640px`). Debe cargarse al final para que gane la cascada.

Si necesitas cambiar un color de marca, **solo edita `variables.css`**; se propaga automáticamente a todo el sitio.

---

## 🧩 Arquitectura JavaScript (ES Modules nativos)

`index.html` carga un único script:

```html
<script type="module" src="js/main.js"></script>
```

`main.js` importa y ejecuta los demás módulos — no hay variables globales ni necesidad de ordenar `<script>` manualmente:

| Módulo             | Responsabilidad                                                        |
|---------------------|--------------------------------------------------------------------------|
| `whatsapp.js`       | Define `WHATSAPP_NUMBER` (única fuente del teléfono) y construye los enlaces `wa.me` para cualquier elemento con `data-whatsapp-msg`. |
| `navigation.js`     | Nav con fondo sólido al hacer scroll + menú móvil accesible (Escape, ARIA). |
| `animations.js`     | Scroll reveal (`IntersectionObserver`) y contadores animados en Estadísticas. |
| `main.js`           | Orquesta la inicialización y actualiza el año del footer.               |

### Cómo cambiar el número de WhatsApp
Editar **una sola línea** en `js/whatsapp.js`:
```js
export const WHATSAPP_NUMBER = '573208296411';
```
Todos los botones de WhatsApp del sitio (nav, hero, banner, footer, botón flotante) se actualizan automáticamente porque leen este valor — no hay números de teléfono repetidos en el HTML.

### Cómo agregar un nuevo botón de WhatsApp
En el HTML, basta con:
```html
<a href="#" data-whatsapp-msg="Tu mensaje predefinido aquí">Escríbenos</a>
```
`whatsapp.js` completará el `href` automáticamente al cargar la página.

> ⚠️ **Nota sobre `file://`**: los módulos ES6 (`type="module"`) no se ejecutan si abres `index.html` con doble clic directamente desde el explorador de archivos (protocolo `file://`) en algunos navegadores por restricciones CORS. Debes servir el sitio con un servidor local — **Live Server de VS Code cumple este requisito automáticamente**.

---

## ▶️ Cómo ejecutar en Visual Studio Code

1. Abre la carpeta `OLB-Website/` completa en VS Code (`Archivo → Abrir carpeta…`).
2. Instala la extensión **Live Server** (Ritwick Dey) si no la tienes.
3. Clic derecho sobre `index.html` → **"Open with Live Server"** (o botón "Go Live" en la barra inferior).
4. El sitio se abrirá en `http://127.0.0.1:5500/` sin errores de consola ni rutas rotas.

---

## 🚀 Despliegue

### GitHub Pages
1. Sube el contenido de `OLB-Website/` a la raíz de un repositorio de GitHub.
2. Ve a **Settings → Pages**.
3. En "Source" selecciona la rama `main` y la carpeta `/ (root)`.
4. Guarda. El sitio quedará publicado en `https://tu-usuario.github.io/tu-repositorio/`.
5. Actualiza las URLs absolutas (`canonical`, Open Graph, `sitemap.xml`, `robots.txt`) con esa dirección real (ver sección siguiente).

### HostGator / cPanel / Apache
1. Comprime el contenido de `OLB-Website/` (no la carpeta en sí, sino su contenido) en un `.zip`.
2. En cPanel, ve a **Administrador de archivos → `public_html`**.
3. Sube y descomprime el `.zip` directamente en `public_html` (o en una subcarpeta si es un addon domain).
4. Verifica que `index.html` quede en la raíz de `public_html`.
5. No se requiere configuración adicional: el proyecto usa exclusivamente HTML/CSS/JS estático, compatible con cualquier servidor Apache/LiteSpeed estándar.

---

## ⚠️ Antes de publicar en producción — checklist de datos a reemplazar

Este proyecto usa **`https://www.olbeltran.com/`** como dominio de ejemplo (placeholder) en:

- `index.html` → `<link rel="canonical">`, Open Graph (`og:url`, `og:image`), Twitter Cards, JSON-LD (`url`, `image`).
- `robots.txt` → línea `Sitemap:`.
- `sitemap.xml` → `<loc>`.

Reemplázalo por tu dominio real antes de publicar (búsqueda y reemplazo global de `olbeltran.com`).

También verifica:
- [ ] Correo de contacto (`carobusiness03@gmail.com`) en `index.html`.
- [ ] Número de WhatsApp en `js/whatsapp.js` (`WHATSAPP_NUMBER`).
- [ ] Cifras de la sección de Estadísticas (`data-count-to` en `index.html`).
- [ ] Textos legales del footer (Política de Privacidad, Tratamiento de Datos, NDA) — actualmente son enlaces `#` de marcador de posición.

---

## ✅ Validación realizada

- Sin rutas rotas: todos los `href`/`src` son relativos (`css/…`, `js/…`, `images/…`).
- Sin errores 404: nombres de archivo verificados contra las referencias del HTML.
- HTML5 semántico: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- Todas las imágenes tienen atributo `alt` descriptivo.
- SEO técnico: meta description, keywords, canonical, Open Graph, Twitter Cards, `Schema.org LocalBusiness` (JSON-LD), `robots.txt`, `sitemap.xml`.
- Rendimiento: `preconnect` a Google Fonts, `preload` de imágenes críticas, `loading="lazy"` en imágenes bajo el pliegue, sin librerías externas de JS.
- Accesibilidad: skip-link, `aria-label`/`aria-expanded` en el menú móvil, `aria-hidden` en iconos decorativos, foco visible (`:focus-visible`), cierre de menú con tecla Escape, `prefers-reduced-motion` respetado.
- Probado visualmente en resolución de escritorio, tablet y móvil.
- Compatible con Chrome, Edge y Firefox (JavaScript ES6+ y `IntersectionObserver` son soportados de forma nativa en las versiones actuales de estos navegadores).

---

## 🎨 Sistema de diseño

| Token             | Valor      | Uso                                |
|--------------------|------------|--------------------------------------|
| `--color-navy`     | `#0A2342`  | Fondo primario / headlines           |
| `--color-blue`     | `#1B4F9C`  | Acentos, CTAs, enlaces               |
| `--color-mist`     | `#F4F6F9`  | Fondo alterno de secciones           |
| `--font-display`   | Montserrat | Titulares                            |
| `--font-accent`    | Poppins    | Eyebrows y botones                   |
| `--font-body`      | Inter      | Cuerpo de texto                      |

Todos los tokens están documentados y centralizados en `css/variables.css`.

---

## 📄 Licencia

© 2026 Operaciones Logísticas Beltrán S.A.S. Todos los derechos reservados.
