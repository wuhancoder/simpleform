import { LitElement } from "lit-element";

// Extend the LitElement base class
export default class MyComponent extends LitElement {
  constructor() {
    super();
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
      helptext: {
        type: String,
      },
      validationMessage: {
        type: String,
      },
      condition: {
        type: String,
      },
      value: {
        type: String,
      },
    };
  }
}

export { MyComponent };
