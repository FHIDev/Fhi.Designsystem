import { html, css, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import {
  calculateTooltipPosition,
  getOverflowAncestors,
  restingPosition,
} from './utils/positioning';

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

@customElement(FhiTooltipSelector)
export class FhiTooltip extends LitElement {
  @property({ type: String }) message: string = '';

  @property({ type: String }) placement: TooltipPlacement = 'top';

  @property({ type: String }) delay: number = 500;

  @property({ type: String }) trigger: 'click' | 'hover' = 'hover';

  @property({ type: String, attribute: 'max-width' }) maxWidth? = '18.75rem';

  @query('#tooltip-anchor') _anchor!: HTMLElement;
  @query('#tooltip') _tooltip!: HTMLElement;

  protected _timeoutId: number | undefined = undefined;

  protected _autoPositioningCleanup: () => void = () => {};

  @state()
  protected _isVisible = false;

  @state()
  protected _isFadingOut = false;

  @state()
  protected _position = restingPosition;

  private _showTooltip() {
    if (this._isVisible) {
      return;
    }

    if (!this.message) {
      return;
    }

    this._tooltip.showPopover();

    this._positionTooltip(this.placement);

    this._isVisible = true;

    window.addEventListener('click', this._handlePotentialClickOutside);
  }

  private _hideTooltip() {
    if (!this._isVisible) {
      return;
    }

    this._isFadingOut = true;

    setTimeout(() => {
      this._isVisible = false;
      this._isFadingOut = false;

      this._tooltip.hidePopover();

      this._autoPositioningCleanup();
      window.removeEventListener('click', this._handlePotentialClickOutside);
    }, 150);
  }

  private _autoUpdate = (positioningFunction: () => void) => {
    const overflowAncestors = getOverflowAncestors(this._anchor);

    positioningFunction();

    overflowAncestors.forEach(ancestor => {
      ancestor.addEventListener('scroll', positioningFunction);
      ancestor.addEventListener('resize', positioningFunction);
    });

    return () => {
      overflowAncestors.forEach(ancestor => {
        ancestor.removeEventListener('scroll', positioningFunction);
        ancestor.removeEventListener('resize', positioningFunction);
      });
    };
  };

  private _positionTooltip = (placement: TooltipPlacement) => {
    this._autoPositioningCleanup = this._autoUpdate(() => {
      const position = calculateTooltipPosition({
        tooltipRect: this._tooltip.getBoundingClientRect(),
        anchorRect: this._anchor.getBoundingClientRect(),
        placement,
      });

      if (position) {
        this._position = position;
        return;
      }

      this._hideTooltip();
    });
  };

  private _handleMouseEnter() {
    if (this.trigger !== 'hover') {
      return;
    }

    this._timeoutId = setTimeout(() => {
      this._showTooltip();
    }, this.delay) as unknown as number;
  }

  private _handleMouseLeave() {
    if (this.trigger !== 'hover') {
      return;
    }

    clearTimeout(this._timeoutId);
    this._hideTooltip();
  }

  private _handlePotentialClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (this._isVisible && !this.contains(target)) {
      this._hideTooltip();
    }
  };

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
        <slot aria-labelledby="tooltip"></slot>
      </div>
      <section
        id="tooltip"
        popover="manual"
        role="tooltip"
        aria-hidden=${!this._isVisible}
        ?fading-out=${this._isFadingOut}
        style="
          transform: translate3d(${this._position.left}px, ${this._position
          .top}px, 0);
          max-width: ${this.maxWidth};
          "
      >
        <span>${this.message}</span>
      </section>
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
          visibility: visible;
          opacity: 1;
        }
        &[fading-out] {
          opacity: 0;
        }
      }
    }
  `;
}
