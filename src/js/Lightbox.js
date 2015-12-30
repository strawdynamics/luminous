import { isDOMElement, addClasses, removeClasses } from './util/dom';
import throwIfMissing from './util/throwIfMissing';

// All officially-supported browsers have this, but it's easy to
// account for, just in case.
const HAS_ANIMATION = 'animation' in document.body.style;

export default class Lightbox {
  constructor(options = {}) {
    let {
      namespace = null,
      parentEl = throwIfMissing(),
      triggerEl = throwIfMissing(),
      sourceAttribute = throwIfMissing(),
      includeImgixJSClass = false,
      closeTrigger = 'click',
    } = options;

    this.settings = { namespace, parentEl, triggerEl, sourceAttribute, includeImgixJSClass, closeTrigger };

    if (!isDOMElement(this.settings.parentEl)) {
      throw new TypeError('`new Lightbox` requires a DOM element passed as `parentEl`.');
    }

    this.openClasses = this._buildClasses('open');
    this.openingClasses = this._buildClasses('opening');
    this.closingClasses = this._buildClasses('closing');

    this._buildElement();
  }

  _buildClasses(suffix) {
    let classes = [`lum-${suffix}`];

    let ns = this.settings.namespace;
    if (ns) {
      classes.push(`${ns}-${suffix}`);
    }

    return classes;
  }

  _buildElement() {
    this.el = document.createElement('div');
    addClasses(this.el, this._buildClasses('lightbox'));

    let innerEl = document.createElement('div');
    addClasses(innerEl, this._buildClasses('lightbox-inner'));
    this.el.appendChild(innerEl);

    this.imgEl = document.createElement('img');
    innerEl.appendChild(this.imgEl);

    this.settings.parentEl.appendChild(this.el);

    this._updateImgSrc();

    if (this.settings.includeImgixJSClass) {
      this.imgEl.classList.add('imgix-fluid');
    }
  }

  _updateImgSrc() {
    let imageURL = this.settings.triggerEl.getAttribute(this.settings.sourceAttribute);

    if (!imageURL) {
      throw new Error(`No image URL was found in the ${this.settings.sourceAttribute} attribute of the trigger.`);
    }

    this.imgEl.setAttribute('src', imageURL);
  }

  open() {
    // Make sure to re-set the `img` `src`, in case it's been changed
    // by someone/something else.
    this._updateImgSrc();

    addClasses(this.el, this.openClasses);

    if (HAS_ANIMATION) {
      this.el.addEventListener('animationend', this._completeOpen, false);
      addClasses(this.el, this.openingClasses);
    }
  }

  close() {
    if (HAS_ANIMATION) {
      this.el.addEventListener('animationend', this._completeClose, false);
      addClasses(this.el, this.closingClasses);
    } else {
      removeClasses(this.el, this.openClasses);
    }
  }

  _completeOpen = () => {
    this.el.removeEventListener('animationend', this._completeOpen, false);

    removeClasses(this.el, this.openingClasses);
  }

  _completeClose = () => {
    this.el.removeEventListener('animationend', this._completeClose, false);

    removeClasses(this.el, this.openClasses);
    removeClasses(this.el, this.closingClasses);
  }

  destroy() {
    this.settings.parentEl.removeChild(this.el);
  }
}
