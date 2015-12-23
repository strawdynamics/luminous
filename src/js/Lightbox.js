import { isDOMElement } from './util/dom';
import throwIfMissing from './util/throwIfMissing';

export default class Lightbox {
  constructor(options = {}) {
    let {
      namespace = throwIfMissing(),
      parentEl = throwIfMissing(),
      imageURL = throwIfMissing(),
      includeImgixJSClass = false
    } = options;

    this.settings = { namespace, parentEl, imageURL, includeImgixJSClass }

    if (!isDOMElement(this.settings.parentEl)) {
      throw new TypeError('`new Lightbox` requires a DOM element passed as `parentEl`.');
    }

    this._buildElement();
  }

  _buildElement() {
    let el = document.createElement('div');
    el.classList.add(`${this.settings.namespace}-lightbox`);
    el.innerHTML = `
      <div class="${this.settings.namespace}-lightbox-inner">
        <img alt src="${this.settings.imageURL}">
      </div>
    `

    if (this.settings.includeImgixJSClass) {
      el.querySelector('img').classList.add('imgix-fluid')
    }

    this.settings.parentEl.appendChild(el);

    this.el = el;
  }

  open() {
    this.el.classList.add(`${this.settings.namespace}-open`);
  }

  close() {
    this.el.classList.add(`${this.settings.namespace}-close`);
  }

  destroy() {
    this.settings.parentEl.removeChild(this.el);
  }
}
