export const VERSION = '0.1.0';

const NOOP = () => { return; };

const DEFAULTS = {
  namespace: 'luminous',
  openEvent: 'click',
  closeEvent: 'click',
  closeWithEscape: true,
  appendToSelector: 'body',
  onOpen: NOOP,
  onClose: NOOP
};

export default class Luminous {
  constructor(options = {}) {
    // A bit unexpected if you haven't seen this pattern before. Details here:
    // https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#nested-defaults-destructured-and-restructured
    let {
      namespace = DEFAULTS.namespace,
      openEvent = DEFAULTS.openEvent,
      closeEvent = DEFAULTS.closeEvent,
      closeWithEscape = DEFAULTS.closeWithEscape,
      onOpen = DEFAULTS.onOpen,
      onClose = DEFAULTS.onClose
    } = options

    this.settings = { namespace, openEvent, closeEvent, closeWithEscape, onOpen, onClose }
  }
}

global.Luminous = Luminous;
