(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('./util/dom');

var _throwIfMissing = require('./util/throwIfMissing');

var _throwIfMissing2 = _interopRequireDefault(_throwIfMissing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lightbox = (function () {
  function Lightbox() {
    var namespace = arguments.length <= 0 || arguments[0] === undefined ? (0, _throwIfMissing2.default)() : arguments[0];
    var parentEl = arguments.length <= 1 || arguments[1] === undefined ? (0, _throwIfMissing2.default)() : arguments[1];
    var imageURL = arguments.length <= 2 || arguments[2] === undefined ? (0, _throwIfMissing2.default)() : arguments[2];
    var includeImgixJSClass = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    _classCallCheck(this, Lightbox);

    this.namespace = namespace;

    if (!(0, _dom.isDOMElement)(parentEl)) {
      throw new TypeError('`new Lightbox` requires a DOM element passed as `parentEl`.');
    }
    this.parentEl = parentEl;

    this._buildElement(imageURL, includeImgixJSClass);
  }

  _createClass(Lightbox, [{
    key: '_buildElement',
    value: function _buildElement(imageURL, includeImgixJSClass) {
      var el = document.createElement('div');
      el.classList.add(this.namespace + '-lightbox');
      el.innerHTML = '\n      <div class="' + this.namespace + '-lightbox-inner">\n        <img alt src="' + imageURL + '">\n      </div>\n    ';

      if (includeImgixJSClass) {
        el.querySelector('img').classList.add('imgix-fluid');
      }

      this.parentEl.appendChild(el);

      this.el = el;
    }
  }, {
    key: 'open',
    value: function open() {
      this.el.classList.add(this.namespace + '-open');
    }
  }, {
    key: 'close',
    value: function close() {
      this.el.classList.add(this.namespace + '-close');
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.parentEl.removeChild(this.el);
    }
  }]);

  return Lightbox;
})();

exports.default = Lightbox;

},{"./util/dom":3,"./util/throwIfMissing":4}],2:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VERSION = undefined;

var _dom = require('./util/dom');

var _Lightbox = require('./Lightbox');

var _Lightbox2 = _interopRequireDefault(_Lightbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VERSION = exports.VERSION = '0.1.0';

var Luminous = (function () {
  function Luminous(trigger) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Luminous);

    _initialiseProps.call(this);

    this.trigger = trigger;

    if (!(0, _dom.isDOMElement)(this.trigger)) {
      throw new TypeError('`new Luminous` requires a DOM element as its first argument.');
    }

    // A bit unexpected if you haven't seen this pattern before.
    // Based on the pattern here:
    // https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#nested-defaults-destructured-and-restructured
    var _options$namespace = // When true, adds the `imgix-fluid` class to the `img` inside the lightbox
    options.namespace;
    var namespace = _options$namespace === undefined ? 'lum' : _options$namespace;
    var _options$sourceAttrib = options.sourceAttribute;
    var // Prefix for generated element class names
    sourceAttribute = _options$sourceAttrib === undefined ? 'href' : _options$sourceAttrib;
    var _options$openTrigger = options.openTrigger;
    var // Which attribute to pull the lightbox source from
    openTrigger = _options$openTrigger === undefined ? 'click' : _options$openTrigger;
    var _options$closeTrigger = options.closeTrigger;
    var // The event to listen to on the passed element that triggers opening
    closeTrigger = _options$closeTrigger === undefined ? 'click' : _options$closeTrigger;
    var _options$closeWithEsc = options.closeWithEscape;
    var // The event to listen to on the background element that triggers closing
    closeWithEscape = _options$closeWithEsc === undefined ? true : _options$closeWithEsc;
    var _options$appendToSele = options.appendToSelector;
    var // Allow closing by pressing escape
    appendToSelector = _options$appendToSele === undefined ? 'body' : _options$appendToSele;
    var _options$showCloseBut = options.showCloseButton;
    var // A selector defining what to append the lightbox element to
    showCloseButton = _options$showCloseBut === undefined ? false : _options$showCloseBut;
    var _options$onOpen = options.onOpen;
    var // Whether or not to show a close button.
    onOpen = _options$onOpen === undefined ? null : _options$onOpen;
    var _options$onClose = options.onClose;
    var // If present (and a function), this will be called whenver the lightbox is opened
    onClose = _options$onClose === undefined ? null : _options$onClose;
    var _options$includeImgix = options.includeImgixJSClass;
    var // If present (and a function), this will be called whenver the lightbox is closed
    includeImgixJSClass = _options$includeImgix === undefined ? false : _options$includeImgix;

    this.settings = { namespace: namespace, sourceAttribute: sourceAttribute, openTrigger: openTrigger, closeTrigger: closeTrigger, closeWithEscape: closeWithEscape, appendToSelector: appendToSelector, showCloseButton: showCloseButton, onOpen: onOpen, onClose: onClose, includeImgixJSClass: includeImgixJSClass };

    this.imageURL = this.trigger.getAttribute(this.settings.sourceAttribute);
    if (!this.imageURL) {
      throw new Error('No image URL was found in the ' + this.settings.sourceAttribute + ' attribute of the trigger.');
    }

    this._setUpLightbox();
    this._bindEvents();
  }

  _createClass(Luminous, [{
    key: '_setUpLightbox',
    value: function _setUpLightbox() {
      this.lightbox = new _Lightbox2.default(this.settings.namespace, document.querySelector(this.settings.appendToSelector), this.imageURL, this.settings.includeImgixJSClass);
    }
  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
      this.trigger.addEventListener(this.settings.openTrigger, this.open, false);
    }
  }, {
    key: '_unbindEvents',
    value: function _unbindEvents() {
      this.trigger.removeEventListener(this.settings.openTrigger, this.open, false);
    }
  }]);

  return Luminous;
})();

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.open = function (e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    _this.lightbox.open();

    var onOpen = _this.settings.onOpen;
    if (onOpen && typeof onOpen === 'function') {
      onOpen();
    }
  };

  this.close = function (e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    _this.lightbox.close();

    var onClose = _this.settings.onClose;
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  };

  this.destroy = function () {
    _this._unbindEvents();
  };
};

exports.default = Luminous;

global.Luminous = Luminous;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Lightbox":1,"./util/dom":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isDOMElement = isDOMElement;

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// This is not really a perfect check, but works fine.
// From http://stackoverflow.com/questions/384286
var hasDOM2 = (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object';

function isDOMElement(obj) {
	return hasDOM2 ? obj instanceof HTMLElement : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = throwIfMissing;
function throwIfMissing() {
	throw new Error('Missing parameter');
}

},{}]},{},[2]);
