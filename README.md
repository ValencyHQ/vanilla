# Valency

# ๐ค What is Valency?

Valency is a tool to manage and serve design assets.

- Design assets managed with Valency are served for use over a CDN.

## ๐ฆ Install

```shell
npm install @valencyhq/valency --save
```

## Table of Contents

- [Quick Start](#quick-start)
- [Usage](#usage)
     - [Client-side JavaScript](#๐-client-side-javascript)
     - [SVG Sprite & Icons](#๐-svg-sprites-&-icons)
     - [React](#โ๏ธ-react)
     - [Figma](#๐-figma)
- [API Reference](#api-reference)
     - [`valency.get()`](#valencygetfn)
     - [`valency.get() shorthand properties`](#valencygetshorthandpropsfn)
     - [`valency.replace()`](#valencyreplacefn)
     - [`valency.loadSprite()`](#valencyloadpspritefn)
     - [`valency.getConfig()`](#valencygetconfigfn)
     - [`valency.setConfig()`](#valencysetconfigfn)
- [Contributing](#contributing)
- [License](#license)

## ๐งช Quick start

```html
<!DOCTYPE html>
<html lang="en">
      <title></title>
      <script src="https://unpkg.com/@valencyhq/valency"></script>
      <body>
            <img data-valency="cat-dog" />

            <script>
                  var valent = new Valency({
                        uid: 'your user ID',
                        project: 'your project ID',
                        library: 'Your library ID',
                  })

                  valent.replace()
            </script>
      </body>
</html>
```

## ๐จโ๐จ Usage

The following ways you can use assets served by Valency.

## ๐ Client-side JavaScript

### 1. Install

> Note: If you intend to use Valency with a CDN, you can skip this installation step.

Install with npm.

```shell
npm install @valencyhq/valency --save
```

Or just copy valency.js or valency.min.js into your project directory. You don't need both valency.js and valency.min.js.

### 2. Include

Include valency.js or valency.min.js with a `<script>` tag:

### 3. Use

To use an icon on your page, add a data-valency attribute with the icon name to an element:

```html
<img data-valency="man-dog" />
<object data-valency="man-dog"></object>
<div data-valency="man-dog">Your background image goes here</div>
```

### 4. Setup & Replace

Setup Valency with your credentials. Call the `valency.replace()` method:

```html
<script>
      var valent = new Valency({
            uid: 'Your user ID',
            project: 'Your project ID',
            library: 'Your library ID',
      })

      valent.replace()
</script>
```

All elements that have a `data-valency` attribute, their `src` or `data` atrribute will be replaced with the assset's URL corresponding to their `data-valency` attribute value.
See the API Reference for more information about [`valency.replace()`](#valencyreplaceattrs).

## ๐ SVG Sprites & Icons

Valency serves icons packed into a single SVG sprite.

> If an icon in a icons library is not a vector `(PNG or JPG)`, it gets converted to `SVG`, then packed into the SVG sprite.
> For Valency to serve SVG Icon sprite for a library, the library's category must be `icon`

### 1. Usage

```html
<svg
      data-valency="icon-name"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
></svg>

<!-- you can also use i tag -->
<i data-valency="icon-name"></i>
```

Use `data-valency-lib` to set a library name if you don't want to use the default.

```html
<svg
      data-valency="icon-name"
      data-valency-lib="icons-library-name"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
></svg>

<i data-valency="icon-name" data-valency-lib="icons-library-name"></i>
```

## โ๏ธ React

There is a wrapper library for React, have a look at [react-valency](https://github.com/ValencyHQ/react).

## ๐ Figma

Valency is available as a Figma plugin. To use the plugin, log in to your Figma and install it. [Get it now!](https://www.figma.com/community/search?model_type=public_plugins&q=Valency)

## โ๏ธ API Reference

## <span id="valencygetfn">`valency.get(assetName, config?)`</span>

Returns a URL to the provided `assetName`.

> If `config` argument is provided, it is used to generate the link instead of the default configuration set at instance of `Valency`.

## <span id="valencygetshorthandpropsfn">`valency.get() shorthand properties`</span>

Valency provides convenient shorthand properties to `Valency.get()` which provides an intuitive way to get an asset's URL.
The shorthand format goes like this:

```js
valent.asset.<assetName>.url
valent.asset.<yourLibraryId>.<someAssetName>.url
valent.asset.<yourProjectId>.<yourLibraryId>.<someAssetName>.url
valent.asset.<yourUserId>.<yourProjectId>.<yourLibraryId>.<someAssetName>.url
```

Let's show some sample `Valency.get()` usage with it's shorthand equivalent.

```js
const valent = new Valency({
      uid: '9825624020',
      project: 'PsSBtkjlQys',
      library: 'LIB_i7J',
})

/** ๐ EXAMPLE 1 **/

valent.get('blondeAvatar')

/**
 * Shorthand ๐ค
 * valent.asset.<assetName>.url
 */

valent.asset.blondeAvatar.url

// returns https://cdn.valency.design/9825624020/PsSBtkjlQys/LIB_i7J/blondeAvatar

/** ๐ EXAMPLE 2 **/

valent.get('03886')

/**
 * Shorthand ๐ค
 * valent.asset.<assetName>.url
 */

valent.asset['03886'].url

// returns https://cdn.valency.design/9825624020/PsSBtkjlQys/LIB_i7J/03886

/** ๐ EXAMPLE 3 **/

valent.get('latinoAvatar', {
      library: 'LIB_3D_avatars',
})

/**
 * Shorthand ๐ค
 * valent.asset.<libraryID>.<assetName>.url
 */

valent.asset.Lib_3D_avatars.latinoAvatar.url

// returns https://cdn.valency.design/9825624020/PsSBtkjlQys/LIB_3D_avatars/latinoAvatar

/** ๐ EXAMPLE 4 **/

valent.get('spaceship', {
      library: 'LIB_i3m',
      project: 'pNASA',
})

/**
 * Shorthand ๐ค
 * valent.asset.<projectID>.<libraryID>.<assetName>.url
 */

valent.asset.pNASA.LIB_i3m.spaceship.url

// returns https://cdn.valency.design/9825624020/pNASA/LIB_i3m/spaceship

/** ๐ EXAMPLE 5 **/

valent.get('Mast Head.png', {
      library: 'LIB_mcq',
      project: 'pMaterial',
      uid: '03786',
})

/**
 * Shorthand ๐ค
 * valent.asset.<userID>.<projectID>.<libraryID>.<assetName>.url
 */

valent.asset['03786'].pMaterial.LIB_mcq['Mast Head.png'].url

// returns https://cdn.valency.design/03786/pMaterial/LIB_mcq/Mast Head.png
```

## <span id="valencyreplacefn">`valency.replace(config?, document?)`</span>

All elements that have a `data-valency` attribute, their `src` atrribute will be replaced with the assset URL corresponding to their `data-valency` attribute value.

> If `config` is provided, it's merged with the base configuration. Note that whatever options contained in the `config` object takes precedence over the base configuration when they're merged together.

> If `document` is provided, it carries out replace on it instead of `window.document`.

## <span id="valencyloadspritefn">`valency.loadSprite(config?)`</span>

Loads the SVG sprite of a library into the `DOM`.

> If `config` is provided, it's merged with the base configuration. Note that whatever options contained in the `config` object takes precedence over the base configuration when they're merged together.

## <span id="valencygetconfigfn">`valency.getConfig(otherConfig?)`</span>

Returns configuration object.

> If `otherConfig` is provided, it's merged with the base configuration. Note that whatever options set in `otherConfig` takes precedence over the base configuration when they're merged together.

## <span id="valencysetconfigfn">`valency.setConfig(otherConfig)`</span>

Use to globally update configuration.

## ๐จโ๐ง Contributing

For more info on how to contribute please see the [contribution guidelines](./CONTRIBUTING.md).

Caught a mistake or want to contribute to the documentation? [Edit this page on Github](./README.md)

## ๐งพ License

Valency is licensed under the [MIT License](https://github.com/ValencyHQ/vanilla/blob/master/LICENSE).
