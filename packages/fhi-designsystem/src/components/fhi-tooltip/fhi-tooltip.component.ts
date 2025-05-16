import { html, css, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

export const FhiTooltipSelector = 'fhi-tooltip';

type TooltipPlacement =
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

  @property({ type: String }) placement: TooltipPlacement = 'rightEnd';

  @query('#tooltip-trigger') _trigger!: HTMLElement;
  @query('#tooltip') _tooltip!: HTMLElement;

  @state()
  protected _tooltipVisible = false;

  @state()
  protected _tooltipHiding = false;

  @state()
  protected _position = {
    top: 0,
    left: 0,
  };

  private _showTooltip() {
    this._positionTooltip(this.placement);
    this._tooltipVisible = true;
  }

  private _hideTooltip() {
    this._tooltipHiding = true;

    setTimeout(() => {
      this._tooltipVisible = false;
      this._tooltipHiding = false;
    }, 150);
  }

  private _positionTooltip(placement: TooltipPlacement) {
    const tooltip = this._tooltip;
    const trigger = this._trigger;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    switch (placement) {
      case 'top':
        this._position.top = triggerRect.top - tooltipRect.height - 4;
        this._position.left =
          triggerRect.left +
          window.scrollX +
          triggerRect.width / 2 -
          tooltipRect.width / 2;
        break;
      case 'topStart':
        this._position.top = triggerRect.top - tooltipRect.height - 4;
        this._position.left = triggerRect.left;
        break;
      case 'topEnd':
        this._position.top = triggerRect.top - tooltipRect.height - 4;
        this._position.left = triggerRect.right - tooltipRect.width;
        break;

      case 'bottom':
        this._position.top = triggerRect.bottom + 4;
        this._position.left =
          triggerRect.left +
          window.scrollX +
          triggerRect.width / 2 -
          tooltipRect.width / 2;
        break;
      case 'bottomStart':
        this._position.top = triggerRect.bottom + 4;
        this._position.left = triggerRect.left;
        break;
      case 'bottomEnd':
        this._position.top = triggerRect.bottom + 4;
        this._position.left = triggerRect.right - tooltipRect.width;
        break;

      case 'left':
        this._position.top =
          triggerRect.top +
          window.scrollY +
          triggerRect.height / 2 -
          tooltipRect.height / 2;
        this._position.left = triggerRect.left - tooltipRect.width - 4;
        break;
      case 'leftStart':
        this._position.top = triggerRect.top;
        this._position.left = triggerRect.left - tooltipRect.width - 4;
        break;
      case 'leftEnd':
        this._position.top = triggerRect.bottom - tooltipRect.height;
        this._position.left = triggerRect.left - tooltipRect.width - 4;
        break;

      case 'right':
        this._position.top =
          triggerRect.top +
          window.scrollY +
          triggerRect.height / 2 -
          tooltipRect.height / 2;
        this._position.left = triggerRect.right + 4;
        break;
      case 'rightStart':
        this._position.top = triggerRect.top;
        this._position.left = triggerRect.right + 4;
        break;
      case 'rightEnd':
        this._position.top = triggerRect.bottom - tooltipRect.height;
        this._position.left = triggerRect.right + 4;
        break;

      default:
        this._positionTooltip('top');
        break;
    }
  }

  render() {
    return html`
      <div
        id="tooltip-trigger"
        @mouseenter=${() => this._showTooltip()}
        @mouseleave=${() => this._hideTooltip()}
      >
        <slot></slot>
      </div>
      <section
        id="tooltip"
        ?visible=${this._tooltipVisible}
        ?hiding=${this._tooltipHiding}
        style="
          top: ${this._position.top ? this._position.top + 'px' : 'auto'};
          left: ${this._position.left ? this._position.left + 'px' : 'auto'};
          "
      >
        <span>${this.message}</span>
      </section>
    `;
  }

  static styles = css`
    :host {
      --color-tooltip-background: var(--fhi-color-neutral-base-active);
      --color-tooltip-text: var(--fhi-color-neutral-text-inverted);

      --typography-tooltip-font-family: var(--fhi-font-family-roboto-flex);
      --typography-tooltip-font-size: var(
        --fhi-typography-body-small-font-size
      );
      --typography-tooltip-font-style: normal;
      --typography-tooltip-font-weight: var(
        --fhi-typography-body-small-font-weight
      );
      --typography-tooltip-line-height: var(
        --fhi-typography-body-small-line-height
      );
      --typography-tooltip-letter-spacing: var(
        --fhi-typography-body-small-letter-spacing
      );

      --dimension-tooltip-border-radius: var(--fhi-border-radius-050);
      --dimension-tooltip-padding: var(--fhi-spacing-050) var(--fhi-spacing-100);
      --dimension-tooltip-max-width: 18.75rem;
    }

    #tooltip-trigger {
      width: min-content;
      height: min-content;
    }

    #tooltip {
      z-index: 1000;
      position: absolute;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.15s ease-in-out;
      max-width: var(--dimension-tooltip-max-width);
      padding: var(--dimension-tooltip-padding);
      border-radius: var(--dimension-tooltip-border-radius);
      background-color: var(--color-tooltip-background);
      color: var(--color-tooltip-text);
      font-family: var(--typography-tooltip-font-family);
      font-size: var(--typography-tooltip-font-size);
      font-weight: var(--typography-tooltip-font-weight);
      line-height: var(--typography-tooltip-line-height);
      letter-spacing: var(--typography-tooltip-letter-spacing);
      font-variant-numeric: lining-nums proportional-nums;
      font-style: normal;
      &[visible] {
        visibility: visible;
        opacity: 1;
      }
      &[hiding] {
        visibility: visible;
        opacity: 0;
      }
    }
  `;
}
