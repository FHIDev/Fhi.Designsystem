import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiCalloutSelector = 'fhi-callout';

import '../typography/fhi-title/fhi-title.component';
import '../typography/fhi-body/fhi-body.component';

@customElement(FhiCalloutSelector)
export class FhiCallout extends LitElement {
  @property({ type: String, reflect: true })
  heading?: string;

  @property({ type: String })
  message = '';

  @property({ type: String, reflect: true })
  color: 'neutral' | 'success' | 'warning' | 'danger' = 'neutral';

  @property({ type: String, reflect: true })
  variant: 'subtle' | 'bordered' = 'subtle';

  update(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('color')) {
      switch (this.color) {
        case 'neutral':
        case 'success':
        case 'warning':
        case 'danger':
          break;
        default:
          this.color = 'neutral';
          break;
      }
    }

    if (changedProperties.has('heading')) {
      if (this.heading === '') {
        this.heading = undefined;
      }
    }

    super.update(changedProperties);
  }

  render() {
    return html`
      <slot name="icon"></slot>
      <div>
        ${this.heading
          ? html`<fhi-title level="2">${this.heading}</fhi-title>`
          : null}
        <slot name="message"></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
    }

    :host {
      display: flex;
      align-items: center;
      padding: var(--fhi-spacing-200);
      gap: var(--fhi-spacing-050);
      border-radius: var(--fhi-border-radius-100);
      border: 1px solid transparent;

      div {
        display: flex;
        flex-direction: column;
      }

      slot[name='icon'] {
        display: flex;
        justify-content: center;
        align-self: stretch;
      }
    }

    :host([heading]) {
      slot[name='icon'] {
        align-items: flex-start;
      }
    }

    :host([color='neutral']) {
      background-color: var(--fhi-color-neutral-surface-default);
      color: var(--fhi-color-neutral-text-default);
      slot[name='icon'] {
        color: var(--fhi-color-neutral-base-default);
      }

      &:host([variant='bordered']) {
        border-color: var(--fhi-color-neutral-surface-active);
      }
    }

    :host([color='success']) {
      background-color: var(--fhi-color-success-surface-default);
      color: var(--fhi-color-success-text-default);
      slot[name='icon'] {
        color: var(--fhi-color-success-base-default);
      }

      &:host([variant='bordered']) {
        border-color: var(--fhi-color-success-surface-active);
      }
    }

    :host([color='warning']) {
      background-color: var(--fhi-color-warning-surface-default);
      color: var(--fhi-color-warning-text-default);
      slot[name='icon'] {
        color: var(--fhi-color-warning-text-subtle);
      }

      &:host([variant='bordered']) {
        border-color: var(--fhi-color-warning-surface-active);
      }
    }

    :host([color='danger']) {
      background-color: var(--fhi-color-danger-surface-default);
      color: var(--fhi-color-danger-text-default);
      slot[name='icon'] {
        color: var(--fhi-color-danger-base-default);
      }

      &:host([variant='bordered']) {
        border-color: var(--fhi-color-danger-surface-active);
      }
    }
  `;
}
