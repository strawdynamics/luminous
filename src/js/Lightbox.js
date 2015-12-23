import { isDOMElement } from './util/dom';
import throwIfMissing from './util/throwIfMissing';

export default class Lightbox {
  constructor(
    namespace = throwIfMissing(),
    parentEl = throwIfMissing(),
    imageURL = throwIfMissing(),
    includeImgixJSClass = false,
  ) {
    this.namespace = namespace;

    if (!isDOMElement(parentEl)) {
      throw new TypeError('`new Lightbox` requires a DOM element passed as `parentEl`.');
    }
    this.parentEl = parentEl;

    this._buildElement(imageURL, includeImgixJSClass);
  }

  _buildElement(imageURL, includeImgixJSClass) {
    let el = document.createElement('div');
    el.classList.add(`${this.namespace}-lightbox`);
    el.innerHTML = `
      <div class="${this.namespace}-lightbox-inner">
        <img alt src="${imageURL}">
      </div>
    `

    if (includeImgixJSClass) {
      el.querySelector('img').classList.add('imgix-fluid')
    }

    this.parentEl.appendChild(el);

    this.el = el;
  }

  open() {
    this.el.classList.add(`${this.namespace}-open`);
  }

  close() {
    this.el.classList.add(`${this.namespace}-close`);
  }

  destroy() {
    this.parentEl.removeChild(this.el);
  }
}
