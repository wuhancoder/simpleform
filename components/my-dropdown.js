import { LitElement, css, html } from "lit-element";
import { render } from "lit-html";
import MyInput from "./my-input";
import MyComponent from "./my-component";

// Extend the LitElement base class
export default class MyDropdown extends MyComponent {
  static get styles() {
    return css`
      .input-container {
        display: flex;
        flex-direction: var(--sf-input-flex-direction, row);
        width: 100%;
        margin-bottom: 5px;
      }
      label {
        padding: var(--sf-label-padding, 10px);
        background: var(--sf-label-background, dodgerblue);
        dislay: var(--sf-label-display, flex);
        color: var(--sf-label-color, white);
        min-width: 50px;
        text-align: var(--sf-label-text-align, center);
        min-width: 100px;
        font-weight: var(--sf-label-font-weight, 700);
        font-size: var(--sf-label-font-size, 1rem);
      }

      select {
        width: 95%;
        padding: 5px 35px 5px 5px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        -webkit-border-radius: 0;
        background-color: var(--sf-input-background, powderblue);
        border-color: var(--sf-input-border-color, gray);
        border-radius: var(--sf-input-border-radius, 0);
        box-sizing: border-box;
        border-width: var(--sf-input-border-width, 1px);
      }

      /* CAUTION: IE hackery ahead */
      select::-ms-expand {
        display: none; /* remove default arrow on ie10 and ie11 */
      }
    `;
  }

  static get properties() {
    return {
      datasets: {
        type: Array,
        reflect: true,
      },
    };
  }

  constructor() {
    super();
    this.datasets = [];
  }
  set value(newVal) {
    if (newVal === null) {
      this.inputEl.selectedIndex = 0;
    }
  }
  get value() {
    //return true;
    return this.inputEl.options[this.inputEl.selectedIndex].value;
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.inputEl = this.shadowRoot.querySelector("select");
  }

  renderOptions() {
    if (typeof this.datasets === "undefined" || this.datasets == "undefined")
      return html``;
    else
      return html`
        ${this.datasets.map(
          (i) => html`<option value=${i.value}>${i.option}</option>`
        )};
      `;
  }
  render() {
    return html`
      <div class="input-container">
        <label>${this.label}</label>
        <select id="${this.name}">
          ${this.renderOptions()}
        </select>
      </div>
      <div class="errors"></div>
    `;
  }
}
customElements.define("my-dropdown", MyDropdown);

//?required=${this.myvalidation &&
//  this.myvalidation.localeCompare("true") == 0}
export { MyDropdown };
