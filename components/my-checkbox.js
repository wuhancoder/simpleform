import { LitElement, css, html } from "lit-element";
import { render } from "lit-html";
import MyInput from "./my-input";
import MyComponent from "./my-component";

// Extend the LitElement base class
export default class MyCheckbox extends MyComponent {
  static get styles() {
    return css`
      fieldset {
        background-color: powderblue;
      }

      legend label {
        padding: 10px;
        background: dodgerblue;
        color: white;
        min-width: 50px;
        text-align: center;
        min-width: 100px;
        vertical-align: middle;
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
        height: 25px;
        width: 25px;
        background-color: #eee;
      }

      /* On mouse-over, add a grey background color */
      .container:hover input ~ .checkmark {
        background-color: #ccc;
      }

      /* When the checkbox is checked, add a blue background */
      .container input:checked ~ .checkmark {
        background-color: #2196f3;
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
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
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

  get value() {
    return [...this.shadowRoot.querySelectorAll("input[type=checkbox]:checked")]
      .map((i) => {
        return i.value;
      })
      .join(", ");
  }
  constructor() {
    super();
    this.datasets = [];
  }
  handleChange() {
    // this.value = [
    //   ...this.shadowRoot.querySelectorAll("input[type=checkbox]:checked"),
    // ]
    //   .map((i) => {
    //     return i.value;
    //   })
    //   .join(", ");

    let checked = [
      ...this.parentElement.parentElement.querySelectorAll(
        "input[type=checkbox]:checked"
      ),
    ]
      .map((i) => {
        return i.value;
      })
      .join(", ");
    this.selectedValue = checked;
    console.log("check box:" + this.selectedValue);
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
              <input type="checkbox" name="${this.name}" value="${i.value}" />
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
customElements.define("my-checkbox", MyCheckbox);

//?required=${this.myvalidation &&
//  this.myvalidation.localeCompare("true") == 0}
export { MyCheckbox };
