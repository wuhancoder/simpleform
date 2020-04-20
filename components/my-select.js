import { LitElement, css, html } from "lit-element";
import MyInput from "./my-input";
import MyDropdown from "./my-dropdown";
import MyCheckbox from "./my-checkbox";
import MyRadiobutton from "./my-radiobutton";
import { render } from "lit-html";

// Extend the LitElement base class
export default class MySelect extends LitElement {
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
      value: {
        type: String,
      },
      datasets: {
        type: Array,
      },
    };
  }
  get value() {
    return this.inputEl.value;
  }
  get isValid() {
    return true;
  }
  constructor() {
    super();
    this.datasets = [];
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.inputEl = this.shadowRoot.querySelector(
      "my-dropdown, my-checkbox,my-radio"
    );
  }
  renderSelection() {
    switch (this.type) {
      case "dropdownlist":
        return html`
          <my-dropdown
            name="${this.name}"
            label="${this.label}"
            datasets="${JSON.stringify(this.datasets)}"
          ></my-dropdown>
        `;
      case "checkbox":
        return html`
          <my-checkbox
            name="${this.name}"
            label="${this.label}"
            datasets="${JSON.stringify(this.datasets)}"
          ></my-checkbox>
        `;
      case "radio":
        return html`
          <my-radio
            name="${this.name}"
            label="${this.label}"
            datasets="${JSON.stringify(this.datasets)}"
          ></my-radio>
        `;
    }
  }
  render() {
    return html`
      ${this.renderSelection()}
      <div class="errors"></div>
    `;
  }
}
customElements.define("my-select", MySelect);

//?required=${this.myvalidation &&
//  this.myvalidation.localeCompare("true") == 0}
export { MySelect };
