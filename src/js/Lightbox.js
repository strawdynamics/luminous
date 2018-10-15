import { isDOMElement, addClasses, removeClasses } from "./util/dom";
import throwIfMissing from "./util/throwIfMissing";

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

// All officially-supported browsers have this, but it's easy to
// account for, just in case.
const HAS_ANIMATION =
  typeof document === "undefined"
    ? false
    : "animation" in document.createElement("div").style;

/**
 * Represents the default lightbox implementation
 */
export default class Lightbox {
  /**
   * Constructor
   * @param {Object=} options Lightbox options
   */
  constructor(options = {}) {
    this._sizeImgWrapperEl = this._sizeImgWrapperEl.bind(this);
    this.showNext = this.showNext.bind(this);
    this.showPrevious = this.showPrevious.bind(this);
    this._completeOpen = this._completeOpen.bind(this);
    this._completeClose = this._completeClose.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleClose = this._handleClose.bind(this);

    const {
      namespace = null,
      parentEl = throwIfMissing(),
      triggerEl = throwIfMissing(),
      sourceAttribute = throwIfMissing(),
      caption = null,
      includeImgixJSClass = false,
      _gallery = null,
      _arrowNavigation = null,
      closeButtonEnabled = true,
      closeTrigger = "click"
    } = options;

    this.settings = {
      namespace,
      parentEl,
      triggerEl,
      sourceAttribute,
      caption,
      includeImgixJSClass,
      _gallery,
      _arrowNavigation,
      closeButtonEnabled,
      onClose: options.onClose,
      closeTrigger
    };

    if (!isDOMElement(this.settings.parentEl)) {
      throw new TypeError(
        "`new Lightbox` requires a DOM element passed as `parentEl`."
      );
    }

    this.currentTrigger = this.settings.triggerEl;

    this.openClasses = this._buildClasses("open");
    this.openingClasses = this._buildClasses("opening");
    this.closingClasses = this._buildClasses("closing");

    this.hasBeenLoaded = false;
    this.elementBuilt = false;
  }

  /**
   * Handles closing of the lightbox
   * @param {!Event} e Event that triggered closing
   * @return {void}
   * @protected
   */
  _handleClose(e) {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    const onClose = this.settings.onClose;
    if (onClose && typeof onClose === "function") {
      onClose();
    }
  }

  /**
   * Binds event listeners to the trigger element
   * @return {void}
   * @protected
   */
  _bindEventListeners() {
    this.el.addEventListener(this.settings.closeTrigger, this._handleClose);
    if (this.closeButtonEl) {
      this.closeButtonEl.addEventListener("click", this._handleClose);
    }
  }

  /**
   * Builds a class list using the namespace and suffix, if any.
   * @param {string} suffix Suffix to add to each class
   * @return {!Array<!string>} Class list
   * @protected
   */
  _buildClasses(suffix) {
    const classes = [`lum-${suffix}`];

    const ns = this.settings.namespace;
    if (ns) {
      classes.push(`${ns}-${suffix}`);
    }

    return classes;
  }

  /**
   * Creates the lightbox element
   * @return {void}
   * @protected
   */
  _buildElement() {
    this.el = document.createElement("div");
    addClasses(this.el, this._buildClasses("lightbox"));

    this.innerEl = document.createElement("div");
    addClasses(this.innerEl, this._buildClasses("lightbox-inner"));
    this.el.appendChild(this.innerEl);

    const loaderEl = document.createElement("div");
    addClasses(loaderEl, this._buildClasses("lightbox-loader"));
    this.innerEl.appendChild(loaderEl);

    this.imgWrapperEl = document.createElement("div");
    addClasses(this.imgWrapperEl, this._buildClasses("lightbox-image-wrapper"));
    this.innerEl.appendChild(this.imgWrapperEl);

    const positionHelperEl = document.createElement("span");
    addClasses(
      positionHelperEl,
      this._buildClasses("lightbox-position-helper")
    );
    this.imgWrapperEl.appendChild(positionHelperEl);

    this.imgEl = document.createElement("img");
    addClasses(this.imgEl, this._buildClasses("img"));
    positionHelperEl.appendChild(this.imgEl);

    this.captionEl = document.createElement("p");
    addClasses(this.captionEl, this._buildClasses("lightbox-caption"));
    positionHelperEl.appendChild(this.captionEl);

    if (this.settings.closeButtonEnabled) {
      this.closeButtonEl = document.createElement("div");
      addClasses(this.closeButtonEl, this._buildClasses("close-button"));
      this.el.appendChild(this.closeButtonEl);
    }

    if (this.settings._gallery) {
      this._setUpGalleryElements();
    }

    this.settings.parentEl.appendChild(this.el);

    this._updateImgSrc();
    this._updateCaption();

    if (this.settings.includeImgixJSClass) {
      this.imgEl.classList.add("imgix-fluid");
    }
  }

  /**
   * Creates gallery elements such as previous/next buttons
   * @return {void}
   * @protected
   */
  _setUpGalleryElements() {
    this._buildGalleryButton("previous", this.showPrevious);
    this._buildGalleryButton("next", this.showNext);
  }

  /**
   * Creates a gallery button
   * @param {string} name Name of button
   * @param {!Function} fn Click handler
   * @return {void}
   * @protected
   */
  _buildGalleryButton(name, fn) {
    const btn = document.createElement("button");
    this[`${name}Button`] = btn;

    btn.innerText = name;
    addClasses(btn, this._buildClasses(`${name}-button`));
    addClasses(btn, this._buildClasses("gallery-button"));
    this.innerEl.appendChild(btn);

    btn.addEventListener(
      "click",
      e => {
        e.stopPropagation();

        fn();
      },
      false
    );
  }

  /**
   * Sizes the image wrapper
   * @return {void}
   * @protected
   */
  _sizeImgWrapperEl() {
    const style = this.imgWrapperEl.style;
    style.width = `${this.innerEl.clientWidth}px`;
    style.maxWidth = `${this.innerEl.clientWidth}px`;
    style.height = `${this.innerEl.clientHeight -
      this.captionEl.clientHeight}px`;
    style.maxHeight = `${this.innerEl.clientHeight -
      this.captionEl.clientHeight}px`;
  }

  /**
   * Updates caption from settings
   * @return {void}
   * @protected
   */
  _updateCaption() {
    const captionType = typeof this.settings.caption;
    let caption = "";

    if (captionType === "string") {
      caption = this.settings.caption;
    } else if (captionType === "function") {
      caption = this.settings.caption(this.currentTrigger);
    }

    this.captionEl.innerHTML = caption;
  }

  /**
   * Updates image element from the trigger element's attributes
   * @return {void}
   * @protected
   */
  _updateImgSrc() {
    const imageURL = this.currentTrigger.getAttribute(
      this.settings.sourceAttribute
    );

    if (!imageURL) {
      throw new Error(
        `No image URL was found in the ${
          this.settings.sourceAttribute
        } attribute of the trigger.`
      );
    }

    const loadingClasses = this._buildClasses("loading");

    if (!this.hasBeenLoaded) {
      addClasses(this.el, loadingClasses);
    }

    this.imgEl.onload = () => {
      removeClasses(this.el, loadingClasses);
      this.hasBeenLoaded = true;
    };

    this.imgEl.setAttribute("src", imageURL);
  }

  /**
   * Handles key up/down events for moving between items
   * @param {!Event} e Keyboard event
   * @return {void}
   * @protected
   */
  _handleKeydown(e) {
    if (e.keyCode == LEFT_ARROW) {
      this.showPrevious();
    } else if (e.keyCode == RIGHT_ARROW) {
      this.showNext();
    }
  }

  /**
   * Shows the next item if in a gallery
   * @return {void}
   */
  showNext() {
    if (!this.settings._gallery) {
      return;
    }

    this.currentTrigger = this.settings._gallery.nextTrigger(
      this.currentTrigger
    );
    this._updateImgSrc();
    this._updateCaption();
    this._sizeImgWrapperEl();
  }

  /**
   * Shows the previous item if in a gallery
   * @return {void}
   */
  showPrevious() {
    if (!this.settings._gallery) {
      return;
    }

    this.currentTrigger = this.settings._gallery.previousTrigger(
      this.currentTrigger
    );
    this._updateImgSrc();
    this._updateCaption();
    this._sizeImgWrapperEl();
  }

  /**
   * Opens the lightbox
   * @return {void}
   */
  open() {
    if (!this.elementBuilt) {
      this._buildElement();
      this._bindEventListeners();
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
    window.addEventListener("resize", this._sizeImgWrapperEl, false);

    if (this.settings._arrowNavigation) {
      window.addEventListener("keydown", this._handleKeydown, false);
    }

    if (HAS_ANIMATION) {
      this.el.addEventListener("animationend", this._completeOpen, false);
      addClasses(this.el, this.openingClasses);
    }
  }

  /**
   * Closes the lightbox
   * @return {void}
   */
  close() {
    window.removeEventListener("resize", this._sizeImgWrapperEl, false);

    if (this.settings._arrowNavigation) {
      window.removeEventListener("keydown", this._handleKeydown, false);
    }

    if (HAS_ANIMATION) {
      this.el.addEventListener("animationend", this._completeClose, false);
      addClasses(this.el, this.closingClasses);
    } else {
      removeClasses(this.el, this.openClasses);
    }
  }

  /**
   * Handles animations on completion of opening the lightbox
   * @return {void}
   * @protected
   */
  _completeOpen() {
    this.el.removeEventListener("animationend", this._completeOpen, false);

    removeClasses(this.el, this.openingClasses);
  }

  /**
   * Handles animations on completion of closing the lightbox
   * @return {void}
   * @protected
   */
  _completeClose() {
    this.el.removeEventListener("animationend", this._completeClose, false);

    removeClasses(this.el, this.openClasses);
    removeClasses(this.el, this.closingClasses);
  }

  /**
   * Destroys the lightbox
   * @return {void}
   */
  destroy() {
    if (this.el) {
      this.settings.parentEl.removeChild(this.el);
    }
  }
}
