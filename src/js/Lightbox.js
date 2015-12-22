import { isDOMElement } from './util/dom';
import throwIfMissing from './util/throwIfMissing';

export default class Lightbox {
  constructor(
    namespace = throwIfMissing(),
    minContentWidth = throwIfMissing(),
    appendToEl = throwIfMissing()
  ) {
    this.namespace = namespace;
    this.minContentWidth = minContentWidth;

    if (!isDOMElement(appendToEl)) {
      throw new TypeError('`new Lightbox` requires a DOM element passed as `appendToEl`.');
    }

    this._buildElement(appendToEl);
  }

  _buildElement(appendToEl) {
    let el = document.createElement('div');

    el.classList.add(`${this.namespace}-lightbox`);

    appendToEl.appendChild(el);

    this.el = el;
  }
}
