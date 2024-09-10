import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('my-element')
export class MyElement extends LitElement {
  @property({ type: String }) title = "Hey there";

  @property({ type: Number }) counter = 5;

  __increment() {
    this.counter += 1;
  }

  render() {
    return html`
      <h2>${this.title} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
    `;
  }

  static styles = css`
  :host {
    display: block;
    padding: 25px;
    color: var(--my-element-text-color, #000);
  }
`;
}