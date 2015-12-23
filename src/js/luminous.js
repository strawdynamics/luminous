import { isDOMElement } from './util/dom';
import Lightbox from './Lightbox';

export const VERSION = '0.1.0';

export default class Luminous {
  constructor(trigger, options = {}) {
    this.trigger = trigger;

    if (!isDOMElement(this.trigger)) {
      throw new TypeError('`new Luminous` requires a DOM element as its first argument.');
    }

    // A bit unexpected if you haven't seen this pattern before.
    // Based on the pattern here:
    // https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#nested-defaults-destructured-and-restructured
    let {
      namespace = 'lum', // Prefix for generated element class names
      sourceAttribute = 'href', // Which attribute to pull the lightbox source from
      openTrigger = 'click', // The event to listen to on the _trigger_ element that triggers opening
      closeTrigger = 'click', // The event to listen to on the _background_ element that triggers closing
      closeWithEscape = true, // Allow closing by pressing escape
      appendToSelector = 'body', // A selector defining what to append the lightbox element to
      showCloseButton = false, // Whether or not to show a close button.
      onOpen = null, // If present (and a function), this will be called whenver the lightbox is opened
      onClose = null, // If present (and a function), this will be called whenver the lightbox is closed
      includeImgixJSClass = false, // When true, adds the `imgix-fluid` class to the `img` inside the lightbox
    } = options

    this.settings = { namespace, sourceAttribute, openTrigger, closeTrigger, closeWithEscape, appendToSelector, showCloseButton, onOpen, onClose, includeImgixJSClass }

    this.imageURL = this.trigger.getAttribute(this.settings.sourceAttribute);
    if (!this.imageURL) {
      throw new Error(`No image URL was found in the ${this.settings.sourceAttribute} attribute of the trigger.`);
    }

    this._buildLightbox();
    this._bindEvents();
  }

  open = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    this.lightbox.open();

    let onOpen = this.settings.onOpen
    if (onOpen && typeof onOpen === 'function') {
      onOpen();
    }
  }

  close = (e) => {
    console.log('hello there, close!', e);
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    this.lightbox.close();

    let onClose = this.settings.onClose
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  }

  _buildLightbox() {
    this.lightbox = new Lightbox({
      namespace: this.settings.namespace,
      parentEl: document.querySelector(this.settings.appendToSelector),
      imageURL: this.imageURL,
      includeImgixJSClass: this.settings.includeImgixJSClass,
      closeTrigger: this.settings.closeTrigger,
    });
  }

  _bindEvents() {
    this.trigger.addEventListener(this.settings.openTrigger, this.open, false);
    this.lightbox.el.addEventListener(this.settings.closeTrigger, this.close, false);
  }

  _unbindEvents() {
    this.trigger.removeEventListener(this.settings.openTrigger, this.open, false);
    this.lightbox.el.removeEventListener(this.settings.closeTrigger, this.close, false);
  }

  destroy = () => {
    this._unbindEvents();
    this.lightbox.destroy();
  }
}

global.Luminous = Luminous;
