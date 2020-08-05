import { LitElement, css, html } from "lit-element";
import MyInput from "./my-input";
import MyDropdown from "./my-dropdown";
import MyCheckbox from "./my-checkbox";
import MyRadiobutton from "./my-radiobutton";
import { render } from "lit-html";
import MyComponent from "./my-component";

// Extend the LitElement base class
export default class MySelect extends MyComponent {
  static get properties() {
    return {
      datasets: {
        type: Array,
      },
    };
  }
  get value() {
    if (typeof this.inputEL === "undefined") return this.inputEL;
    return this.inputEl.value;
  }

  get isValid() {
    return true;
  }
  constructor() {
    super();
    this.datasets = [];
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", function () {
      console.log("clicked and firing changed event");
      var event = new Event("input", {
        bubbles: true,
        cancelable: true,
      });

      this.dispatchEvent(event);
    });
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
            aria-label="label_${this.name}"
            aria-describedby="desc_${this.name}"
          ></my-dropdown>
        `;
      case "checkbox":
        return html`
          <my-checkbox
            name="${this.name}"
            label="${this.label}"
            datasets="${JSON.stringify(this.datasets)}"
            aria-label="label_${this.name}"
            aria-describedby="desc_${this.name}"
          ></my-checkbox>
        `;
      case "radio":
        return html`
          <my-radio
            name="${this.name}"
            label="${this.label}"
            datasets="${JSON.stringify(this.datasets)}"
            aria-label="label_${this.name}"
            aria-describedby="desc_${this.name}"
          ></my-radio>
        `;
    }
  }
  render() {
    return html`
      ${this.renderSelection()}
      ${typeof this.helptext === "undefined" || this.helptext === "undefined"
        ? html``
        : html`<div id="desc_${this.name}" class="helptext">
            ${this.helptext}
          </div>`}
      <div class="errors"></div>
    `;
  }
}
customElements.define("my-select", MySelect);

//?required=${this.myvalidation &&
//  this.myvalidation.localeCompare("true") == 0}
export { MySelect };
