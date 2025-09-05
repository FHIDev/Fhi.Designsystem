import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiFlexSelector = 'fhi-flex';
export type FhiFlexDirection = 'row' | 'column';
export type FhiFlexGap = 'small' | 'medium' | 'large' | number;

@customElement(FhiFlexSelector)
export class FhiFlex extends LitElement {
  @property({ type: String, reflect: true }) direction: FhiFlexDirection =
    'row';
  @property({ type: String, reflect: true }) gap: FhiFlexGap = 'medium';

  render() {
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      display: flex;
    }
  `;
}
