import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const MyElementSelector = 'my-element';

export type MyElementProps = Pick<MyElement, 'title' | 'value'>;

@customElement(MyElementSelector)
export class MyElement extends LitElement {
  @property({ type: String }) title = 'Hey there';

  @property({ type: Number }) value = 5;

  __increment() {
    this.value += 1;
    this.dispatchEvent(new Event('change'));
  }

  render() {
    return html`
      <h2>${this.title} Nr. ${this.value}!</h2>
      <button>" @click=${this.__increment}>increment</button>
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
