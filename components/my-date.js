import { LitElement, css, html } from "lit-element";
import { MyComponent } from "./my-component";
import { FooPicker } from "../lib/foopicker";
import { fooPickerStyles } from "../lib/foopicker.css";
// Extend the LitElement base class
export default class MyDate extends MyComponent {
  static get styles() {
    return [
      fooPickerStyles,
      css`
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
      `,
    ];
  }

  static get properties() {
    return {
      dateformat: {
        type: String,
        reflect: true,
      },
    };
  }

  constructor() {
    super();
    //this.dateFormat = "dd-Mon-yyyy";
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    var foopicker = new FooPicker({
      id: this.name,
      dateFormat: this.dateformat,
      ctx: this,
      pickerField: this.shadowRoot.getElementById(this.name),
    });
  }

  render() {
    return html`
      <div class="input-container">
        ${typeof this.icon === "undefined" || this.icon === "undefined"
          ? html`<label for="${this.name}" id="label_${this.name}"
              >${this.label}</label
            >`
          : html`<i class="material-icons icon">${this.icon}</i>`}
        <div>
          <input
            type="text"
            id="${this.name}"
            placeholder="${this.label}"
            aria-label="label_${this.name}"
            aria-describedby="desc_${this.name}"
          />
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

customElements.define("my-date", MyDate);

//?required=${this.myvalidation &&
//  this.myvalidation.localeCompare("true") == 0}
export { MyDate };
