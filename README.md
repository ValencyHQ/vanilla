# Valency

# 🤔 What is Valency?

Valency is a tool to manage and serve design assets.

- Design assets managed with Valency are served for use over a CDN.

## 📦 Install

```shell
npm install valency --save
```

## Table of Contents

- [Quick Start](#quick-start)
- [Usage](#usage)
     - [Client-side JavaScript](#🌐-client-side-javascript)
     - [SVG Sprite & Icons](#🖋-svg-sprites-&-icons)
     - [React](#⚛️-react)
     - [Figma](#🎏-figma)
- [API Reference](#api-reference)
     - [`valency.get()`](#valencygetfn)
     - [`valency.replace()`](#valencyreplacefn)
     - [`valency.getConfig()`](#valencygetconfigfn)
- [Contributing](#contributing)
- [License](#license)

## 🧪 Quick start

```html
<!DOCTYPE html>
<html lang="en">
      <title></title>
      <script src="https://unpkg.com/valency"></script>
      <body>
            <img data-valency="cat-dog" />

            <script>
                  var valency = new Valency({
                        username: 'your user name',
                        defaultProjectId: 'your project id',
                        defaultLibrary: 'Your library',
                  })

                  valency.replace()
            </script>
      </body>
</html>
```

## 👨‍🎨 Usage

The following ways you can use assets served by Valency.

## 🌐 Client-side JavaScript

### 1. Install

> > Note: If you intend to use Valency with a CDN, you can skip this installation step.

Install with npm.

```shell
npm install valency --save
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
      var valency = new Valency({
            username: 'your user name',
            defaultProjectId: 'your project id',
            defaultLibrary: 'Your library',
      })

      valency.replace()
</script>
```

All elements that have a `data-valency` attribute, their `src` or `data` atrribute will be replaced with the assset's URL corresponding to their `data-valency` attribute value.
See the API Reference for more information about [`valency.replace()`](#valencyreplaceattrs).

## 🖋 SVG Sprites & Icons

Valency serves icons packed into a single SVG sprite.

> > If an icon in a icons library is not a vector `(PNG or JPG)`, it gets converted to `SVG`, then packed into the SVG sprite.
> > For Valency to serve SVG Icon sprite for a library, the library's category must be `icon`

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

## ⚛️ React

There is a wrapper library for React, have a look at [react-valency](https://github.com/ValencyHQ/react/blob/master/LICENSE).

## 🎏 Figma

Valency is available as a Figma plugin. To use the plugin, log in to your Figma and install it. [Get it now!](https://www.figma.com/community/search?model_type=public_plugins&q=Valency)

## ⚙️ API Reference

## <span id="valencygetfn">`valency.get(assetName, config?)`</span>

Returns a URL to the provided `assetName`.

> > If `config` argument is provided, it is used to generate the link instead of the default configuration set at instance of `Valency`.

## <span id="valencyreplacefn">`valency.replace(config?, document?)`</span>

All elements that have a `data-valency` attribute, their `src` atrribute will be replaced with the assset URL corresponding to their `data-valency` attribute value.

> > If `config` argument is provided, it is used to generate the link instead of the default configuration set at instance of `Valency`.

> > If `document` argument is provided, it carries out replace on it instead of `window.document`.

## <span id="valencygetconfigfn">`valency.getConfig(otherConfig?)`</span>

Returns configuration object.

> > If `otherConfig` argument is provided, it's merged with the base configuration. Note that whatever options set in `otherConfig` takes precedence over the base configuration when they're merged together.

## 👨‍🔧 Contributing

For more info on how to contribute please see the [contribution guidelines](./CONTRIBUTING.md).

Caught a mistake or want to contribute to the documentation? [Edit this page on Github](./README.md)

## 🧾 License

Valency is licensed under the [MIT License](https://github.com/ValencyHQ/vanilla/blob/master/LICENSE).
