(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VERSION = exports.VERSION = '0.1.0';

var NOOP = function NOOP() {
  return;
};

var DEFAULTS = {
  namespace: 'luminous',
  openEvent: 'click',
  closeEvent: 'click',
  closeWithEscape: true,
  appendToSelector: 'body',
  onOpen: NOOP,
  onClose: NOOP
};

var Luminous = function Luminous() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  _classCallCheck(this, Luminous);

  // A bit unexpected if you haven't seen this pattern before. Details here:
  // https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#nested-defaults-destructured-and-restructured
  var _options$namespace = options.namespace;
  var namespace = _options$namespace === undefined ? DEFAULTS.namespace : _options$namespace;
  var _options$openEvent = options.openEvent;
  var openEvent = _options$openEvent === undefined ? DEFAULTS.openEvent : _options$openEvent;
  var _options$closeEvent = options.closeEvent;
  var closeEvent = _options$closeEvent === undefined ? DEFAULTS.closeEvent : _options$closeEvent;
  var _options$closeWithEsc = options.closeWithEscape;
  var closeWithEscape = _options$closeWithEsc === undefined ? DEFAULTS.closeWithEscape : _options$closeWithEsc;
  var _options$onOpen = options.onOpen;
  var onOpen = _options$onOpen === undefined ? DEFAULTS.onOpen : _options$onOpen;
  var _options$onClose = options.onClose;
  var onClose = _options$onClose === undefined ? DEFAULTS.onClose : _options$onClose;

  this.settings = { namespace: namespace, openEvent: openEvent, closeEvent: closeEvent, closeWithEscape: closeWithEscape, onOpen: onOpen, onClose: onClose };
};

exports.default = Luminous;

global.Luminous = Luminous;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
