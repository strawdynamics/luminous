import { isDOMElement } from './util/dom';
import Lightbox from './Lightbox';

export const VERSION = '0.1.0';

export default class Luminous {
  constructor(el, options = {}) {
    this.el = el;

    if (!isDOMElement(this.el)) {
      throw new TypeError('`new Luminous` requires a DOM element as its first argument.');
    }

    // A bit unexpected if you haven't seen this pattern before.
    // Based on the pattern here:
    // https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#nested-defaults-destructured-and-restructured
    let {
      namespace = 'luminous', // Prefix for generated element class names
      sourceAttribute = 'href', // Which attribute to pull the lightbox source from
      openTrigger = 'click', // The event to listen to on the passed element that triggers opening
      closeTrigger = 'click', // The event to listen to on the background element that triggers closing
      closeWithEscape = true, // Allow closing by pressing escape
      appendToSelector = 'body', // A selector defining what to append the lightbox element to
      showCloseButton = false, // Whether or not to show a close button.
      minContentWidth = 460, // When below this width, the content will no longer shrink to fit. Instead, it will scroll inside its container.
      onOpen = null, // If present (and a function), this will be called whenver the lightbox is opened
      onClose = null, // If present (and a function), this will be called whenver the lightbox is closed
    } = options

    this.settings = { namespace, sourceAttribute, openTrigger, closeTrigger, closeWithEscape, appendToSelector, showCloseButton, minContentWidth, onOpen, onClose }

    this.lightbox = new Lightbox(
      this.settings.namespace,
      this.settings.minContentWidth,
      document.querySelector(this.settings.appendToSelector)
    )
  }
}

global.Luminous = Luminous;
