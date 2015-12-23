import { isDOMElement } from './util/dom';
import throwIfMissing from './util/throwIfMissing';

// All officially-supported browsers have this, but it's easy to
// account for, just in case.
const HAS_ANIMATION = 'animation' in document.body.style;

export default class Lightbox {
  constructor(options = {}) {
    let {
      namespace = throwIfMissing(),
      parentEl = throwIfMissing(),
      imageURL = throwIfMissing(),
      includeImgixJSClass = false,
      closeTrigger = 'click',
    } = options;

    this.settings = { namespace, parentEl, imageURL, includeImgixJSClass, closeTrigger }

    if (!isDOMElement(this.settings.parentEl)) {
      throw new TypeError('`new Lightbox` requires a DOM element passed as `parentEl`.');
    }

    this.openClass = `${this.settings.namespace}-open`;
    this.openingClass = this.openClass + 'ing';
    this.closingClass = `${this.settings.namespace}-closing`;

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
    this.el.classList.add(this.openClass);

    if (HAS_ANIMATION) {
      this.el.addEventListener('animationend', this._completeOpen, false);
      this.el.classList.add(this.openingClass);
    }
  }

  close() {
    if (HAS_ANIMATION) {
      this.el.addEventListener('animationend', this._completeClose, false);
      this.el.classList.add(this.closingClass);
    } else {
      this.el.classList.remove(this.openClass)
    }
  }

  _completeOpen = () => {
    this.el.removeEventListener('animationend', this._completeOpen, false);

    this.el.classList.remove(this.openingClass);
  }

  _completeClose = () => {
    this.el.removeEventListener('animationend', this._completeClose, false);

    this.el.classList.remove(this.openClass, this.closingClass);
  }

  destroy() {
    this.settings.parentEl.removeChild(this.el);
  }
}
