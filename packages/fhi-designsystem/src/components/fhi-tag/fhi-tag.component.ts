import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiTagSelector = 'fhi-tag';

@customElement(FhiTagSelector)
export class FhiTag extends LitElement {
  @property({ type: String }) variant:
    | 'neutral'
    | 'accent'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info' = 'neutral';

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
  static styles = css`
    :host {
      display: flex;
      padding: 0 var(--fhi-spacing-050);
      justify-content: center;
      align-items: center;
      width: fit-content;
      border-radius: var(--fhi-border-radius-050);
      border-width: var(--fhi-dimension-border-width-focus);
      background: var(--fhi-color-danger-surface-default);

      color: var(--fhi-color-danger-text-default);
      background-color: var(--fhi-color-danger-surface-default);
      text-align: justify;
      font-variant-numeric: lining-nums proportional-nums;

      font-family: var(--fhi-font-family-default);
      font-size: var(--fhi-typography-body-small-font-size);
      font-style: normal;
      font-weight: 400;
      line-height: var(--fhi-typography-body-small-line-height);
      letter-spacing: var(--fhi-typography-body-small-letter-spacing);
    }

    :host[variant='accent'] {
      color: var(--fhi-color-accent-surface-default);
      background-color: var(--fhi-color-accent-text-default);
    }
  `;
}
