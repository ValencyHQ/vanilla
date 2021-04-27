# Valency

# 🤔 What is Valency?

Valency is a tool to manage and serve design assets. It provides designers assets curration & management capabilty as well serves assets for use over it's CDN.

## 📦 Install

```shell
npm i --save valency
```

## Table of Contents

- [Quick Start](#quick-start)
- [Usage](#usage)
     - [Client-side JavaScript](#client-side-javascript)
     - [SVG Sprite](#svg-sprite)
     - [React](#react)
     - [Figma](#figma)
- [API Reference](#api-reference)
     - [`valency.get()`](#feathericonsnametosvgattrs)
     - [`valency.replace()`](#featherreplaceattrs)
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

## License

Valency is licensed under the [MIT License](https://github.com/ValencyHQ/vanilla/blob/master/LICENSE).
