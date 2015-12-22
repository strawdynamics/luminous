import { isDOMElement } from './util/dom';
import throwIfMissing from './util/throwIfMissing';

export default class Lightbox {
  constructor(
    namespace = throwIfMissing(),
    minContentWidth = throwIfMissing(),
    parentEl = throwIfMissing(),
    imageURL = throwIfMissing()
  ) {
    this.namespace = namespace;
    this.minContentWidth = minContentWidth;

    if (!isDOMElement(parentEl)) {
      throw new TypeError('`new Lightbox` requires a DOM element passed as `parentEl`.');
    }
    this.parentEl = parentEl;

    this._buildElement(imageURL);
  }

  _buildElement(imageURL) {
    let el = document.createElement('div');
    el.classList.add(`${this.namespace}-lightbox`);
    el.innerHTML = `<img alt src="${imageURL}">`

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
