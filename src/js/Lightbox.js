import { isDOMElement, addClasses, removeClasses } from './util/dom';
import throwIfMissing from './util/throwIfMissing';

// All officially-supported browsers have this, but it's easy to
// account for, just in case.
const HAS_ANIMATION = 'animation' in document.createElement('div').style;

export default class Lightbox {
  constructor(options = {}) {
    let {
      namespace = null,
      parentEl = throwIfMissing(),
      triggerEl = throwIfMissing(),
      sourceAttribute = throwIfMissing(),
      captionAttribute = throwIfMissing(),
      includeImgixJSClass = false,
    } = options;

    this.settings = { namespace, parentEl, triggerEl, sourceAttribute, captionAttribute, includeImgixJSClass };

    if (!isDOMElement(this.settings.parentEl)) {
      throw new TypeError('`new Lightbox` requires a DOM element passed as `parentEl`.');
    }

    this.openClasses = this._buildClasses('open');
    this.openingClasses = this._buildClasses('opening');
    this.closingClasses = this._buildClasses('closing');

    this.elementBuilt = false;
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

    this.innerEl = document.createElement('div');
    addClasses(this.innerEl, this._buildClasses('lightbox-inner'));
    this.el.appendChild(this.innerEl);

    let loaderEl = document.createElement('div');
    addClasses(loaderEl, this._buildClasses('lightbox-loader'));
    this.innerEl.appendChild(loaderEl);

    this.imgWrapperEl = document.createElement('div');
    addClasses(this.imgWrapperEl, this._buildClasses('lightbox-image-wrapper'));
    this.innerEl.appendChild(this.imgWrapperEl);

    let positionHelperEl = document.createElement('span');
    addClasses(positionHelperEl, this._buildClasses('lightbox-position-helper'));
    this.imgWrapperEl.appendChild(positionHelperEl);

    this.imgEl = document.createElement('img');
    positionHelperEl.appendChild(this.imgEl);

    this.captionEl = document.createElement('p');
    addClasses(this.captionEl, this._buildClasses('lightbox-caption'));
    positionHelperEl.appendChild(this.captionEl);

    this.settings.parentEl.appendChild(this.el);

    this._updateImgSrc();
    this._updateCaption();

    if (this.settings.includeImgixJSClass) {
      this.imgEl.classList.add('imgix-fluid');
    }
  }

  _sizeImgWrapperEl = () => {
    let style = this.imgWrapperEl.style;
    style.width = `${this.innerEl.clientWidth}px`
    style.height = `${this.innerEl.clientHeight - this.captionEl.clientHeight}px`
  };

  _updateCaption() {
    let captionAttr = this.settings.captionAttribute;
    if (captionAttr) {
      this.captionEl.innerText = this.settings.triggerEl.getAttribute(captionAttr);
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
    if (!this.elementBuilt) {
      this._buildElement();
      this.elementBuilt = true;
    }

    // Make sure to re-set the `img` `src`, in case it's been changed
    // by someone/something else.
    this._updateImgSrc();
    this._updateCaption();

    addClasses(this.el, this.openClasses);

    this._sizeImgWrapperEl();
    window.addEventListener('resize', this._sizeImgWrapperEl, false);

    if (HAS_ANIMATION) {
      this.el.addEventListener('animationend', this._completeOpen, false);
      addClasses(this.el, this.openingClasses);
    }
  }

  close() {
    window.removeEventListener('resize', this._sizeImgWrapperEl, false);

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
  };

  _completeClose = () => {
    this.el.removeEventListener('animationend', this._completeClose, false);

    removeClasses(this.el, this.openClasses);
    removeClasses(this.el, this.closingClasses);
  };

  destroy() {
    this.settings.parentEl.removeChild(this.el);
  }
}
