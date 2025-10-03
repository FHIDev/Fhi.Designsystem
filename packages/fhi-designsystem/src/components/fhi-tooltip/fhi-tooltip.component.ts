import { html, css, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import {
  computePosition,
  autoUpdate,
  shift,
  flip,
  offset,
} from '@floating-ui/dom';

export const FhiTooltipSelector = 'fhi-tooltip';

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

/**
 * ## FHI Tooltip
 *
 * A component that displays a small pop-up of descriptive text when a user hovers over or clicks on an element.
 *
 * {@link https://designsystem.fhi.no/?path=/docs/komponenter-tooltip--docs}
 *
 * @tag fhi-tooltip
 * @element fhi-tooltip
 *
 * @slot - The content that will trigger the tooltip.
 */
@customElement(FhiTooltipSelector)
export class FhiTooltip extends LitElement {
  /**
   * The text content to display inside the tooltip.
   * @attr
   * @type {string}
   */
  @property({ type: String }) message: string = '';

  /**
   * The placement of the tooltip relative to its trigger element.
   * @attr
   * @type {"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end"}
   */
  @property({ type: String }) placement: TooltipPlacement = 'top';

  /**
   * The delay in milliseconds before the tooltip appears on hover.
   * @attr
   * @type {number}
   */
  @property({ type: Number }) delay: number = 500;

  /**
   * The event that triggers the tooltip to show. Can be 'hover' or 'click'.
   * @attr
   * @type {'click' | 'hover'}
   */
  @property({ type: String }) trigger: 'click' | 'hover' = 'hover';

  /**
   * The maximum width of the tooltip.
   * @attr max-width
   * @type {string}
   */
  @property({ type: String, attribute: 'max-width' }) maxWidth? = '18.75rem';

  /**
   * A reference to the tooltip's anchor element (the slotted content).
   * @internal
   */
  @query('#tooltip-anchor') _anchor!: HTMLElement;

  /**
   * A reference to the tooltip element itself.
   * @internal
   */
  @query('#tooltip') _tooltip!: HTMLElement;

  /** @internal */
  protected _timeoutId: number | undefined = undefined;

  /** @internal */
  protected _autoPositioningCleanup: () => void = () => {};

  /** @internal */
  @state()
  protected _isVisible = false;

  /** @internal */
  @state()
  protected _isFadingOut = false;

  /** @internal */
  @state()
  protected _position = {
    top: 0,
    left: 0,
  };

  /**
   * Shows the tooltip.
   * @internal
   */
  private _showTooltip() {
    if (this._isVisible) {
      return;
    }

    if (!this.message) {
      return;
    }

    this._positionTooltip(this.placement);

    this._isVisible = true;

    window.addEventListener('click', this._handlePotentialClickOutside);
    window.addEventListener('keydown', this.__handlePotentialEscapeKeyPress);
  }

  /**
   * Hides the tooltip.
   * @internal
   */
  private _hideTooltip() {
    if (!this._isVisible) {
      return;
    }

    this._isFadingOut = true;

    setTimeout(() => {
      this._isVisible = false;
      this._isFadingOut = false;

      this._autoPositioningCleanup();

      window.removeEventListener('click', this._handlePotentialClickOutside);
      window.removeEventListener(
        'keydown',
        this.__handlePotentialEscapeKeyPress,
      );
    }, 150);
  }

  /**
   * Positions the tooltip using Floating UI.
   * @internal
   * @param {TooltipPlacement} placement - The desired placement.
   */
  private _positionTooltip(placement: TooltipPlacement) {
    // Look into anchor and fallback positioning when they are out of experimental and adopted by all relevant browsers.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning
    // https://developer.mozilla.org/en-US/docs/Web/CSS/position-try-fallbacks
    this._autoPositioningCleanup = autoUpdate(
      this._anchor,
      this._tooltip,
      () => {
        computePosition(this._anchor, this._tooltip, {
          placement,
          strategy: 'fixed',
          middleware: [
            flip({ fallbackAxisSideDirection: 'start' }),
            shift(),
            offset(4),
          ],
        }).then(({ x, y }) => {
          this._position = {
            top: y,
            left: x,
          };
        });
      },
    );
  }

  /**
   * Handles the mouse enter event to show the tooltip on hover.
   * @internal
   */
  private _handleMouseEnter() {
    if (this.trigger !== 'hover') {
      return;
    }

    this._timeoutId = setTimeout(() => {
      this._showTooltip();
    }, this.delay) as unknown as number;
  }

  /**
   * Handles the mouse leave event to hide the tooltip on hover.
   * @internal
   */
  private _handleMouseLeave() {
    if (this.trigger !== 'hover') {
      return;
    }

    clearTimeout(this._timeoutId);
    this._hideTooltip();
  }

  /**
   * Handles clicks outside the component to hide the tooltip when triggered by click.
   * @internal
   * @param {MouseEvent} event - The click event.
   */
  private _handlePotentialClickOutside = (event: MouseEvent) => {
    if (this.trigger !== 'click') {
      return;
    }

    if (this._isVisible && !this.contains(event.target as HTMLElement)) {
      this._hideTooltip();
    }
  };

  /**
   * Handles the Escape key press to hide the tooltip.
   * @internal
   * @param {KeyboardEvent} event - The keydown event.
   */
  private __handlePotentialEscapeKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this._isVisible) {
      this._hideTooltip();
    }
  };

  /**
   * Handles the click event to toggle the tooltip's visibility.
   * @internal
   */
  private _handleClick() {
    if (this.trigger === 'click') {
      if (this._isVisible) {
        this._hideTooltip();
      } else {
        this._showTooltip();
      }
    }
  }

  render() {
    return html`
      <div
        id="tooltip-anchor"
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
        @focusin=${this._handleMouseEnter}
        @focusout=${this._handleMouseLeave}
        @touchstart=${this._handleMouseEnter}
        @touchend=${this._handleMouseLeave}
        @touchcancel=${this._handleMouseLeave}
        @click=${this._handleClick}
      >
        <slot aria-describedby="tooltip"></slot>
        <section
          id="tooltip"
          role="tooltip"
          aria-hidden=${!this._isVisible}
          ?fading-out=${this._isFadingOut}
          style="
          transform: translate3d(${this._position.left}px, ${this._position
            .top}px, 0); max-width: ${this.maxWidth};
          max-width: ${this.maxWidth};
          "
        >
          <span>${this.message}</span>
        </section>
      </div>
    `;
  }

  static styles = css`
    :host {
      --color-background: var(--fhi-color-neutral-base-active);
      --color-text: var(--fhi-color-neutral-text-inverted);
      --color-border: none;

      --typography-font-family: var(--fhi-font-family-default);
      --typography-font-size: var(--fhi-typography-body-small-font-size);
      --typography-font-style: normal;
      --typography-font-weight: var(--fhi-typography-body-small-font-weight);
      --typography-line-height: var(--fhi-typography-body-small-line-height);
      --typography-letter-spacing: var(
        --fhi-typography-body-small-letter-spacing
      );

      --dimension-border-radius: var(--fhi-border-radius-050);
      --dimension-border-width: none;
      --dimension-padding: var(--fhi-spacing-050) var(--fhi-spacing-100);
    }

    :host {
      #tooltip-anchor {
        width: max-content;
        height: max-content;
      }

      #tooltip {
        top: 0;
        left: 0;
        position: fixed;
        border: var(--dimension-border-width) solid var(--color-border);
        visibility: hidden;
        opacity: 0;
        margin: 0;
        transition: opacity 0.15s ease-in-out;
        width: max-content;
        padding: var(--dimension-padding);
        border-radius: var(--dimension-border-radius);
        background-color: var(--color-background);
        color: var(--color-text);
        font-family: var(--typography-font-family);
        font-size: var(--typography-font-size);
        font-weight: var(--typography-font-weight);
        line-height: var(--typography-line-height);
        letter-spacing: var(--typography-letter-spacing);
        font-variant-numeric: lining-nums proportional-nums;
        font-style: normal;
        cursor: default;
        &[aria-hidden='false'] {
          z-index: 1000;
          visibility: visible;
          opacity: 1;
        }
        &[fading-out] {
          opacity: 0;
        }
        &::after {
          content: '';
          position: absolute;
          top: -4px;
          right: -4px;
          bottom: -4px;
          left: -4px;
        }
      }
    }
  `;
}
