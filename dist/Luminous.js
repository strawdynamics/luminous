(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './util/dom', './injectBaseStylesheet', './Lightbox'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./util/dom'), require('./injectBaseStylesheet'), require('./Lightbox'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.dom, global.injectBaseStylesheet, global.Lightbox);
    global.Luminous = mod.exports;
  }
})(this, function (exports, _dom, _injectBaseStylesheet, _Lightbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VERSION = undefined;

  var _injectBaseStylesheet2 = _interopRequireDefault(_injectBaseStylesheet);

  var _Lightbox2 = _interopRequireDefault(_Lightbox);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  var VERSION = exports.VERSION = '0.2.2';

  var Luminous = (function () {
    function Luminous(trigger) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      _classCallCheck(this, Luminous);

      _initialiseProps.call(this);

      this.isOpen = false;
      this.trigger = trigger;

      if (!(0, _dom.isDOMElement)(this.trigger)) {
        throw new TypeError('`new Luminous` requires a DOM element as its first argument.');
      }

      var _options$namespace = options.namespace;
      var namespace = _options$namespace === undefined ? null : _options$namespace;
      var _options$sourceAttrib = options.sourceAttribute;
      var sourceAttribute = _options$sourceAttrib === undefined ? 'href' : _options$sourceAttrib;
      var _options$captionAttri = options.captionAttribute;
      var captionAttribute = _options$captionAttri === undefined ? null : _options$captionAttri;
      var _options$openTrigger = options.openTrigger;
      var openTrigger = _options$openTrigger === undefined ? 'click' : _options$openTrigger;
      var _options$closeTrigger = options.closeTrigger;
      var closeTrigger = _options$closeTrigger === undefined ? 'click' : _options$closeTrigger;
      var _options$closeWithEsc = options.closeWithEscape;
      var closeWithEscape = _options$closeWithEsc === undefined ? true : _options$closeWithEsc;
      var _options$closeOnScrol = options.closeOnScroll;
      var closeOnScroll = _options$closeOnScrol === undefined ? false : _options$closeOnScrol;
      var _options$appendToSele = options.appendToSelector;
      var appendToSelector = _options$appendToSele === undefined ? 'body' : _options$appendToSele;
      var _options$onOpen = options.onOpen;
      var onOpen = _options$onOpen === undefined ? null : _options$onOpen;
      var _options$onClose = options.onClose;
      var onClose = _options$onClose === undefined ? null : _options$onClose;
      var _options$includeImgix = options.includeImgixJSClass;
      var includeImgixJSClass = _options$includeImgix === undefined ? false : _options$includeImgix;
      var _options$injectBaseSt = options.injectBaseStyles;
      var injectBaseStyles = _options$injectBaseSt === undefined ? true : _options$injectBaseSt;
      this.settings = {
        namespace: namespace,
        sourceAttribute: sourceAttribute,
        captionAttribute: captionAttribute,
        openTrigger: openTrigger,
        closeTrigger: closeTrigger,
        closeWithEscape: closeWithEscape,
        closeOnScroll: closeOnScroll,
        appendToSelector: appendToSelector,
        onOpen: onOpen,
        onClose: onClose,
        includeImgixJSClass: includeImgixJSClass,
        injectBaseStyles: injectBaseStyles
      };

      if (this.settings.injectBaseStyles) {
        (0, _injectBaseStylesheet2.default)();
      }

      this._buildLightbox();

      this._bindEvents();
    }

    _createClass(Luminous, [{
      key: '_buildLightbox',
      value: function _buildLightbox() {
        this.lightbox = new _Lightbox2.default({
          namespace: this.settings.namespace,
          parentEl: document.querySelector(this.settings.appendToSelector),
          triggerEl: this.trigger,
          sourceAttribute: this.settings.sourceAttribute,
          captionAttribute: this.settings.captionAttribute,
          includeImgixJSClass: this.settings.includeImgixJSClass
        });
      }
    }, {
      key: '_bindEvents',
      value: function _bindEvents() {
        this.trigger.addEventListener(this.settings.openTrigger, this.open, false);

        if (this.settings.closeWithEscape) {
          window.addEventListener('keyup', this._handleKeyup, false);
        }
      }
    }, {
      key: '_bindCloseEvent',
      value: function _bindCloseEvent() {
        this.lightbox.el.addEventListener(this.settings.closeTrigger, this.close, false);
      }
    }, {
      key: '_unbindEvents',
      value: function _unbindEvents() {
        this.trigger.removeEventListener(this.settings.openTrigger, this.open, false);
        this.lightbox.el.removeEventListener(this.settings.closeTrigger, this.close, false);

        if (this.settings.closeWithEscape) {
          window.removeEventListener('keyup', this._handleKeyup, false);
        }
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

      var previouslyBuilt = _this.lightbox.elementBuilt;

      _this.lightbox.open();

      if (!previouslyBuilt) {
        _this._bindCloseEvent();
      }

      if (_this.settings.closeOnScroll) {
        window.addEventListener('scroll', _this.close, false);
      }

      var onOpen = _this.settings.onOpen;

      if (onOpen && typeof onOpen === 'function') {
        onOpen();
      }

      _this.isOpen = true;
    };

    this.close = function (e) {
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }

      if (_this.settings.closeOnScroll) {
        window.removeEventListener('scroll', _this.close, false);
      }

      _this.lightbox.close();

      var onClose = _this.settings.onClose;

      if (onClose && typeof onClose === 'function') {
        onClose();
      }

      _this.isOpen = false;
    };

    this._handleKeyup = function (e) {
      if (_this.isOpen && e.keyCode === 27) {
        _this.close();
      }
    };

    this.destroy = function () {
      _this._unbindEvents();

      _this.lightbox.destroy();
    };
  };

  exports.default = Luminous;
  global.Luminous = Luminous;
});