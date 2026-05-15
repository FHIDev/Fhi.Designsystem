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
      icon.style.marginLeft = 'calc(-1 * var(--fhi-spacing-050))';
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
      --fhi-tag-border-color: unset;
    }

    :host {
      --fhi-tag-border-color: transparent;

      display: flex;
      width: fit-content;
      align-items: center;

      border: 1px solid var(--fhi-tag-border-color);
      border-radius: var(--fhi-border-radius-050);

      height: calc(var(--fhi-spacing-300) - 2px);
      padding: 0 calc(var(--fhi-spacing-100) - 1px);

      .slot-container {
        display: flex;
        align-items: center;

        gap: var(--fhi-spacing-050);
      }

      & fhi-body {
        color: inherit;
      }
    }

    :host([color='neutral']) {
      color: var(--fhi-color-neutral-text-default);
      background-color: var(--fhi-color-neutral-surface-default);
    }

    :host([color='accent']) {
      color: var(--fhi-color-accent-text-default);
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
