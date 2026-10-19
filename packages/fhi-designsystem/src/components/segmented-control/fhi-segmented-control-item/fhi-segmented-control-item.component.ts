import { html, css, LitElement } from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
  query,
} from 'lit/decorators.js';

export const FhiSegmentedControlItemSelector = 'fhi-segmented-control-item';

/**
 * ## FHI Segmented Control Item
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-segmented-control--docs}
 *
 * The <fhi-segmented-control-item> component represents an individual choice within a <fhi-segmented-control>. It can display text content with or without an icon.
 *
 *
 * @tag fhi-segmented-control-item
 * @element fhi-segmented-control-item
 *
 * @slot icon - Slot for placing an icon.
 * @slot - The default slot. Used for placing the text content.
 */
@customElement(FhiSegmentedControlItemSelector)
export class FhiSegmentedControlItem extends LitElement {
  /**
   * Sets the segmented control item's visual style and emphasis. This is automatically inherited from the parent segmented control.
   *
   * @reflect
   * @type {'strong' | 'subtle'}
   */
  @property({ type: String, reflect: true }) variant: 'strong' | 'subtle' =
    'strong';

  /**
   * Whether the segmented control button is selected or not.
   *
   * @reflect
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) selected? = false;

  /**
   * The value of the segmented control item.
   * If not specified, the value will be derived from the items text content.
   *
   * @reflect
   * @type {string | null}
   */
  @property({ type: String, reflect: true }) value: string | null = null;

  public override click(): void {
    this.shadowRoot?.querySelector('button')?.click();
  }

  private _handleClick(): void {
    this.selected = true;
  }

  @queryAssignedElements({ slot: 'icon' })
  iconSlotElements!: Array<HTMLElement>;

  @query('slot.content')
  contentSlot!: HTMLSlotElement;

  private handleSlotChange(): void {
    const hasContentNodes = this.contentSlot
      .assignedNodes()
      .some(
        node =>
          node.nodeType !== Node.TEXT_NODE || node.textContent?.trim() !== '',
      );

    if (!hasContentNodes && this.iconSlotElements.length !== 0) {
      console.warn(
        `${FhiSegmentedControlItemSelector} cannot have an icon without also having text content.`,
      );
    }
  }

  render() {
    return html`
      <button
        type="button"
        aria-checked=${this.selected ? 'true' : 'false'}
        tabindex=${this.selected ? '0' : '-1'}
        @click=${this._handleClick}
        role="radio"
      >
        <slot name="icon" @slotchange=${this.handleSlotChange}></slot>
        <slot class="content" @slotchange=${this.handleSlotChange}></slot>
      </button>
    `;
  }

  static styles = css`
    button {
      display: inline-flex;
      gap: var(--fhi-spacing-050);
      align-items: center;
      justify-content: center;
      border-radius: var(--fhi-border-radius-full);
      border: solid var(--fhi-dimension-border-width) transparent;
      font-family: var(--fhi-font-family-default);
      -webkit-font-smoothing: antialiased;
      transition:
        background-color var(--fhi-motion-duration-quick)
          var(--fhi-motion-ease-default),
        border-color var(--fhi-motion-duration-quick)
          var(--fhi-motion-ease-default),
        color var(--fhi-motion-duration-quick) var(--fhi-motion-ease-default);
      cursor: pointer;
      background-color: transparent;

      font-size: var(--fhi-typography-label-medium-font-size);
      font-weight: var(--fhi-typography-label-medium-font-weight);
      line-height: var(--fhi-typography-label-medium-line-height);
      letter-spacing: var(--fhi-typography-label-medium-letter-spacing);
      padding: calc(var(--fhi-spacing-100) - var(--fhi-dimension-border-width))
        calc(var(--fhi-spacing-150) - var(--fhi-dimension-border-width));
      color: var(--fhi-color-neutral-text-subtle);
    }

    .content {
      display: inline;
      margin: 0 var(--fhi-spacing-050);
    }

    :host([variant='strong']) button {
      &:hover {
        background-color: var(--fhi-color-neutral-surface-default);
        color: var(--fhi-color-neutral-text-default);
      }
      &:active {
        background-color: var(--fhi-color-neutral-surface-hover);
        color: var(--fhi-color-neutral-text-default);
      }
    }

    :host([variant='strong'][selected]) button {
      background-color: var(--fhi-color-neutral-base-default);
      color: var(--fhi-color-neutral-text-inverted);
    }

    :host([variant='subtle']) button {
      &:hover {
        background-color: var(--fhi-color-neutral-surface-hover);
      }

      &:active {
        background-color: var(--fhi-color-neutral-surface-active);
        color: var(--fhi-color-neutral-text-default);
      }
    }

    :host([variant='subtle'][selected]) button {
      background-color: var(--fhi-color-neutral-background-default);
      border-color: var(--fhi-color-neutral-border-default);
      color: var(--fhi-color-neutral-text-default);
    }
  `;
}
