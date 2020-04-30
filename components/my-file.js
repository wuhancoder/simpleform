import { LitElement, css, html } from "lit-element";
import { MyComponent } from "./my-component";

// Extend the LitElement base class
export default class MyFile extends MyComponent {
  static get styles() {
    return css`
      .fileContainer {
        display: flex;
        width: 100%;
        margin-bottom: 5px;
        overflow: hidden;

        background: dodgerblue;
        color: white;
        padding: 10px;
      }

      .fileContainer [type="file"] {
        cursor: inherit;
        display: block;
        font-size: 999px;
        filter: alpha(opacity=0);
        min-height: 100%;
        min-width: 100%;
        opacity: 0;
        position: absolute;
        right: 0;
        text-align: right;
        top: 0;
      }
    `;
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
        <input type="file" id="${this.name}" />
      </label>
    `;
  }
}

customElements.define("my-file", MyFile);

//?required=${this.myvalidation &&
//  this.myvalidation.localeCompare("true") == 0}
export { MyFile };