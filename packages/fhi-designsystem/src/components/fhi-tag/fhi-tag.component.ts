import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const FhiTagSelector = 'fhi-tag';

@customElement(FhiTagSelector)
export class FhiTag extends LitElement {
  /**
   * Sets the color theme of the tag.
   * @attr
   * @type {'accent' | 'neutral' | 'danger'}
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

    for (const node of validNodes) {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        (node as Element).tagName.toLowerCase().startsWith('fhi-icon')
      ) {
        const icon = node as HTMLElement;

        icon.setAttribute('size', '1rem');
        icon.style.marginLeft = 'var(--dimension-icon-offset)';
      }
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
      --dimension-padding: 0 var(--fhi-spacing-100);
      --dimension-height: var(--fhi-spacing-300);

      --color-neutral-text: var(--fhi-color-neutral-text-default);
      color: var(--fhi-color);
      background-color: var(--fhi-background-color);
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
      --fhi-color: var(--fhi-color-accent-text-default);
      --fhi-background-color: var(--fhi-color-accent-surface-default);
    }

    :host([color='success']) {
      color: var(--fhi-color-success-text-default);
      background-color: var(--fhi-color-success-surface-default);
    }

    :host([color='warning']) {
      --fhi-color: var(--fhi-color-warning-text-default);
      --fhi-background-color: var(--fhi-color-warning-surface-default);
    }

    :host([color='danger']) {
      --fhi-color: var(--fhi-color-danger-text-default);
      --fhi-background-color: var(--fhi-color-danger-surface-default);
    }

    :host([color='info']) {
      --fhi-color: var(--fhi-color-info-text-default);
      --fhi-background-color: var(--fhi-color-info-surface-default);
    }
  `;
}
