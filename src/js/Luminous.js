import { isDOMElement } from './util/dom';
import injectBaseStylesheet from './injectBaseStylesheet';
import Lightbox from './Lightbox';

module.exports = class Luminous {
  VERSION = '1.0.1'

  constructor(trigger, options = {}) {
    this.isOpen = false;

    this.trigger = trigger;

    if (!isDOMElement(this.trigger)) {
      throw new TypeError('`new Luminous` requires a DOM element as its first argument.');
    }

    // A bit unexpected if you haven't seen this pattern before.
    // Based on the pattern here:
    // https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#nested-defaults-destructured-and-restructured
    let {
      // Prefix for generated element class names (e.g. `my-ns` will
      // result in classes such as `my-ns-lightbox`. Default `lum-`
      // prefixed classes will always be added as well.
      namespace = null,
      // Which attribute to pull the lightbox image source from.
      sourceAttribute = 'href',
      // Captions can be a literal string, or a function that receives the Luminous instance's trigger element as an argument and returns a string. Supports HTML, so use caution when dealing with user input.
      caption = null,
      // The event to listen to on the _trigger_ element: triggers opening.
      openTrigger = 'click',
      // The event to listen to on the _lightbox_ element: triggers closing.
      closeTrigger = 'click',
      // Allow closing by pressing escape.
      closeWithEscape = true,
      // Automatically close when the page is scrolled.
      closeOnScroll = false,
      // A selector defining what to append the lightbox element to.
      appendToSelector = 'body',
      // If present (and a function), this will be called
      // whenever the lightbox is opened.
      onOpen = null,
      // If present (and a function), this will be called
      // whenever the lightbox is closed.
      onClose = null,
      // When true, adds the `imgix-fluid` class to the `img`
      // inside the lightbox. See https://github.com/imgix/imgix.js
      // for more information.
      includeImgixJSClass = false,
      // Add base styles to the page. See the "Theming"
      // section of README.md for more information.
      injectBaseStyles = true,
      // Internal use only!
      _gallery = null,
      _arrowNavigation = null,
    } = options

    this.settings = { namespace, sourceAttribute, caption, openTrigger, closeTrigger, closeWithEscape, closeOnScroll, appendToSelector, onOpen, onClose, includeImgixJSClass, injectBaseStyles, _gallery, _arrowNavigation };

    if (this.settings.injectBaseStyles) {
      injectBaseStylesheet();
    }

    this._buildLightbox();
    this._bindEvents();
  }

  open = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    let previouslyBuilt = this.lightbox.elementBuilt;

    this.lightbox.open();

    if (!previouslyBuilt) {
      this._bindCloseEvent();
    }

    if (this.settings.closeOnScroll) {
      window.addEventListener('scroll', this.close, false);
    }

    let onOpen = this.settings.onOpen
    if (onOpen && typeof onOpen === 'function') {
      onOpen();
    }

    this.isOpen = true;
  };

  close = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    if (this.settings.closeOnScroll) {
      window.removeEventListener('scroll', this.close, false);
    }

    this.lightbox.close();

    let onClose = this.settings.onClose
    if (onClose && typeof onClose === 'function') {
      onClose();
    }

    this.isOpen = false;
  };

  _buildLightbox() {
    this.lightbox = new Lightbox({
      namespace: this.settings.namespace,
      parentEl: document.querySelector(this.settings.appendToSelector),
      triggerEl: this.trigger,
      sourceAttribute: this.settings.sourceAttribute,
      caption: this.settings.caption,
      includeImgixJSClass: this.settings.includeImgixJSClass,
      _gallery: this.settings._gallery,
      _arrowNavigation: this.settings._arrowNavigation,
    });
  }

  _bindEvents() {
    this.trigger.addEventListener(this.settings.openTrigger, this.open, false);

    if (this.settings.closeWithEscape) {
      window.addEventListener('keyup', this._handleKeyup, false);
    }
  }

  _bindCloseEvent() {
    this.lightbox.el.addEventListener(this.settings.closeTrigger, this.close, false);
  }

  _unbindEvents() {
    this.trigger.removeEventListener(this.settings.openTrigger, this.open, false);
    if (this.lightbox.el) {
      this.lightbox.el.removeEventListener(this.settings.closeTrigger, this.close, false);
    }

    if (this.settings.closeWithEscape) {
      window.removeEventListener('keyup', this._handleKeyup, false);
    }
  }

  _handleKeyup = (e) => {
    if (this.isOpen && e.keyCode === 27) {
      this.close();
    }
  };

  destroy = () => {
    this._unbindEvents();
    this.lightbox.destroy();
  };
}
