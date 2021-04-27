# Valency

# 🤔 What is Valency?

Valency is a tool to manage and serve design assets. It provides designers assets curration & management capabilty as well serves assets for use over it's CDN.

## 📦 Install

```shell
npm install valency --save
```

## Table of Contents

- [Quick Start](#quick-start)
- [Usage](#usage)
     - [Client-side JavaScript](#client-side-javascript)
     - [SVG Sprite](#svg-sprite)
     - [React](#react)
- [API Reference](#api-reference)
     - [`valency.get()`](#valencygetattrs)
     - [`valency.replace()`](#valencyreplaceattrs)
- [Contributing](#contributing)
- [Related Projects](#related-projects)
- [License](#license)

## 🧪 Quick start

```html
<!DOCTYPE html>
<html lang="en">
      <title></title>
      <script src="https://unpkg.com/valency"></script>
      <body>
            <!-- example icon -->
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

## Usage

The following ways you can use assets served by Valency.

## Client-side JavaScript

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
,
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

## 🧾 License

Valency is licensed under the [MIT License](https://github.com/ValencyHQ/vanilla/blob/master/LICENSE).
