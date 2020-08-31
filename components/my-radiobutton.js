import { LitElement, css, html } from "lit-element";
import { render } from "lit-html";
import MyInput from "./my-input";
import MyComponent from "./my-component";

// Extend the LitElement base class
export default class MyRadiobutton extends MyComponent {
  static get styles() {
    return css`
      fieldset {
        background-color: var(--sf-form-background, powderblue);
        border-color: var(--sf-input-border-color, gray);
        border-radius: var(--sf-input-border-radius, 4px);
        border-width: var(--sf-input-border-width, 1px);
        box-sizing: border-box;
        width: 95%;
      }

      legend label {
        padding: 10px;
        background: var(--sf-label-background, dodgerblue);
        dislay: var(--sf-label-display, flex);
        color: var(--sf-label-color, white);
        min-width: 50px;
        text-align: var(--sf-label-text-align, center);
        min-width: 100px;
        vertical-align: middle;
        font-weight: var(--sf-label-font-weight, 700);
        font-size: var(--sf-label-font-size, 1rem);
      }
      .container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        min-height: 25px;
        line-height: 25px;
      }

      /* Hide the browser's default checkbox */
      .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }
      .container:first-of-type {
        margin-top: 15px;
      }
      /* Create a custom checkbox */
      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: var(--sf-checkbox-size, 25px);
        width: var(--sf-checkbox-size, 25px);
        border-color: var(--sf-input-border-color, gray);
        border-width: var(--sf-input-border-width, 1px);
        border-style: var(--sf-input-border-style, solid);
        background-color: var(--sf-checkbox-background, #eee);
        border-radius: 50%;
      }

      /* On mouse-over, add a grey background color */
      .container:hover input ~ .checkmark {
        background-color: var(--sf-checkbox-hover, #ccc);
      }

      /* When the checkbox is checked, add a blue background */
      .container input:checked ~ .checkmark {
        background-color: var(--sf-checkbox-checked, #2196f3);
      }

      /* Create the checkmark/indicator (hidden when not checked) */
      .checkmark:after {
        content: "";
        position: absolute;
        display: none;
      }

      /* Show the checkmark when checked */
      .container input:checked ~ .checkmark:after {
        display: block;
      }

      /* Style the checkmark/indicator */
      .container .checkmark:after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
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
  set value(newVal) {
    if (newVal === null) {
      this.shadowRoot.querySelectorAll(
        "input[type=radio]:checked"
      )[0].checked = false;
    }
  }
  get value() {
    if (
      typeof this.shadowRoot.querySelectorAll(
        "input[type=radio]:checked"
      )[0] === "undefined"
    )
      return "undefined";
    return this.shadowRoot.querySelectorAll("input[type=radio]:checked")[0]
      .value;
  }
  constructor() {
    super();
    this.datasets = [];
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.inputEl = this.shadowRoot.querySelector("input");
    // [...this.shadowRoot.querySelectorAll("input[type=checkbox]")].map((i) =>
    //   i.addEventListener("click", this.handleChange)
    // );
  }
  renderOptions() {
    if (typeof this.datasets === "undefined" || this.datasets == "undefined")
      return html``;
    else
      return html`
        ${this.datasets.map(
          (i) => html`
            <label class="container"
              >${i.option}
              <input type="radio" name="${this.name}" value="${i.value}" />
              <span class="checkmark"></span>
            </label>
          `
        )}
      `;
  }
  render() {
    return html`
      <div class="input-container">
        <fieldset>
          <legend><label>${this.label}</label></legend>

          ${this.renderOptions()}
        </fieldset>
      </div>
      <div class="errors"></div>
    `;
  }
}
customElements.define("my-radio", MyRadiobutton);

export { MyRadiobutton };
