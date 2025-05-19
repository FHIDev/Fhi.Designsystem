import { html, css, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { calculateTooltipPosition, restingPosition } from './utils';

export const FhiTooltipSelector = 'fhi-tooltip';

export type TooltipPlacement =
  | 'top'
  | 'topStart'
  | 'topEnd'
  | 'bottom'
  | 'bottomStart'
  | 'bottomEnd'
  | 'left'
  | 'leftStart'
  | 'leftEnd'
  | 'right'
  | 'rightStart'
  | 'rightEnd';

@customElement(FhiTooltipSelector)
export class FhiTooltip extends LitElement {
  @property({ type: String }) message?: string = undefined;

  @property({ type: String }) placement: TooltipPlacement = 'top';

  @property({ type: String }) delay: number = 500;

  @property({ type: String }) trigger: 'click' | 'hover' = 'click';

  @query('#tooltip-anchor') _anchor!: HTMLElement;
  @query('#tooltip') _tooltip!: HTMLElement;

  @state()
  protected _timeoutId: number | undefined = undefined;

  @state()
  protected _isVisible = false;

  @state()
  protected _isFadingOut = false;

  @state()
  protected _position = restingPosition;

  constructor() {
    super();

    window.addEventListener('resize', this.handleWindowResize);
  }

  private handleWindowResize = () => {
    if (this._isVisible) {
      this._positionTooltip({
        placement: this.placement,
      });
    }
  };

  private resetTooltipPosition() {
    this._position = restingPosition;
  }

  private _showTooltip() {
    if (this._isVisible) {
      return;
    }

    this._positionTooltip({
      placement: this.placement,
    });

    this._isVisible = true;
  }

  private _hideTooltip() {
    if (!this._isVisible) {
      return;
    }

    this._isFadingOut = true;

    setTimeout(() => {
      this._isVisible = false;
      this._isFadingOut = false;

      this.resetTooltipPosition();
    }, 150);
  }

  private _positionTooltip({
    placement,
    iteration = 0,
    skipOutOfBoundsCheck = false,
  }: {
    placement: TooltipPlacement;
    iteration?: number;
    currentPosition?: { top: number; left: number };
    skipOutOfBoundsCheck?: boolean;
  }) {
    this._position = calculateTooltipPosition({
      tooltipReference: this._tooltip,
      anchorReference: this._anchor,
      placement,
      iteration,
      skipOutOfBoundsCheck,
    });
  }

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

  private _handleClick() {
    if (this.trigger === 'click') {
      this._showTooltip();
    }
  }

  render() {
    return html`
      <div
        id="tooltip-anchor"
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
        @click=${this._handleClick}
      >
        <slot></slot>
      </div>
      <section
        id="tooltip"
        ?visible=${this._isVisible}
        ?fading-out=${this._isFadingOut}
        style="
          top: ${this._position.top + 'px'};
          left: ${this._position.left + 'px'};
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

      --typography-font-family: var(--fhi-font-family-roboto-flex);
      --typography-font-size: var(--fhi-typography-body-small-font-size);
      --typography-font-style: normal;
      --typography-font-weight: var(--fhi-typography-body-small-font-weight);
      --typography-line-height: var(--fhi-typography-body-small-line-height);
      --typography-letter-spacing: var(
        --fhi-typography-body-small-letter-spacing
      );

      --dimension-border-radius: var(--fhi-border-radius-050);
      --dimension-padding: var(--fhi-spacing-050) var(--fhi-spacing-100);
      --dimension-max-width: 18.75rem;
    }

    #tooltip-anchor {
      width: min-content;
      height: min-content;
    }

    #tooltip {
      z-index: 1000;
      position: absolute;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.15s ease-in-out;
      max-width: var(--dimension-max-width);
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
      &[visible] {
        visibility: visible;
        opacity: 1;
      }
      &[fading-out] {
        visibility: visible;
        opacity: 0;
      }
    }
  `;
}
