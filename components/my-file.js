import { LitElement, css, html } from "lit-element";
import { MyComponent } from "./my-component";

// Extend the LitElement base class
export default class MyFile extends MyComponent {
  static get styles() {
    return css`
      .fileContainer {
        margin-bottom: 5px;
        overflow: hidden;

        background: var(--sf-button-background, dodgerblue);
        color: var(--sf-button-color, white);
        padding: 10px 20px;
        opacity: 1;
      }
      .fileContainer:hover {
        opacity: 0.9;
      }

      .fileContainer [type="file"] {
        cursor: inherit;

        filter: alpha(opacity=0);

        opacity: 0;
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        padding: 0;
      }
    `;
  }

  static get properties() {
    return {
      multiple: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  constructor() {
    super();
  }
  get files() {
    return this.shadowRoot.querySelectorAll("input[type=file]")[0].files;
  }

  render() {
    return html`
      <label class="fileContainer" for="${this.name}">
        ${this.label}
        <input type="file" id="${this.name}" ?multiple="${this.multiple}" />
      </label>
    `;
  }
}

customElements.define("my-file", MyFile);

//?required=${this.myvalidation &&
//  this.myvalidation.localeCompare("true") == 0}
export { MyFile };
