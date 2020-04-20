// Import the LitElement base class and html helper function
import { LitElement, html } from "lit-element";

// Extend the LitElement base class
class MyElement extends LitElement {
  static get properties() {
    return {
      message: {
        type: String,
      },
    };
  }
  set message(val) {
    this._prop = val;
    this.requestUpdate("message");
  }
  get message() {
    return this._prop;
  }
  constructor() {
    super();
    this.message = "Loading";
  }
  showTime(self) {
    self.message = new Date().toLocaleTimeString();
    console.log(self.message);
  }

  //  connectedCallback(){

  //     super.connectedCallback();
  //     var self = this;
  //     setInterval(()=>{self.message = new Date().toLocaleTimeString();}, 1000);

  //     //this.message = "Added... "

  //  }

  firstUpdated() {
    super.firstUpdated();
    var self = this;
    setInterval(() => {
      self.message = new Date().toLocaleTimeString();
    }, 1000);
  }

  //  disconnectedCallback(){
  //      clearInterval();
  //  }
  /**
   * Implement `render` to define a template for your element.
   *
   * You must provide an implementation of `render` for any element
   * that uses LitElement as a base class.
   */
  render() {
    /**
     * `render` must return a lit-html `TemplateResult`.
     *
     * To create a `TemplateResult`, tag a JavaScript template literal
     * with the `html` helper function:
     */
    return html`
      <!-- template content -->
      <p>${this.message}</p>
    `;
  }
}
// Register the new element with the browser.
customElements.define("my-element", MyElement);
