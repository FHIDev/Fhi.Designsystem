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
 * @slot icon - Optional icon to be displayed in the tag.
 * @slot - The text content of the tag.
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

  /**
   * Sets the variant of the tag, which determines its visual style.
   * @reflect
   * @type {'subtle' | 'bordered'}
   */
  @property({ type: String, reflect: true })
  variant: 'subtle' | 'bordered' = 'subtle';

  private _getFirstValidNode(slot: HTMLSlotElement): Node | undefined {
    const validNodes = slot
      .assignedNodes()
      .filter(
        node =>
          node.nodeType === Node.ELEMENT_NODE ||
          (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()),
      );

    return validNodes[0];
  }

  private _setIconStyles(icon: HTMLElement): void {
    icon.setAttribute('size', '1rem');
    icon.style.marginInlineEnd = 'var(--fhi-spacing-050)';
  }

  private _handleSlotChange(event: Event): void {
    const firstNode = this._getFirstValidNode(event.target as HTMLSlotElement);

    if (!firstNode) {
      return;
    }

    if (
      firstNode.nodeType === Node.ELEMENT_NODE &&
      (firstNode as Element).tagName.toLowerCase().startsWith('fhi-icon')
    ) {
      console.warn(
        "Icon have been moved to the 'icon' slot. The current usage is deprecated and will no longer be supported in a future release. See documentation for more information: https://designsystem.fhi.no/?path=/docs/komponenter-tag--docs#ikon",
      );
      const icon = firstNode as HTMLElement;
      this._setIconStyles(icon);
    }
  }

  private _handleIconSlotChange(event: Event): void {
    const firstNode = this._getFirstValidNode(event.target as HTMLSlotElement);

    if (!firstNode) {
      return;
    }

    if (
      firstNode.nodeType === Node.ELEMENT_NODE &&
      (firstNode as Element).tagName.toLowerCase().startsWith('fhi-icon')
    ) {
      const icon = firstNode as HTMLElement;
      this._setIconStyles(icon);
    }
  }

  render() {
    return html`
      <slot name="icon" @slotchange=${this._handleIconSlotChange}></slot>
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
      }

      slot[name='icon'] {
        justify-content: center;
        align-self: stretch;
      }
    }

    :host([color='neutral']) {
      color: var(--fhi-color-neutral-text-default);
      background-color: var(--fhi-color-neutral-surface-default);
      &:host([variant='bordered']) {
        border-color: var(--fhi-color-neutral-surface-active);
      }
    }

    :host([color='accent']) {
      color: var(--fhi-color-accent-text-default);
      background-color: var(--fhi-color-accent-surface-default);
      &:host([variant='bordered']) {
        border-color: var(--fhi-color-accent-surface-active);
      }
    }

    :host([color='success']) {
      color: var(--fhi-color-success-text-default);
      background-color: var(--fhi-color-success-surface-default);

      &:host([variant='bordered']) {
        border-color: var(--fhi-color-success-surface-active);
      }
    }

    :host([color='warning']) {
      color: var(--fhi-color-warning-text-default);
      background-color: var(--fhi-color-warning-surface-default);
      &:host([variant='bordered']) {
        border-color: var(--fhi-color-warning-surface-active);
      }
    }

    :host([color='danger']) {
      color: var(--fhi-color-danger-text-default);
      background-color: var(--fhi-color-danger-surface-default);
      &:host([variant='bordered']) {
        border-color: var(--fhi-color-danger-surface-active);
      }
    }

    :host([color='info']) {
      color: var(--fhi-color-info-text-default);
      background-color: var(--fhi-color-info-surface-default);
      &:host([variant='bordered']) {
        border-color: var(--fhi-color-info-surface-active);
      }
    }
  `;
}
