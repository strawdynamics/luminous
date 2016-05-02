const RULES = `
@keyframes lum-noop {
  0% { zoom: 1; }
}

.lum-lightbox {
  position: fixed;
  display: none;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.lum-lightbox.lum-open {
  display: block;
}

.lum-lightbox.lum-opening, .lum-lightbox.lum-closing {
  animation: lum-noop 1ms;
}

.lum-lightbox-inner {
  position: absolute;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;

  overflow: hidden;
}

.lum-lightbox-loader {
  display: none;
}

.lum-lightbox-inner img {
  max-width: 100%;
  max-height: 100%;
}

.lum-lightbox-image-wrapper {
  vertical-align: middle;
  display: table-cell;
  text-align: center;
}
`

export default function injectBaseStylesheet() {
  if (document.querySelector('.lum-base-styles')) {
    return;
  }

  let styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.classList.add('lum-base-styles');

  styleEl.appendChild(document.createTextNode(RULES));

  let head = document.head;
  head.insertBefore(styleEl, head.firstChild);
}
