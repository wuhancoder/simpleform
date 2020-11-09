// Import the LitElement base class and html helper function
import { LitElement, css, html } from "lit-element";
import { MyComponent } from "./my-component";

// Extend the LitElement base class
export default class MyInput extends MyComponent {
  static get styles() {
    return css`
      :host {
        font: 12px Roboto, sans-serif;
      }
      .errors {
        color: #cc0033;
        display: block;
        font-size: 12px;
        line-height: 15px;
        margin: 5px 0 0;
        min-height: 15px;
      }
      .helptext {
        display: block;
        font-size: 12px;
        line-height: 15px;
        margin: 5px 0 0;
        min-height: 15px;
      }
      .input-container {
        display: flex;
        flex-direction: var(--sf-input-flex-direction, row);
        width: 100%;
        margin-bottom: 5px;
      }

      .icon {
        padding: 10px;
        background: var(--sf-label-background, dodgerblue);
        color: white;
        min-width: 50px;
        text-align: center;
      }
      label {
        padding: var(--sf-label-padding, 10px);
        background: var(--sf-label-background, dodgerblue);
        color: var(--sf-label-color, white);
        min-width: 50px;
        text-align: var(--sf-label-text-align, center);
        min-width: 100px;
        display: var(--sf-label-display, flex);
        font-size: var(--sf-label-font-size, 1rem);
        font-weight: var(--sf-label-font-weight, 700);
      }

      input {
        width: 95%;
        padding: 10px;
        outline: none;
        border-color: var(--sf-input-border-color, gray);
        border-radius: var(--sf-input-border-radius, 4px);
        border-width: var(--sf-input-border-width, 1px);
        box-sizing: border-box;
        flex-basis: 95%;
      }
      ::placeholder {
        color: var(--sf-input-placeholder, gray);
      }
      input:placeholder-shown,
      input:valid {
        background-color: var(--sf-input-background, powderblue);
      }

      input:not(:placeholder-shown):invalid + span::before {
        content: "✖";
        color: red;
      }
      input:not(:placeholder-shown):valid + span::before {
        content: "✓";
        color: green;
      }
      input:focus {
        border-color: var(--sf-input-border-color-focus, rgb(59, 59, 59));
        background-color: var(--sf-input-background-focus, gray);
        color: var(--sf-input-color-focus, white);
      }
      input:focus::-webkit-input-placeholder {
        color: var(--sf-input-background-focus, gray);
      }
    `;
  }

  constructor() {
    super();
  }

  applyValidationRule(rule) {
    console.log(JSON.stringify(rule));
    //this.inputEl = this.shadowRoot.querySelector("input");
    switch (rule.type) {
      case "pattern":
        this.inputEl.setAttribute("pattern", this.expression);
        break;
      case "required":
        console.log("settting required flag for " + this.inputEl);
        this.inputEl.required = true;
        break;
    }
  }

  get isValid() {
    return this.inputEl.checkValidity();
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.inputEl = this.shadowRoot.querySelector("input, textarea");

    this.addEventListener("blur", this.validate);
    this.addEventListener("keyup", this.validate);
    this.addEventListener("focus", this.resetErrors);
    if (
      typeof this.validations !== "undefined" &&
      this.validations !== "undefined"
    ) {
      JSON.parse(this.validations).map((rule) => {
        console.log(JSON.stringify(rule));
        //this.inputEl = this.shadowRoot.querySelector("input");
        switch (rule.type) {
          case "pattern":
            this.inputEl.setAttribute("pattern", rule.expression);
            break;
          case "required":
            console.log("settting required flag for " + this.inputEl);
            this.inputEl.required = true;
            break;
        }
      });
    }
    if (this.pattern) {
      this.inputEl.setAttribute("pattern", this.pattern);
    }
    if (this.myvalidation) {
      this.inputEl.required =
        this.myvalidation && this.myvalidation.localeCompare("true") == 0;
    }
  }
  validate() {
    //this.inputEl = this.shadowRoot.querySelector("input");
    //if (this.inputEl.value == "") this.inputEl.value = null;
    this.value = this.inputEl.value;
    var event = new Event("input", {
      bubbles: true,
      cancelable: true,
    });

    this.dispatchEvent(event);
    //if (!this.inputEl) return;
    console.log(this.inputEl + " this.....   " + this.value);

    if (!this.inputEl.checkValidity()) {
      console.log(this.inputEl.validationMessage);
      //let validationMessage = this.inputEl.validationMessage;
      if (
        typeof this.validationMessage !== "undefined" &&
        this.validationMessage !== "undefined"
      )
        this.inputEl.setCustomValidity(this.validationMessage);

      this.shadowRoot.querySelector(
        ".errors"
      ).textContent = this.inputEl.validationMessage;
      this.inputEl.setCustomValidity("");
    } else {
      this.inputEl.setCustomValidity("");
      this.resetErrors();
    }
  }
  resetErrors() {
    this.shadowRoot.querySelector(".errors").textContent = "";
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <div class="input-container">
        ${typeof this.icon === "undefined" || this.icon === "undefined"
          ? html`<label for="${this.name}" id="label_${this.name}"
              >${this.label}</label
            >`
          : html`<i class="material-icons icon">${this.icon}</i>`}
        <div>
          ${this.type === "textarea"
            ? html`
                <textarea
                  name="${this.name}"
                  cols="${this.cols}"
                  rows="${this.rows}"
                  aria-label="label_${this.name}"
                  aria-describedby="desc_${this.name}"
                >
                </textarea>
              `
            : html` <input
                type="${this.type}"
                id="${this.name}"
                placeholder="${this.label}"
                aria-label="label_${this.name}"
                aria-describedby="desc_${this.name}"
              />`}
          <span></span>
        </div>
      </div>
      ${typeof this.helptext === "undefined" || this.helptext === "undefined"
        ? html``
        : html`<div id="desc_${this.name}" class="helptext">
            ${this.helptext}
          </div>`}
      <div class="errors"></div>
    `;
  }
}
// Register the new element with the browser.
customElements.define("my-input", MyInput);

//?required=${this.myvalidation &&
//  this.myvalidation.localeCompare("true") == 0}
export { MyInput };
