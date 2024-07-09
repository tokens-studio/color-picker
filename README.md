# Colorjs.io Picker

![NPM version badge](https://img.shields.io/npm/v/@tokens-studio/color-picker) ![License badge](https://img.shields.io/github/license/tokens-studio/color-picker)

Colorjs.io color picker as a reusable Web Component.

This is a Web Component port of the [VueJS picker from Colorjs.io](https://github.com/color-js/apps/blob/main/picker) so that it can be used in an encapsulated and reusable manner.

[Click here for the demo](https://ts-color-picker.netlify.app)

## Installation

With [NPM](https://www.npmjs.com/):

```sh
npm install @tokens-studio/color-picker
```

## Usage

```js
// import the Web Component class and define it yourself
import { TSColorPicker } from '@tokens-studio/color-picker';
// or optionally pre-register it and use <ts-color-picker>
import '@tokens-studio/color-picker/define';
```

```html
<ts-color-picker space="hsl"></ts-color-picker>
```

The space attribute can be passed optionally to set the initial color space.

### Reactive props

The following properties can be manually set as well which will cause re-renders:

| name      | type                | default        | description                                                                                  |
| --------- | ------------------- | -------------- | -------------------------------------------------------------------------------------------- |
| spaceId   | `string`            | `'hsl'`        | The id of the color space, same type as "space" attribute for setting the initial ColorSpace |
| coords    | `Array<number>` (3) | `[50, 50 ,50]` | Coordinates/channels e.g. for hsl: hue, saturation, lightness                                |
| alpha     | `number`            | `1`            | Alpha channel value of the color                                                             |
| precision | `number`            | `3`            | Precision for outputting the colors                                                          |

The easiest way to set the color programmatically, if you're not sure about `coords` and you've only got the color as CSS string:

```js
import Color from 'colorjs.io';

const cssString = "rgb(255, 0, 0)";
const colorPickerEl = document.querySelector('ts-color-picker');
const color = new Color(cssString);
const converted = color.to(colorPickerEl.spaceId);
colorPickerEl.coords = converted.coords;
colorPickerEl.alpha = converted.alpha * 100;
```

### Bare import specifiers

This Web Component is published to NPM as an ES Module.
It's usable in any modern JavaScript context out of the box with the exception that it uses bare import specifiers, for example:

```js
import { render } from 'lit';
```

By default, browsers won't know how to resolve the specifier `'lit'`, only absolute and relative paths are allowed.

This means you either need:

- a bundler like [Rollup](https://rollupjs.org/) (needs `@rollup/plugin-node-resolve`)
- a smart dev server like [Vite](https://vitest.dev/)
- inject an import map that tells the browser how to resolve the specifier

The easiest solution if you're not familiar with bundlers and dev servers is to create an import map e.g. using [JSPM](https://jspm.org/).

If you've installed this module from NPM into your local project:

```sh
npx jspm install -p nodemodules @tokens-studio/color-picker
```

Which creates an `importmap.json` file, the contents of which you can put inside an `importmap` script in your HTML:

```html
<script type="importmap">
... import map contents here ...
</script>
```

Alternatively, if you don't want to install from NPM locally and would rather just consume from a CDN:

```sh
npx jspm install @tokens-studio/color-picker
```