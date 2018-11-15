import Luminous from "./Luminous";

/**
 * Represents a gallery-style lightbox
 */
export default class LuminousGallery {
  /**
   * Constructor
   * @param {!Array<!Element>} triggers Array of trigger elements
   * @param {Object=} options Gallery options
   * @param {Object=} luminousOpts Luminous options
   */
  constructor(triggers, options = {}, luminousOpts = {}) {
    const optionsDefaults = {
      arrowNavigation: true
    };

    this.settings = Object.assign({}, optionsDefaults, options);

    this.triggers = triggers;
    this.luminousOpts = luminousOpts;
    this.luminousOpts["_gallery"] = this;
    this.luminousOpts["_arrowNavigation"] = this.settings["arrowNavigation"];
    this._constructLuminousInstances();
  }

  /**
   * Creates internal luminous instances
   * @protected
   * @return {void}
   */
  _constructLuminousInstances() {
    this.luminousInstances = [];

    const triggerLen = this.triggers.length;
    for (let i = 0; i < triggerLen; i++) {
      const trigger = this.triggers[i];
      const lum = new Luminous(trigger, this.luminousOpts);
      this.luminousInstances.push(lum);
    }
  }

  /**
   * Determines the next trigger element
   * @param {!Element} trigger Current trigger element
   * @return {!Element}
   */
  nextTrigger(trigger) {
    const nextTriggerIndex =
      Array.prototype.indexOf.call(this.triggers, trigger) + 1;

    return nextTriggerIndex >= this.triggers.length
      ? this.triggers[0]
      : this.triggers[nextTriggerIndex];
  }

  /**
   * Determines the previous trigger element
   * @param {!Element} trigger Current trigger element
   * @return {!Element}
   */
  previousTrigger(trigger) {
    const prevTriggerIndex =
      Array.prototype.indexOf.call(this.triggers, trigger) - 1;

    return prevTriggerIndex < 0
      ? this.triggers[this.triggers.length - 1]
      : this.triggers[prevTriggerIndex];
  }

  /**
   * Destroys the internal luminous instances
   * @return {void}
   */
  destroy() {
    this.luminousInstances.forEach(instance => instance.destroy());
  }
}

/* eslint-disable-next-line no-self-assign */
LuminousGallery.prototype["destroy"] = LuminousGallery.prototype.destroy;
