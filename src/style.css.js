import { css } from 'lit';

export default css`
  :host {
    --ts-color-picker-background: #f0f0f0;
    --ts-color-picker-text-color: rgba(0, 0, 0, 0.5);
    --ts-color-picker-border-color: hsl(220 10% 80%);
    --ts-color-picker-input-background: rgba(26, 26, 26, 0.05);
    --ts-color-picker-button-background: rgba(0, 0, 0, 0.15);
    --ts-color-picker-button-hover-background: rgba(0, 0, 0, 0.25);
    --ts-color-picker-slider-height: 2.2em;
    --ts-color-picker-slider-thumb-width: 1em;
    --ts-color-picker-slider-thumb-height: 2.3em;
    --ts-color-picker-minimal-width: 240px;
    --ts-color-picker-minimal-slider-height: 1em;
    --ts-color-picker-minimal-slider-thumb-width: 0.5em;
    --ts-color-picker-minimal-slider-thumb-height: 1em;
    --color: hsl(50 50 50);
    --transparency: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill-opacity=".05"><rect width="50" height="50" /><rect x="50" y="50" width="50" height="50" /></svg>')
      0 0 / 20px 20px #f8f8f8;
  }

  .coord-1 {
    left: calc(100% * var(--percentage-1));
  }
  .coord-2 {
    left: calc(100% * var(--percentage-2));
  }
  .coord-3 {
    left: calc(100% * var(--percentage-3));
  }
  .alpha {
    left: calc(100% * var(--alpha));
  }

  .color-slider-tooltip::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .header select {
    max-width: calc(100% - 0.2em);
    box-sizing: content-box;
    padding: 0;
    border: 0.1em solid var(--ts-color-picker-border-color);
    border-radius: 0.2em;
    margin-bottom: 0.2em;
    font: inherit;
    color: inherit;
    background: none;
    font-size: 150%;
    text-overflow: ellipsis;
  }

  .header button {
    vertical-align: 0.4em;
  }

  .color-picker {
    padding: 1.5em;
    border-radius: 0.5em;
    width: 40em;
    max-width: 90vw;
    margin: 1em auto;
    background: var(--ts-color-picker-background);
  }

  .color-picker--minimal {
    width: var(--ts-color-picker-minimal-width);
  }

  .color-block {
    height: 50px;
    background: linear-gradient(to right, var(--color)), var(--transparency);
  }

  fieldset {
    border: 1px solid var(--ts-color-picker-border-color);
    border-radius: 0.3em;
    margin: 0;
    margin-top: 1em;
  }

  label,
  legend,
  details summary {
    display: block;
    text-transform: uppercase;
    font-size: smaller;
    margin-top: 1em;
    font-weight: bold;
    color: var(--ts-color-picker-text-color);
  }

  abbr {
    text-transform: initial;
  }

  .color-slider {
    display: block;
    margin: 0 1em auto 0;
    width: 100%;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: linear-gradient(to right, var(--stops)), var(--transparency);
    height: var(--ts-color-picker-slider-height);
    border-radius: 0.3em;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
  }

  .color-picker--minimal .color-slider {
    margin: 0;
    height: var(--ts-color-picker-minimal-slider-height);
  }

  .color-slider::-webkit-slider-thumb {
    width: var(--ts-color-picker-slider-thumb-width);
    height: var(--ts-color-picker-slider-thumb-height);
    -webkit-appearance: none;
    border-radius: 0.15em;
    border: 1px solid black;
    box-shadow: 0 0 0 1px white;
  }

  .color-picker--minimal .color-slider::-webkit-slider-thumb {
    width: var(--ts-color-picker-minimal-slider-thumb-width);
    height: var(--ts-color-picker-minimal-slider-thumb-height);
  }

  .color-slider::-moz-range-thumb {
    width: var(--ts-color-picker-slider-thumb-width);
    height: var(--ts-color-picker-slider-thumb-height);
    border-radius: 0.15em;
    border: 1px solid black;
    box-shadow: 0 0 0 1px white;
    background: transparent;
  }

  .color-slider::-moz-range-track {
    background: none;
  }

  .color-slider-label {
    position: relative;
  }

  .color-picker--minimal .color-slider-label {
    display: flex;
    gap: 1rem;
  }

  .color-slider + input[type='number'] {
    position: absolute;
    top: 0;
    margin-top: -0.75em;
    transform: translateX(-50%);
    padding: 0.2em 0.5em;
    width: 3em;
    border: 0;
    border-radius: 0.3em;
    text-align: center;
    color: white;
    background: rgba(0, 0, 0, 0.8);
    font: inherit;
    font-size: 120%;
    transition: 0.3s left cubic-bezier(0.17, 0.67, 0.49, 1.48);
  }

  .color-slider + input[type='number']:focus {
    transition-delay: 0.5s;
  }

  label:not(:focus-within):not(:hover) > .color-slider + input[type='number'] {
    display: none;
  }

  input.color-css,
  input.color-srgb {
    padding: 0.3em 0.5em 0.2em;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3em;
    box-shadow: 0 0.05em 0.2em rgba(0, 0, 0, 0.2) inset;
    background: var(--ts-color-picker-input-background);
    width: 100% !important;
    box-sizing: border-box;
    font:
      150% Consolas,
      Monaco,
      monospace;
  }

  .out-of-gamut input {
    border-color: rgba(200, 0, 0, 0.5);
  }

  .out-of-gamut-warning {
    margin-top: 0.4em;
    color: #b00;
    font-weight: bold;
    font-size: smaller;
    text-transform: initial;
  }

  .out-of-gamut-warning::before {
    content: '⚠️ ';
    filter: invert() hue-rotate(-200deg);
  }

  label:not(.out-of-gamut) .out-of-gamut-warning {
    display: none;
  }

  h2 {
    display: flex;
    line-height: 1;
  }

  button {
    padding: 0.4em 0.6em;
    border: 0;
    margin: 0 0.5em;
    background: var(--ts-color-picker-button-background);
    border-radius: 0.3em;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
  }

  h2 button:hover {
    background: var(--ts-color-picker-button-hover-background);
  }

  h2 .clear {
    margin-left: auto;
  }

  h2 .clear:hover {
    background: #c00;
    color: white;
  }

  details {
    margin-top: 1em;
  }

  .precision input {
    font: inherit;
    color: inherit;
    background: none;
    border: none;
  }
`;
