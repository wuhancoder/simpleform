import { LitElement, css, html } from "lit-element";
import { MyInput } from "./my-input.js";
import { MySelect } from "./my-select.js";
import { MyFile } from "./my-file.js";

export default class MyForm extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        font: 12px Roboto, sans-serif;
      }
      .row:after {
        content: "";
        display: table;
        clear: both;
      }

      .btn {
        background-color: dodgerblue;
        color: white;
        padding: 15px 20px;
        border: none;
        cursor: pointer;
        width: 100%;
        opacity: 0.9;
      }

      .btn:hover {
        opacity: 1;
      }
    `;
  }
  static get properties() {
    return {
      name: {
        type: String,
        reflect: true,
      },
      action: {
        type: String,
        reflect: true,
      },
      fields: {
        type: String,
      },
      config: {
        type: String,
      },
      fieldsArray: {
        type: Array,
        reflect: true,
        attribute: false,
      },
      submit: {
        type: String,
        reflect: true,
      },
    };
  }
  constructor() {
    super();
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.readConfig();
  }

  async readConfig() {
    fetch(this.config)
      .then((res) => res.json())
      .then((data) => {
        this.submit = data.submit;
        this.name = data.name;
        this.action = data.action;
        this.fields = data;
        this.fieldsArray = data.fields;
        console.log(data);
      });
  }

  renderInput(i) {
    if (i.input === "text")
      return html` <div class="row">
        <my-input
          name="${i.name}"
          label="${i.label}"
          icon="${i.icon}"
          iconCss="${i.iconCss}"
          type="${i.type}"
          validations="${JSON.stringify(i.validations)}"
        ></my-input>
      </div>`;
    if (i.input === "file")
      return html` <div class="row">
        <my-file name="${i.name}" label="${i.label}" type="${i.type}"></my-file>
      </div>`;
    if (i.input === "select") {
      return html`
        <div class="row">
          <my-select
            name="${i.name}"
            label="${i.label}"
            type="${i.type}"
            datasets="${JSON.stringify(i.options)}"
          ></my-select>
        </div>
      `;
    }
  }

  submitForm(e) {
    let allInputs = [
      ...this.shadowRoot.querySelectorAll("my-input, my-select, my-file"),
    ];
    let valid = allInputs.every((i) => {
      if (i.inputEl && typeof inputEL === "undefined") {
        return i.isValid;
      } else return true;
    });
    if (!valid) {
      confirm("Not Valid!");
      e.preventDefault();
      return false;
    }
    //var fieldValues = allInputs.map((el) => {
    //  return { name: el.name, value: el.value };
    //});
    //confirm(JSON.stringify(fieldValues));
    var formdata = new FormData();
    allInputs.forEach((el) => {
      //confirm(el.name + " : " + el.value);
      if (el.tagName === "MY-FILE")
        formdata.append(el.name, el.files[0], el.files[0].name);
      else formdata.append(el.name, el.value);
    });

    fetch(this.action, {
      method: "POST", // or 'PUT'
      //  headers: {
      //   "Content-Type": "application/json",
      //  },
      //body: JSON.stringify(fieldValues),
      body: formdata,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    e.preventDefault();
    return false;
  }

  render() {
    return html`
      <form
        method="POST"
        id="${this.name ? this.name : ""}"
        action="${this.action ? this.action : ""}"
      >
        ${this.fieldsArray ? this.fieldsArray.map(this.renderInput) : ""}
        <button type="submit" @click="${this.submitForm}" class="btn">
          ${this.submit}
        </button>
      </form>
    `;
  }
}

customElements.define("my-form", MyForm);
