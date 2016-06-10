import { isDOMElement, addClasses, removeClasses } from './util/dom';
import Luminous from './Luminous';

export default class LuminousGallery {
  constructor(triggers, options = {}, luminousOpts = {}) {
    let {
      arrowNavigation = true,
    } = options;

    this.settings = { arrowNavigation };

    this.triggers = triggers;
    this.luminousOpts = luminousOpts;
    this.luminousOpts._gallery = this;
    this.luminousOpts._arrowNavigation = this.settings.arrowNavigation;
    this._constructLuminousInstances();
  }

  _constructLuminousInstances() {
    this.luminousInstances = [];

    let triggerLen = this.triggers.length;
    for (let i = 0; i < triggerLen; i++) {
      let trigger = this.triggers[i];
      let lum = new Luminous(trigger, this.luminousOpts);
      this.luminousInstances.push(lum);
    }
  }

  nextTrigger(trigger) {
    let nextTriggerIndex = Array.prototype.indexOf.call(this.triggers, trigger) + 1;

    return nextTriggerIndex >= this.triggers.length ?
      this.triggers[0] :
      this.triggers[nextTriggerIndex];
  }

  previousTrigger(trigger) {
    let prevTriggerIndex = Array.prototype.indexOf.call(this.triggers, trigger) - 1;

    return prevTriggerIndex < 0 ?
      this.triggers[this.triggers.length - 1] :
      this.triggers[prevTriggerIndex];
  }

  boundMethod = () => {

  };

  destroy() {

  }
}
