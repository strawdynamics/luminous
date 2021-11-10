<!-- ix-docs-ignore -->
![imgix logo](https://assets.imgix.net/sdk-imgix-logo.svg)

`Luminous` is a simple, lightweight, no-dependencies JavaScript image lightbox.

[![npm version](https://img.shields.io/npm/v/luminous-lightbox.svg)](https://www.npmjs.com/package/luminous-lightbox)
[![Build Status](https://travis-ci.org/imgix/luminous.svg?branch=main)](https://travis-ci.org/imgix/luminous)
[![npm](https://img.shields.io/npm/dm/luminous-lightbox.svg)](https://www.npmjs.com/package/luminous-lightbox)
[![License](https://img.shields.io/github/license/imgix/luminous)](https://github.com/imgix/luminous/blob/main/LICENSE.md)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fimgix%2Fluminous.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fimgix%2Fluminous?ref=badge_shield)

---
<!-- /ix-docs-ignore -->

- [Installation](#installation)
- [Usage](#usage)
    * [LuminousGallery Usage](#luminousgallery-usage)
- [Options / Defaults](#options--defaults)
    * [LuminousGallery Options / Defaults](#luminousgallery-options--defaults)
- [Theming](#theming)
- [Browser Support](#browser-support)
- [Meta](#meta)
- [License](#license)

<a name="installation"></a>

## Installation

- **NPM**: `npm install luminous-lightbox`
- **Bower**: `bower install luminous`
- **Manual**: [Download](https://github.com/imgix/luminous/archive/main.zip) and use `dist/Luminous.min.js` or `dist/Luminous.js`

If you're using the pre-built version of Luminous, it will automatically make `window.Luminous` and `window.LuminousGallery` available for your use when included on your page.

If you prefer to use `require` statements and a build tool like Browserify, there are a couple other things to keep in mind. First, `require('luminous-lightbox')` gives you an object with `Luminous` and `LuminousGallery` keys. You can use it in the following ways:

```javascript
var Luminous = require('luminous-lightbox').Luminous;

new Luminous(…);
```

If your project uses ES6, you can do the following instead:

```javascript
import { Luminous } from 'luminous-lightbox';

new Luminous(…);
```

<a name="usage"></a>

## Usage

Once you've installed Luminous via one of the above methods, you're ready to get started. There are no dependencies, so you can just start making cool stuff. Check out the [announcement blog post](https://blog.imgix.com/2016/01/06/better-lightbox-zoom-viewer-with-imgix?utm_medium=referral&utm_source=github&utm_campaign=luminous), or take a peek at [our demo](https://codepen.io/imgix/pen/wMgOEL). Here's an example of a basic implementation:

```html
<a href="https://assets.imgix.net/dog.png?w=1600">
  <img alt="A dog!" src="https://assets.imgix.net/dog.png?w=400">
</a>
```

```javascript
new Luminous(document.querySelector("a"));
```

<a name="luminousgallery-usage"></a>

### LuminousGallery Usage

Luminous supports gallery-style navigation using the LuminousGallery class. It works nearly the same as Luminous, but has a slightly different method of instantiation.

```html
<ul>
  <li>
    <a class="gallery-demo" href="https://assets.imgix.net/unsplash/coyote.jpg?w=1600">
      <img src="https://assets.imgix.net/unsplash/coyote.jpg?w=100" alt="Coyote">
    </a>
  </li>
  <li>
    <a class="gallery-demo" href="https://assets.imgix.net/unsplash/motorbike.jpg?w=1600">
      <img src="https://assets.imgix.net/unsplash/motorbike.jpg?w=100" alt="Motorbike">
    </a>
  </li>
  <li>
    <a class="gallery-demo" href="https://assets.imgix.net/unsplash/hotairballoon.jpg?w=1600">
      <img src="https://assets.imgix.net/unsplash/hotairballoon.jpg?w=100" alt="Hot air balloon">
    </a>
  </li>
</ul>
```

```javascript
new LuminousGallery(document.querySelectorAll(".gallery-demo"));
```

<a name="options-defaults"></a>

## Options / Defaults

Here's an example of using Luminous with a custom configuration. All of the listed options are displayed with their default value.

```javascript
var options = {
  // Prefix for generated element class names (e.g. `my-ns` will
  // result in classes such as `my-ns-lightbox`. Default `lum-`
  // prefixed classes will always be added as well.
  namespace: null,
  // Which attribute to pull the lightbox image source from.
  sourceAttribute: "href",
  // Captions can be a literal string, or a function that receives the Luminous instance's trigger element as an argument and returns a string. Supports HTML, so use caution when dealing with user input.
  caption: null,
  // The event to listen to on the _trigger_ element: triggers opening.
  openTrigger: "click",
  // The event to listen to on the _lightbox_ element: triggers closing.
  closeTrigger: "click",
  // Allow closing by pressing escape.
  closeWithEscape: true,
  // Automatically close when the page is scrolled.
  closeOnScroll: false,
  // Disable close button
  showCloseButton: false,
  // A node to append the lightbox element to.
  appendToNode: document.body,
  // A selector defining what to append the lightbox element to.
  // This will take precedence over `appendToNode`.
  appendToSelector: null,
  // If present (and a function), this will be called
  // whenever the lightbox is opened.
  onOpen: null,
  // If present (and a function), this will be called
  // whenever the lightbox is closed.
  onClose: null,
  // When true, adds the `imgix-fluid` class to the `img`
  // inside the lightbox. See https://github.com/imgix/imgix.js
  // for more information.
  includeImgixJSClass: false,
  // Add base styles to the page. See the "Theming"
  // section of README.md for more information.
  injectBaseStyles: true
};

new Luminous(document.querySelector("a"), options);
```

<a name="luminousgallery-options-defaults"></a>

### LuminousGallery Options / Defaults

LuminousGallery supports two sets of options arguments. The first set is specific to the gallery itself, and the second specifies the options that get passed to its child Luminous instances.

```javascript
var galleryOpts = {
  // Whether pressing the arrow keys should move to the next/previous slide.
  arrowNavigation: true,
  // A callback triggered when the image changes that is passed the image HTML element 
  onChange: ({ imgEl }) => { … },
};

var luminousOpts = {
  // These options have the same defaults and potential values as the Luminous class.
};

new LuminousGallery(document.querySelectorAll("a"), galleryOpts, luminousOpts);
```

<a name="theming"></a>

## Theming

By default, Luminous injects an extremely basic set of styles into the page via the `injectBaseStyles` option. You will almost certainly want to extend these basic styles for a prettier, more usable experience that matches your site. If you need to do something very out of the ordinary, or just prefer to include the default styles in CSS yourself, you can pass `injectBaseStyles: false` when instantiating a new instance of Luminous. Please note that if you disable the included base styles, you will still need to provide an animation for `.lum-lightbox.lum-opening` and `.lum-lightbox.lum-closing` (this can be a "noop" style animation, as seen in the base styles source).

There is also an included basic theme (`luminous-basic.css`) that may meet your needs, or at least give a good example of how to build out your own custom styles. This can either be included in your site's CSS via `@import "node_modules/luminous-lightbox/dist/luminous-basic.css";` or as a linked stylesheet in your HTML.

Additionally, the `namespace` option can be used as a way to easily apply different themes to specific instances of Luminous.

<a name="browser-support"></a>

## Browser Support

We support the latest version of Google Chrome (which [automatically updates](https://support.google.com/chrome/answer/95414) whenever it detects that a new version of the browser is available). We also support the current and previous major releases of desktop Firefox, Internet Explorer, and Safari on a rolling basis. Mobile support is tested on the most recent minor version of the current and previous major release for the default browser on iOS and Android (e.g., iOS 9.2 and 8.4). Each time a new version is released, we begin supporting that version and stop supporting the third most recent version.

<a name="meta"></a>

## Meta

Luminous was made by [imgix](https://imgix.com?utm_medium=referral&utm_source=github&utm_campaign=luminous). It's licensed under the BSD 2-Clause license (see the [license file](https://github.com/imgix/luminous/blob/main/LICENSE.md) for more info). Any contribution is absolutely welcome, but please review the [contribution guidelines](https://github.com/imgix/luminous/blob/main/CONTRIBUTING.md) before getting started.

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fimgix%2Fluminous.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fimgix%2Fluminous?ref=badge_large)
