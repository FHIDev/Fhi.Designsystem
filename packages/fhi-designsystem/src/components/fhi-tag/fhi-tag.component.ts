import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiTagSelector = 'fhi-tag';

/**
 * ## FHI Tag
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-tag--docs}
 *
 * The `<fhi-tag>` component is used to create non-interactive tags in accordance with the FHI design system guidelines.
 *
 * @tag fhi-tag
 * @element fhi-tag
 *
 * @slot - The content of the tag. This should be pure text with, or without, an icon.
 */
@customElement(FhiTagSelector)
export class FhiTag extends LitElement {
  /**
   * Sets the color of the tag.
   * @attr
   * @type {'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'}
   */
  @property({ type: String, reflect: true }) color:
    | 'neutral'
    | 'accent'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info' = 'neutral';

  private _handleSlotChange(event: Event): void {
    const nodes = (event.target as HTMLSlotElement).assignedNodes();

    const validNodes = nodes.filter(
      node =>
        node.nodeType === Node.ELEMENT_NODE ||
        (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()),
    );

    if (validNodes.length === 0) {
      return;
    }

    const firstNode: Node = validNodes[0];

    if (
      firstNode.nodeType === Node.ELEMENT_NODE &&
      (firstNode as Element).tagName.toLowerCase().startsWith('fhi-icon')
    ) {
      const icon = firstNode as HTMLElement;

      icon.setAttribute('size', '1rem');
      icon.setAttribute('color', 'var(--color-' + this.color + '-text)');
      icon.style.marginLeft = 'var(--dimension-icon-offset)';
    }
  }

  render() {
    return html` <slot @slotchange=${this._handleSlotChange}></slot> `;
  }

  static styles = css`
    :host {
      --typography-font-family: var(--fhi-font-family-default);
      --typography-font-size: var(--fhi-typography-body-small-font-size);
      --typography-font-weight: var(--fhi-typography-body-small-font-weight);
      --typography-font-height: var(--fhi-typography-body-small-line-height);
      --typography-letter-spacing: var(
        --fhi-typography-body-small-letter-spacing
      );
      --typography-font-variant-numeric: lining-nums proportional-nums;

      --dimension-icon-offset: calc(-1 * var(--fhi-spacing-050));
      --dimension-border-radius: var(--fhi-border-radius-050);
      --dimension-gap: var(--fhi-spacing-050);
      --dimension-padding: 0 calc(var(--fhi-spacing-100) - 1px);
      --dimension-height: calc(var(--fhi-spacing-300) - 2px);

      --color-border: transparent;

      --color-neutral-text: var(--fhi-color-neutral-text-default);
      --color-neutral-background: var(--fhi-color-neutral-surface-default);

      --color-accent-text: var(--fhi-color-accent-text-default);
      --color-accent-background: var(--fhi-color-accent-surface-default);

      --color-success-text: var(--fhi-color-success-text-default);
      --color-success-background: var(--fhi-color-success-surface-default);

      --color-warning-text: var(--fhi-color-warning-text-default);
      --color-warning-background: var(--fhi-color-warning-surface-default);

      --color-danger-text: var(--fhi-color-danger-text-default);
      --color-danger-background: var(--fhi-color-danger-surface-default);

      --color-info-text: var(--fhi-color-info-text-default);
      --color-info-background: var(--fhi-color-info-surface-default);
    }

    :host {
      display: flex;
      width: fit-content;
      align-items: center;
      justify-content: center;

      font-family: var(--typography-font-family);
      font-size: var(--typography-font-size);
      font-weight: var(--typography-font-weight);
      line-height: var(--typography-font-height);
      letter-spacing: var(--typography-letter-spacing);
      font-variant-numeric: var(--typography-font-variant-numeric);
      -webkit-font-smoothing: antialiased;

      border: 1px solid var(--color-border);
      border-radius: var(--dimension-border-radius);
      gap: var(--dimension-gap);
      padding: var(--dimension-padding);
      height: var(--dimension-height);
    }

    :host([color='neutral']) {
      color: var(--color-neutral-text);
      background-color: var(--fhi-color-neutral-surface-default);
    }

    :host([color='accent']) {
      color: var(--color-accent-text);
      background-color: var(--fhi-color-accent-surface-default);
    }

    :host([color='success']) {
      color: var(--fhi-color-success-text-default);
      background-color: var(--fhi-color-success-surface-default);
    }

    :host([color='warning']) {
      color: var(--fhi-color-warning-text-default);
      background-color: var(--fhi-color-warning-surface-default);
    }

    :host([color='danger']) {
      color: var(--fhi-color-danger-text-default);
      background-color: var(--fhi-color-danger-surface-default);
    }

    :host([color='info']) {
      color: var(--fhi-color-info-text-default);
      background-color: var(--fhi-color-info-surface-default);
    }
  `;
}
