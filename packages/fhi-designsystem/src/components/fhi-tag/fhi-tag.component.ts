import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../typography/fhi-body/fhi-body.component';

export const FhiTagSelector = 'fhi-tag';

/**
 * ## FHI Tag
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-tag--docs}
 *
 * The `<fhi-tag>` component is used to create non-interactive tags in accordance with the FHI Design System guidelines.
 *
 * @tag fhi-tag
 * @element fhi-tag
 *
 * @slot - The content of the tag. This should be pure text with, or without, an icon.
 */
@customElement(FhiTagSelector)
export class FhiTag extends LitElement {
  /**
   * Sets the color theme of the tag.
   * @reflect
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
      icon.style.marginLeft = 'var(--dimension-icon-offset)';
    }
  }

  render() {
    return html`
      <fhi-body size="small">
        <slot
          class="slot-container"
          @slotchange=${this._handleSlotChange}
        ></slot>
      </fhi-body>
    `;
  }

  static styles = css`
    :host {
      --dimension-icon-offset: calc(-1 * var(--fhi-spacing-050));
      --fhi-tag-border-radius: unset;
      --fhi-tag-gap: unset;
      --fhi-tag-padding: unset;
      --fhi-tag-height: unset;

      --fhi-tag-border-color: unset;

      --fhi-tag-color: unset;
      --fhi-tag-background-color: unset;
    }

    :host {
      --fhi-tag-border-radius: var(--fhi-border-radius-050);
      --fhi-tag-gap: var(--fhi-spacing-050);
      --fhi-tag-padding: 0 calc(var(--fhi-spacing-100) - 1px);
      --fhi-tag-height: calc(var(--fhi-spacing-300) - 2px);
      --fhi-tag-border-color: transparent;

      display: flex;
      width: fit-content;
      align-items: center;

      border: 1px solid var(--fhi-tag-border-color);
      border-radius: var(--fhi-tag-border-radius);

      height: var(--fhi-tag-height);
      padding: var(--fhi-tag-padding);
      color: var(--fhi-tag-color);
      background-color: var(--fhi-tag-background-color);

      .slot-container {
        display: flex;
        align-items: center;

        gap: var(--fhi-tag-gap);
      }

      & fhi-body {
        color: inherit;
      }
    }

    :host([color='neutral']) {
      --fhi-tag-color: var(--fhi-color-neutral-text-default);
      --fhi-tag-background-color: var(--fhi-color-neutral-surface-default);
    }

    :host([color='accent']) {
      --fhi-tag-color: var(--fhi-color-accent-text-default);
      --fhi-tag-background-color: var(--fhi-color-accent-surface-default);
    }

    :host([color='success']) {
      --fhi-tag-color: var(--fhi-color-success-text-default);
      --fhi-tag-background-color: var(--fhi-color-success-surface-default);
    }

    :host([color='warning']) {
      --fhi-tag-color: var(--fhi-color-warning-text-default);
      --fhi-tag-background-color: var(--fhi-color-warning-surface-default);
    }

    :host([color='danger']) {
      --fhi-tag-color: var(--fhi-color-danger-text-default);
      --fhi-tag-background-color: var(--fhi-color-danger-surface-default);
    }

    :host([color='info']) {
      --fhi-tag-color: var(--fhi-color-info-text-default);
      --fhi-tag-background-color: var(--fhi-color-info-surface-default);
    }
  `;
}
