// This is not really a perfect check, but works fine.
// From http://stackoverflow.com/questions/384286
const HAS_DOM_2 = typeof HTMLElement === "object";
const HAS_SHADOW = typeof ShadowRoot !== "undefined";

/**
 * Determines whether an object is a DOM element or not.
 * @param {!Object} obj Object to check
 * @return {boolean} True if object is an element
 */
export function isDOMElement(obj) {
  if (HAS_SHADOW && obj instanceof ShadowRoot) {
    return true;
  }
  return HAS_DOM_2
    ? obj instanceof HTMLElement
    : obj &&
        typeof obj === "object" &&
        obj !== null &&
        obj.nodeType === 1 &&
        typeof obj.nodeName === "string";
}

/**
 * Adds an array of classes to an element
 * @param {!Element} el Element to add classes to
 * @param {!Array<!string>} classNames Class names to add
 * @return {void}
 */
export function addClasses(el, classNames) {
  classNames.forEach(function(className) {
    el.classList.add(className);
  });
}

/**
 * Removes an array of classes from an element
 * @param {!Element} el Element to remove classes from
 * @param {!Array<!string>} classNames Classes to remove
 * @return {void}
 */
export function removeClasses(el, classNames) {
  classNames.forEach(function(className) {
    el.classList.remove(className);
  });
}
