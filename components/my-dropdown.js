import { LitElement, css, html } from "lit-element";
import { render } from "lit-html";
import MyInput from "./my-input";

// Extend the LitElement base class
export default class MyDropdown extends LitElement {
  static get styles() {
    return css`
      .input-container {
        display: flex;
        width: 100%;
        margin-bottom: 5px;
      }
      label {
        padding: 10px;
        background: dodgerblue;
        color: white;
        min-width: 50px;
        text-align: center;
        min-width: 100px;
      }

      select {
        width: 100%;
        padding: 5px 35px 5px 5px;
        border: 1px solid powderblue;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        -webkit-border-radius: 0;
        border-radius: 0;
        background-color: powderblue;
      }

      /* CAUTION: IE hackery ahead */
      select::-ms-expand {
        display: none; /* remove default arrow on ie10 and ie11 */
      }
    `;
  }

  static get properties() {
    return {
      type: {
        type: String,
      },
      name: {
        type: String,
      },
      label: {
        type: String,
      },
      datasets: {
        type: Array,
        reflect: true,
      },
      value: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.datasets = [];
  }

  get value() {
    return true;
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
