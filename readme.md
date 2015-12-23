![imgix logo](https://assets.imgix.net/imgix-logo-web-2014.pdf?page=2&fm=png&w=200&h=200)

# Luminous [![Build Status](https://travis-ci.org/imgix/luminous.svg?branch=master)](https://travis-ci.org/imgix/luminous)

A simple, lightweight, no-dependencies JavaScript lightbox.

* [Installation](#installation)
* [Usage](#usage)
* [Options / Defaults](#options-defaults)
* [Browser Support](#browser-support)
* [Meta](#meta)


<a name="installation"></a>
## Installation

* **NPM**: `npm install luminous`
* **Bower**: `bower install luminous`
* **cdnjs**: `https://cdnjs.cloudflare.com/ajax/libs/luminous/0.1.0/dist/luminous.min.js`
* **Manual**: [Download](https://github.com/imgix/luminous/archive/master.zip) and use `dist/luminous.min.js` or `dist/luminous.js`


<a name="usage"></a>
## Usage

Once you've installed Luminous via one of the above methods, you're ready to get started. There are no dependencies, so you can just start making cool stuff. Check out the [announcement blog post](http://blog.imgix.com/TODO) for a demo and full explanation of how to implement Luminous into your site or app.


<a name="options-defaults"></a>
## Options / Defaults

``` javascript
{
	namespace = null, // Prefix for generated element class names (e.g. `my-ns` will result in classes such as `my-ns-lightbox`. Default `lum-` prefixed classes will always be added as well
	sourceAttribute = 'href', // Which attribute to pull the lightbox source from
	openTrigger = 'click', // The event to listen to on the _trigger_ element that triggers opening
	closeTrigger = 'click', // The event to listen to on the _background_ element that triggers closing
	closeWithEscape = true, // Allow closing by pressing escape
	appendToSelector = 'body', // A selector defining what to append the lightbox element to
	showCloseButton = false, // Whether or not to show a close button.
	onOpen = null, // If present (and a function), this will be called whenver the lightbox is opened
	onClose = null, // If present (and a function), this will be called whenver the lightbox is closed
	includeImgixJSClass = false, // When true, adds the `imgix-fluid` class to the `img` inside the lightbox
}
```


<a name="browser-support"></a>
## Browser Support

We support the latest version of Google Chrome (which [automatically updates](https://support.google.com/chrome/answer/95414) whenever it detects that a new version of the browser is available). We also support the current and previous major releases of desktop Firefox, Internet Explorer, and Safari on a rolling basis. Mobile support is tested on the most recent minor version of the current and previous major release for the default browser on iOS and Android (e.g., iOS 9.2 and 8.4). Each time a new version is released, we begin supporting that version and stop supporting the third most recent version.


<a name="meta"></a>
## Meta

Luminous was made by [imgix](http://imgix.com). It's MIT-licensed (see the [license file](https://github.com/imgix/luminous/blob/master/license.md) for more info). Any contribution is absolutely welcome, but please review the [contribution guidelines](https://github.com/imgix/luminous/blob/master/contributing.md) before getting started.
