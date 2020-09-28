import { LitElement, css, html } from "lit-element";
import { MyInput } from "./my-input.js";
import { MySelect } from "./my-select.js";
import { MyFile } from "./my-file.js";

export default class MyForm extends LitElement {
  static get styles() {
    return css`
      :host {
        font: var(--sf-button-font, 12px Roboto, sans-serif);
        text-align: left;
        background: var(--sf-background, white);
      }

      .formcontainer {
        display: flex;
        flex-wrap: wrap;
      }

      .row {
        margin-top: 10px;
      }

      .show {
        display: block;
      }
      .formtitle {
        font-size: var(--sf-form-title-font-size, 2.5rem);
        display: var(--sf-form-title-display, block);
        flex-basis: 100%;
      }

      .hide {
        display: none;
      }

      .row:after {
        content: "";
        display: table;
        clear: both;
      }

      .btn {
        background-color: var(--sf-button-background, dodgerblue);
        color: var(--sf-button-color, white);
        padding: 15px 20px;
        border: none;
        cursor: pointer;
        margin-top: 10px;
        opacity: 1;
      }

      .btn:hover {
        opacity: 0.9;
      }
    `;
  }
  static get properties() {
    return {
      name: {
        type: String,
        reflect: true,
      },
      id: {
        type: String,
        reflect: true,
      },
      action: {
        type: String,
        reflect: true,
      },
      version: {
        type: String,
      },
      fields: {
        type: String,
        reflect: true,
      },
      config: {
        type: String,
        reflect: true,
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

  set fields(newVal) {
    try {
      this.fieldsArray = JSON.parse(newVal);
    } catch (e) {
      console.log("error occured:" + e);
    }
  }
  constructor() {
    super();
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    console.log("firstupdated ");
    //console.log("calling readConfig ....");
    //this.readConfig().then((r) => {
    //  console.log("config read resolved: " + r);
    //});
    /*
    this.fieldsArray
      .filter(function (e) {
        return e.condition !== undefined && e.condition !== "undefined";
      })
      .map(function (e) {
        this.addCondition(e);
      });
      */
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("connected callbakc");
    this.readConfig();
  }

  updated(changedProperties) {
    let thisform = this;
    super.updated(changedProperties);
    console.log("updated " + changedProperties);
    if (changedProperties.has("fieldsArray")) {
      this.fieldsArray
        .filter(function (e) {
          return e.condition !== undefined && e.condition !== "undefined";
        })
        .map(function (e) {
          thisform.addCondition(e);
        });
      thisform.redraw();
    }
  }

  async readConfig() {
    console.log("retrieving config... ");
    if (typeof this.config === "undefined" || this.config === null) {
      console.log("no config is defined");
      return;
    }
    fetch(this.config)
      .then((res) => res.json())
      .then((data) => {
        this.submit = data.submit;
        this.name = data.name;
        this.id = data.id;
        this.version = data.version;

        if (
          data.version === null ||
          data.version === "" ||
          typeof data.version === "undefined"
        )
          this.action = data.action;
        else this.action = data.action + "/" + data.version;
        this.fields = data;
        this.fieldsArray = data.fields;
        console.log("config read ...... " + data);
        return this.fieldsArray;
      });
  }

  addCondition(e) {
    let thisform = this;
    var hideInput = function (event) {
      thisform.redraw();
      /*
      console.log("event target:" + event.target.tagName);
      if (event.target.dependent !== undefined) {
        event.target.dependent.map(function (e) {
          if (!thisform.evaluateCondition(e.condition)) return;
          let parentRow = e.parentElement;
          if (
            parentRow.classList === null ||
            parentRow.classList === "undefined"
          ) {
            parentRow.className = "hide";
          } else {
            parentRow.classList.remove("show");
            parentRow.classList.add("hide");
          }
        });
      }
      */
    };
    let conditionstrings = e.condition.split("=");
    let conditionArray = conditionstrings[1].split("eq");
    //let el = this.shadowRoot.getElementById(conditionArray[0].trim());
    console.log("controlling " + conditionArray[0].trim() + "$$$$$$");
    let el = this.shadowRoot.querySelector(
      `[name='${conditionArray[0].trim()}']`
    );
    if (el.dependent === undefined) {
      el.dependent = [];
    }
    //el.dependent.push(e);
    el.dependent.push(this.shadowRoot.querySelector(`[name='${e.name}']`));
    console.log(
      " ******** adding event listener to  " +
        " tag" +
        el.tagName +
        " id = " +
        el.outerHTML
    );

    el.addEventListener("input", hideInput);
    if (conditionArray.length < 2) return;
    if (conditionArray[1].indexOf("'") < 0) {
      let el2 = this.shadowRoot.querySelector(
        `[name='${conditionArray[1].trim()}']`
      );
      if (el2.dependent === undefined) {
        el2.dependent = [];
      }
      el2.dependent.push(e);
      el2.addEventListener("input", hideInput);
    }
  }

  resetForm() {
    console.log("reset form");
    let allInputs = [
      ...this.shadowRoot.querySelectorAll("my-input, my-select, my-file"),
    ];
    allInputs.map((x) => {
      x.inputEl.value = null;
    });
    this.redraw();
  }

  redraw() {
    console.log("redraw");
    let allInputs = [
      ...this.shadowRoot.querySelectorAll("my-input, my-select, my-file"),
    ];
    allInputs.map((x) => {
      if (typeof x.condition !== "undefined" && x.condition !== "undefined") {
        let conditionstrings = x.condition.split("=");
        let showhide = conditionstrings[0];
        if (!this.evaluateCondition(conditionstrings[1])) {
          showhide = "showhide".replace(showhide, "");
        }
        let parentRow = x.parentElement;
        if (
          parentRow.classList === "undefined" ||
          parentRow.classList === null
        ) {
          parentRow.className += showhide;
        } else {
          parentRow.classList.remove("hide");
          parentRow.classList.remove("show");
          parentRow.classList.add(showhide);
        }

        // let parentRow = x.parentElement;
        //console.log("redraw" + x.id + " "+ x.classList);
        /*
        if (
          parentRow.classList === "undefined" ||
          parentRow.classList === null
        ) {
          parentRow.className += "show";
        } else {
          parentRow.classList.remove("hide");
          parentRow.classList.add("show");
        }
        */
      }
    });
  }

  evaluateCondition(condition) {
    console.log("condition:" + condition);
    let con = condition.split("eq");
    //console.log(con[1].trim());
    //let el = document.getElementById(con[0].trim());
    let el = this.shadowRoot.querySelector(`[name='${con[0].trim()}']`);
    if (con.length < 2) {
      console.log(
        "one control" + !(typeof el.value === "undefined" || el.value === "")
      );
      return !(typeof el.value === "undefined" || el.value === "");
    } else if (con[1].indexOf("'") > 0) {
      console.log("control + value " + el.value);
      console.log("'" + el.value + "'" === con[1].trim());
      //console.log(con[1].trim());
      if (el.tagName.toLowerCase() === "my-select") {
        if (typeof el.inputEl === "undefined" || el.inputEl === null) {
          return false;
        }
        if (el.inputEl.tagName.toLowerCase() === "my-checkbox") {
          return el.inputEl.value
            .split(",")
            .map((x) => "'" + x.trim() + "'")
            .includes(con[1].trim());
        } else {
          return "'" + el.inputEl.value + "'" === con[1].trim();
        }
      } else return "'" + el.value + "'" === con[1].trim();
    } else {
      //let el2 = document.getElementById(con[1].trim());
      let el2 = this.shadowRoot.querySelector(`[name='${con[1].trim()}']`);
      console.log("control + 2" + el.value === el2.value);
      return el.value === el2.value;
    }
    return true;
  }

  renderInput(i) {
    console.log("trying to render element... ");
    let displaysize = "100%";
    let minimumsize = "auto";
    if (typeof i.displaysize !== "undefined") displaysize = i.displaysize;
    if (typeof i.minimumsize !== "undefined") minimumsize = i.minimumsize;
    if (i.input === "text")
      return html` <div
        class="row"
        style="width:${displaysize};min-width:${minimumsize}"
      >
        <my-input
          name="${i.name}"
          label="${i.label}"
          icon="${i.icon}"
          iconCss="${i.iconCss}"
          type="${i.type}"
          validations="${JSON.stringify(i.validations)}"
          helptext="${i.helptext}"
          validationMessage="${i.validationMessage}"
          condition="${i.condition}"
        ></my-input>
      </div>`;
    if (i.input === "file")
      return html` <div
        class="row"
        style="width:${displaysize};min-width:${minimumsize}"
      >
        <my-file
          name="${i.name}"
          label="${i.label}"
          type="${i.type}"
          helptext="${i.helptext}"
          validationMessage="${i.validationMessage}"
          condition="${i.condition}"
          ?multiple="${i.multiple !== "undefined" && i.multiple === "true"}"
        ></my-file>
      </div>`;
    if (i.input === "select") {
      return html`
        <div class="row" style="width:${displaysize};min-width:${minimumsize}">
          <my-select
            name="${i.name}"
            label="${i.label}"
            type="${i.type}"
            helptext="${i.helptext}"
            validationMessage="${i.validationMessage}"
            condition="${i.condition}"
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
      if (el.tagName === "MY-FILE") {
        for (var x = 0; x < el.files.length; x++) {
          formdata.append(el.name, el.files[x], el.files[x].name);
        }
      } else if (el.tagName === "MY-SELECT")
        formdata.append(el.name, el.inputEl.value);
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
      //.then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        confirm("Form submitted. Thank you!");
        this.resetForm();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    e.preventDefault();
    return false;
  }

  render() {
    console.log("in rendering... ");
    return html`
      <form
        method="POST"
        id="${this.id ? this.id : ""}"
        name="${this.name ? this.name : ""}"
        action="${this.action ? this.action : ""}"
      >
        <div class="formcontainer">
          <h1 class="formtitle">${this.name}</h1>
          ${this.fieldsArray ? this.fieldsArray.map(this.renderInput) : ""}
          <div class="row">
            <button type="submit" @click="${this.submitForm}" class="btn">
              ${this.submit}
            </button>
          </div>
        </div>
      </form>
    `;
  }
}

customElements.define("my-form", MyForm);
