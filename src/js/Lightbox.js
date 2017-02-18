import { isDOMElement, addClasses, removeClasses } from './util/dom';
import throwIfMissing from './util/throwIfMissing';

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

// All officially-supported browsers have this, but it's easy to
// account for, just in case.
const HAS_ANIMATION = typeof document === 'undefined' ?
  false :
  'animation' in document.createElement('div').style;

export default class Lightbox {
  constructor(options = {}) {
    let {
      namespace = null,
      parentEl = throwIfMissing(),
      triggerEl = throwIfMissing(),
      sourceAttribute = throwIfMissing(),
      caption = null,
      includeImgixJSClass = false,
      _gallery = null,
      _arrowNavigation = null,
    } = options;

    this.settings = { namespace, parentEl, triggerEl, sourceAttribute, caption, includeImgixJSClass, _gallery, _arrowNavigation };

    if (!isDOMElement(this.settings.parentEl)) {
      throw new TypeError('`new Lightbox` requires a DOM element passed as `parentEl`.');
    }

    this.currentTrigger = this.settings.triggerEl;

    this.openClasses = this._buildClasses('open');
    this.openingClasses = this._buildClasses('opening');
    this.closingClasses = this._buildClasses('closing');

    this.hasBeenLoaded = false;
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
    addClasses(this.imgEl, this._buildClasses('img'));
    positionHelperEl.appendChild(this.imgEl);

    this.captionEl = document.createElement('p');
    addClasses(this.captionEl, this._buildClasses('lightbox-caption'));
    positionHelperEl.appendChild(this.captionEl);

    if (this.settings._gallery) {
      this._setUpGalleryElements();
    }

    this.settings.parentEl.appendChild(this.el);

    this._updateImgSrc();
    this._updateCaption();

    if (this.settings.includeImgixJSClass) {
      this.imgEl.classList.add('imgix-fluid');
    }
  }

  _setUpGalleryElements() {
    this._buildGalleryButton('previous', this.showPrevious);
    this._buildGalleryButton('next', this.showNext);
  }

  _buildGalleryButton(name, fn) {
    let btn = document.createElement('button');
    this[`${name}Button`] = btn;

    btn.innerText = name;
    addClasses(btn, this._buildClasses(`${name}-button`));
    addClasses(btn, this._buildClasses('gallery-button'));
    this.innerEl.appendChild(btn);

    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      fn();
    }, false);
  }

  _sizeImgWrapperEl = () => {
    let style = this.imgWrapperEl.style;
    style.width = `${this.innerEl.clientWidth}px`
    style.maxWidth = `${this.innerEl.clientWidth}px`
    style.height = `${this.innerEl.clientHeight - this.captionEl.clientHeight}px`
    style.maxHeight = `${this.innerEl.clientHeight - this.captionEl.clientHeight}px`
  };

  _updateCaption() {
    let captionType = typeof this.settings.caption;
    let caption = '';

    if (captionType === 'string') {
      caption = this.settings.caption;
    } else if (captionType === 'function') {
      caption = this.settings.caption(this.currentTrigger)
    }

    this.captionEl.innerHTML = caption;
  }

  _updateImgSrc() {
    let imageURL = this.currentTrigger.getAttribute(this.settings.sourceAttribute);

    if (!imageURL) {
      throw new Error(`No image URL was found in the ${this.settings.sourceAttribute} attribute of the trigger.`);
    }

    let loadingClasses = this._buildClasses('loading');
    
    if(!this.hasBeenLoaded){
      addClasses(this.el, loadingClasses);
    }
    
    this.imgEl.onload = () => {
      removeClasses(this.el, loadingClasses);
      this.hasBeenLoaded = true;
    }

    this.imgEl.setAttribute('src', imageURL);
  }

  _handleKeydown = (e) => {
    if (e.keyCode == LEFT_ARROW) {
      this.showPrevious();
    } else if (e.keyCode == RIGHT_ARROW) {
      this.showNext();
    }
  };

  showNext = () => {
    if (!this.settings._gallery) {
      return;
    }

    this.currentTrigger = this.settings._gallery.nextTrigger(this.currentTrigger);
    this._updateImgSrc();
    this._updateCaption();
    this._sizeImgWrapperEl();
  };

  showPrevious = () => {
    if (!this.settings._gallery) {
      return;
    }

    this.currentTrigger = this.settings._gallery.previousTrigger(this.currentTrigger);
    this._updateImgSrc();
    this._updateCaption();
    this._sizeImgWrapperEl();
  };

  open() {
    if (!this.elementBuilt) {
      this._buildElement();
      this.elementBuilt = true;
    }

    // When opening, always reset to the trigger we were passed
    this.currentTrigger = this.settings.triggerEl;

    // Make sure to re-set the `img` `src`, in case it's been changed
    // by someone/something else.
    this._updateImgSrc();
    this._updateCaption();

    addClasses(this.el, this.openClasses);

    this._sizeImgWrapperEl();
    window.addEventListener('resize', this._sizeImgWrapperEl, false);

    if (this.settings._arrowNavigation) {
      window.addEventListener('keydown', this._handleKeydown, false);
    }

    if (HAS_ANIMATION) {
      this.el.addEventListener('animationend', this._completeOpen, false);
      addClasses(this.el, this.openingClasses);
    }
  }

  close() {
    window.removeEventListener('resize', this._sizeImgWrapperEl, false);

    if (this.settings._arrowNavigation) {
      window.removeEventListener('keydown', this._handleKeydown, false);
    }

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
    if (this.el) {
      this.settings.parentEl.removeChild(this.el);
    }
  }
}
