// Import the LitElement base class and html helper function
import { LitElement, css, html } from "lit-element";

// Extend the LitElement base class
export default class MyInput extends LitElement {
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
      .input-container {
        display: flex;
        width: 100%;
        margin-bottom: 5px;
      }

      .icon {
        padding: 10px;
        background: dodgerblue;
        color: white;
        min-width: 50px;
        text-align: center;
      }
      label {
        padding: 10px;
        background: dodgerblue;
        color: white;
        min-width: 50px;
        text-align: center;
        min-width: 100px;
      }

      input {
        width: 95%;
        padding: 10px;
        outline: none;
      }

      input:placeholder-shown,
      input:valid {
        background-color: powderblue;
      }

      input:not(:placeholder-shown):invalid + span::before {
        content: "✖";
        color: red;
      }
      input:not(:placeholder-shown):valid + span::before {
        content: "✓";
        color: green;
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
      myvalidation: {
        type: String,
      },
      pattern: {
        type: String,
      },
      validations: {
        type: String,
      },
      icon: {
        type: String,
      },
      value: {
        type: String,
      },
    };
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
    this.inputEl = this.shadowRoot.querySelector("input");

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
    this.value = this.inputEl.value;
    //if (!this.inputEl) return;
    console.log(this.inputEl + " this.....   " + this.value);

    if (!this.inputEl.checkValidity()) {
      console.log(this.inputEl.validationMessage);
      this.shadowRoot.querySelector(
        ".errors"
      ).textContent = this.inputEl.validationMessage;
    } else {
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
          ? html`<label for="${this.name}">${this.label}</label>`
          : html`<i class="material-icons icon">${this.icon}</i>`}
        <input
          type="${this.type}"
          id="${this.name}"
          placeholder="${this.label}"
        />
        <span></span>
      </div>
      <div class="errors"></div>
    `;
  }
}
// Register the new element with the browser.
customElements.define("my-input", MyInput);

//?required=${this.myvalidation &&
//  this.myvalidation.localeCompare("true") == 0}
export { MyInput };
