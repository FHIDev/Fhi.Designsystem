import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiCalloutSelector = 'fhi-callout';

import '../typography/fhi-title/fhi-title.component';
import '../typography/fhi-body/fhi-body.component';

/**
 * ## FHI Callout
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-callout--docs}
 *
 * The `<fhi-callout>` component represents a callout message.
 * It should be used to highlight important information or warnings.
 *
 * @tag fhi-callout
 * @element fhi-callout
 *
 * @slot icon - Optional icon to be displayed in the callout.
 * @slot - The main content of the callout. This is typically plain text or other inline elements.
 *
 */
@customElement(FhiCalloutSelector)
export class FhiCallout extends LitElement {
  /**
   * The heading of the callout. This is optional and can be used to provide a title for the callout message.
   *
   * @reflect
   * @type {string}
   */
  @property({ type: String, reflect: true })
  heading?: string;

  /**
   * The color of the callout, which indicates the type of message being conveyed.
   *
   * @reflect
   * @type {string}
   */
  @property({ type: String, reflect: true })
  color: 'neutral' | 'success' | 'warning' | 'danger' = 'neutral';

  /**
   * The variant of the callout, which determines the visual style of the callout.
   *
   * @reflect
   * @type {string}
   */
  @property({ type: String, reflect: true })
  variant: 'subtle' | 'bordered' = 'subtle';

  update(changedProperties: PropertyValues) {
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

    if (changedProperties.has('variant')) {
      switch (this.variant) {
        case 'subtle':
        case 'bordered':
          break;
        default:
          this.variant = 'subtle';
          break;
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
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      padding: calc(var(--fhi-spacing-200) - var(--fhi-dimension-border-width));
      border-radius: var(--fhi-border-radius-100);
      border: var(--fhi-dimension-border-width) solid transparent;

      letter-spacing: var(--fhi-typography-body-medium-letter-spacing);

      font: var(--fhi-typography-body-medium-font-weight)
        var(--fhi-typography-body-medium-font-size) /
        var(--fhi-typography-body-medium-line-height)
        var(--fhi-font-family-default);

      div {
        display: flex;
        flex-direction: column;
        padding: 0 var(--fhi-spacing-050);
      }

      slot[name='icon'] {
        display: flex;
        justify-content: center;
        align-self: stretch;
      }

      ::slotted([slot='icon']) {
        margin-inline-end: var(--fhi-spacing-050);
      }
    }

    :host([heading]) {
      fhi-title {
        padding: 0.125rem 0;
      }
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
