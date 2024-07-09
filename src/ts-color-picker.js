import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import Color from 'colorjs.io';
import styles from './style.css.js';

/**
 * @typedef {import('colorjs.io').Coords} Coords
 */
export class TSColorPicker extends LitElement {
  static get properties() {
    return {
      initialSpace: {
        reflect: true,
        attribute: 'space',
      },
      spaceId: {
        state: true,
      },
      coords: {
        state: true,
      },
      alpha: {
        state: true,
      },
      precision: {
        state: true,
      },
    };
  }

  _spaceId = 'hsl';

  static get styles() {
    return [styles];
  }

  get space() {
    return Color.Space.get(this.spaceId);
  }

  get spaceId() {
    return this._spaceId;
  }

  set spaceId(newSpaceId) {
    if (newSpaceId !== this.spaceId) {
      const newSpace = Color.Space.get(newSpaceId);
      /** @type {Coords} */
      const coords = Color.Space.get(this.spaceId).to(newSpace, this.coords);
      this.coords = coords;
      this._spaceId = newSpaceId;
    }
  }

  get coordMeta() {
    return Object.entries(this.space.coords).map(([id, meta]) => {
      let { name, range, refRange } = meta;
      name = name || id;
      range = range || refRange || [0, 100];
      let [min, max] = range;
      let step = (max - min) / 100;
      if (step > 1) {
        step = 1;
      }

      let isHue = id === 'h' && meta.type === 'angle';

      return { id, name, isHue, min, max, step };
    });
  }

  get color() {
    return new Color(this.spaceId, this.coords, this.alpha / 100);
  }

  get cssColor() {
    return this.color.display({ precision: this.precision }) + '';
  }

  get colorSrgb() {
    return this.color.to('srgb');
  }

  get serializedColor() {
    return this.color.toString({ precision: this.precision });
  }

  get serializedColorSrgb() {
    return this.colorSrgb.toString({ precision: this.precision });
  }

  get serializedColorSrgbOog() {
    return this.colorSrgb.toString({ precision: this.precision, inGamut: false });
  }

  get sliderSteps() {
    const alpha = this.alpha / 100;
    const ret = [];

    for (let i = 0; i < this.coordMeta.length; i++) {
      const { isHue, min, max } = this.coordMeta[i];

      /** @type {Coords} */
      const start = [...this.coords];
      start[i] = min;
      const color1 = new Color(this.spaceId, start, alpha);

      /** @type {Coords} */
      const end = [...this.coords];
      end[i] = max;
      const color2 = new Color(this.spaceId, end, alpha);

      /** @type {{ space: string; steps: number; hue?: "longer" | "shorter" | "increasing" | "decreasing" | "raw" }} */
      const interpolationOptions = { space: this.spaceId, steps: 10 };

      if (isHue) {
        interpolationOptions.hue = 'raw';
      }

      const steps = Color.steps(color1, color2, interpolationOptions);
      ret.push(steps.map(c => c.display()).join(', '));
    }

    // Push alpha too
    const color1 = new Color(this.spaceId, this.coords, 0);
    const color2 = new Color(this.spaceId, this.coords, 1);
    const steps = Color.steps(color1, color2, { steps: 10 })
      .map(c => c.display())
      .join(', ');
    ret.push(steps);

    return ret;
  }

  constructor() {
    super();
    this.alpha = 100;
    this.precision = 3;
    this.colorSpaces = Color.Space.all;
    /** @type {Coords} */
    this.coords = /** @type {Coords} */ ([50, 50, 50]);
    this.initialSpace = 'hsl';
  }

  connectedCallback() {
    super.connectedCallback();
    this.spaceId = this.initialSpace;
  }

  CSSColorToLCH() {
    const str = prompt('Enter any CSS color');
    if (!str) {
      return;
    }

    try {
      const color = new Color(str);
      const converted = color.to(this.spaceId);
      this.coords = converted.coords;
      this.alpha = converted.alpha * 100;
    } catch (err) {
      alert(err);
      return;
    }
  }

  /** @param {import('lit').PropertyValues} changedProps */
  updated(changedProps) {
    if (changedProps.has('coords')) {
      this.coords.forEach((coord, i) => {
        const meta = this.coordMeta[i];
        this.style.setProperty(`--percentage-${i + 1}`, `${coord / (meta.max - meta.min)}`);
      });
    }

    if (changedProps.has('alpha')) {
      this.style.setProperty('--alpha', `${this.alpha / 100}`);
    }

    if (changedProps.has('alpha') || changedProps.has('coords')) {
      this.style.setProperty('--color', `${this.cssColor}, ${this.cssColor}`);
    }
  }

  render() {
    return html`
      <div class="main">
        <div class="header">
          <h1>
            <select
              class="autosize"
              @change=${
                /** @param {Event} e */ e => {
                  this.spaceId = /** @type {HTMLSelectElement} */ (e.target).value;
                }
              }
            >
              ${Array.from(this.colorSpaces).map(
                space => html`
                  <option ?selected=${space.id === this.spaceId} value="${space.id}">
                    ${space.name}
                  </option>
                `,
              )}
            </select>
            <div>Colour Picker <button @click=${this.CSSColorToLCH}>Import color…</button></div>
          </h1>
        </div>
        ${this.coordMeta.map(
          (meta, i) => html`
            <label class="color-slider-label">
              ${meta.name} (${meta.min}-${meta.max})
              <input
                class="color-slider"
                type="range"
                @input=${this.updateCoords}
                style="--stops: ${this.sliderSteps[i]}"
                min="${meta.min}"
                max="${meta.max}"
                step="${meta.step}"
                .value=${`${this.coords[i]}`}
                .index=${i}
              />
              <input
                class="autosize color-slider-tooltip coord-${i + 1}"
                type="number"
                readonly
                .value="${`${this.coords[i]}`}"
                min="${meta.min}"
                max="${meta.max}"
                step="${meta.step}"
              />
            </label>
          `,
        )}
        <label class="color-slider-label"
          >Alpha (0-100)
          <input
            class="color-slider"
            type="range"
            @input=${this.updateAlpha}
            .value="${`${this.alpha}`}"
            style="--stops: ${this.sliderSteps[this.coordMeta.length]}"
          />
          <input
            class="autosize color-slider-tooltip alpha"
            type="number"
            readonly
            .value="${`${this.alpha}`}"
            max="100"
          />
        </label>
        <fieldset>
          <legend>
            Output
            <span class="precision autosize">
              (<input
                value=${`${this.precision}`}
                @change=${
                  /** @param {Event} e */ e =>
                    (this.precision = parseFloat(/** @type {HTMLInputElement} */ (e.target).value))
                }
                type="number"
                min="0"
                max="20"
              />
              significant digits)
            </span>
          </legend>
          <div class="color-block"></div>
          <label>
            Serialized color
            <input
              @click=${this.selectTextOnClick}
              class="color-css"
              .value="${this.serializedColor}"
              readonly
            />
          </label>

          <label>
            Displayed color
            <input
              @click=${this.selectTextOnClick}
              class="color-css"
              .value="${this.cssColor}"
              readonly
            />
          </label>

          <label
            class=${classMap({ 'out-of-gamut': !this.color.inGamut('srgb', { epsilon: 0.00005 }) })}
          >
            <abbr>sRGB</abbr> Color
            <input
              @click=${this.selectTextOnClick}
              class="color-srgb"
              .value=${this.serializedColorSrgb}
              readonly
            />
            <div class="out-of-gamut-warning">
              Color is actually ${this.serializedColorSrgbOog}, which is out of sRGB gamut;
              auto-corrected to sRGB boundary.
            </div>
          </label>
        </fieldset>
      </div>
    `;
  }

  /** @param {Event} e */
  updateCoords(e) {
    const inputEl = /** @type {HTMLInputElement & { index: number }} */ (e.target);
    this.coords[inputEl.index] = parseFloat(inputEl.value);
    this.requestUpdate('coords');
  }

  /** @param {Event} e */
  updateAlpha(e) {
    const inputEl = /** @type {HTMLInputElement & { index: number }} */ (e.target);
    this.alpha = parseFloat(inputEl.value);
  }

  /** @param {Event} e */
  selectTextOnClick(e) {
    const target = /** @type {HTMLInputElement} */ (e.target);
    if (target.matches('input[readonly]')) {
      target.select();
    }
  }
}
