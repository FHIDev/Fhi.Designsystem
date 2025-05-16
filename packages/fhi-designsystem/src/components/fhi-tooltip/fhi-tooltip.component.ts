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

  @property({ type: String }) placement: TooltipPlacement = 'leftStart';

  @property({ type: String }) width: string = 'max-content';

  @query('#tooltip-trigger') _trigger!: HTMLElement;
  @query('#tooltip') _tooltip!: HTMLElement;

  @state()
  protected _tooltipVisible = false;

  @state()
  protected _tooltipHiding = false;

  @state()
  protected _position = {
    top: -1,
    left: -1,
  };

  private _showTooltip() {
    this._positionTooltip({
      placement: this.placement,
    });
    this._tooltipVisible = true;
  }

  private _hideTooltip() {
    this._tooltipHiding = true;

    setTimeout(() => {
      this._tooltipVisible = false;
      this._tooltipHiding = false;
    }, 150);
  }

  private _positionTooltip({
    placement,
    iteration = 0,
    currentPosition = { ...this._position },
    skipOutOfBoundsCheck = false,
  }: {
    placement: TooltipPlacement;
    iteration?: number;
    currentPosition?: { top: number; left: number };
    skipOutOfBoundsCheck?: boolean;
  }) {
    console.log('Positioning tooltip', placement, iteration);

    /*
      If the tooltip is out of the viewport, and we could not find a valid position
      after 5 iterations, we will just place it on top of the trigger
    */
    if (iteration > 4) {
      console.log('Tooltip out of bounds, placing on top');

      if (placement !== 'top') {
        this._positionTooltip({
          placement: 'top',
          skipOutOfBoundsCheck: true,
        });
      }

      return;
    }

    const tooltip = this._tooltip;
    const trigger = this._trigger;

    const triggerRectangle = trigger.getBoundingClientRect();
    const tooltipRectangle = tooltip.getBoundingClientRect();

    // Calculate the position of the tooltip based on the trigger position and the given placement
    switch (placement) {
      case 'top':
        currentPosition.top =
          triggerRectangle.top + window.scrollY - tooltipRectangle.height - 4;
        currentPosition.left =
          triggerRectangle.left +
          window.scrollX +
          triggerRectangle.width / 2 -
          tooltipRectangle.width / 2;
        break;
      case 'topStart':
        currentPosition.top =
          triggerRectangle.top + window.scrollY - tooltipRectangle.height - 4;
        currentPosition.left = triggerRectangle.left + window.scrollX;
        break;
      case 'topEnd':
        currentPosition.top =
          triggerRectangle.top + window.scrollY - tooltipRectangle.height - 4;
        currentPosition.left =
          triggerRectangle.right + window.scrollX - tooltipRectangle.width;
        break;

      case 'bottom':
        currentPosition.top = triggerRectangle.bottom + window.scrollY + 4;
        currentPosition.left =
          triggerRectangle.left +
          window.scrollX +
          triggerRectangle.width / 2 -
          tooltipRectangle.width / 2;
        break;
      case 'bottomStart':
        currentPosition.top = triggerRectangle.bottom + window.scrollY + 4;
        currentPosition.left = triggerRectangle.left + window.scrollX;
        break;
      case 'bottomEnd':
        currentPosition.top = triggerRectangle.bottom + window.scrollY + 4;
        currentPosition.left =
          triggerRectangle.right + window.scrollX - tooltipRectangle.width;
        break;

      case 'left':
        currentPosition.top =
          triggerRectangle.top +
          window.scrollY +
          triggerRectangle.height / 2 -
          tooltipRectangle.height / 2;
        currentPosition.left =
          triggerRectangle.left + window.scrollX - tooltipRectangle.width - 4;
        break;
      case 'leftStart':
        currentPosition.top = triggerRectangle.top + window.scrollY;
        currentPosition.left =
          triggerRectangle.left + window.scrollX - tooltipRectangle.width - 4;
        break;
      case 'leftEnd':
        currentPosition.top =
          triggerRectangle.bottom - tooltipRectangle.height + window.scrollY;
        currentPosition.left =
          triggerRectangle.left + window.scrollX - tooltipRectangle.width - 4;
        break;

      case 'right':
        currentPosition.top =
          triggerRectangle.top +
          window.scrollY +
          triggerRectangle.height / 2 -
          tooltipRectangle.height / 2;
        currentPosition.left = triggerRectangle.right + 4;
        break;
      case 'rightStart':
        currentPosition.top = triggerRectangle.top + window.scrollY;
        currentPosition.left = triggerRectangle.right + window.scrollX + 4;
        break;
      case 'rightEnd':
        currentPosition.top =
          triggerRectangle.bottom + window.scrollY - tooltipRectangle.height;
        currentPosition.left = triggerRectangle.right + window.scrollX + 4;
        break;

      default:
        this._positionTooltip({
          placement: 'top',
        });
        break;
    }

    if (skipOutOfBoundsCheck) {
      this._position = currentPosition;
      return;
    }

    // Check if the tooltip is out of bounds and recursively find a new position if so.

    // Top
    if (currentPosition.top < window.scrollY) {
      switch (true) {
        case placement.startsWith('top'):
          this._positionTooltip({
            placement: 'bottom',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
        case placement === 'leftStart':
          this._positionTooltip({
            placement: 'bottom',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
        case placement.startsWith('left'):
          this._positionTooltip({
            placement: 'leftStart',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
        case placement === 'rightStart':
          this._positionTooltip({
            placement: 'bottom',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
        case placement.startsWith('right'):
          this._positionTooltip({
            placement: 'rightStart',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
      }
    }

    // Right
    if (
      currentPosition.left + tooltipRectangle.width >
      window.scrollX + window.innerWidth
    ) {
      switch (true) {
        case placement.startsWith('right'):
          this._positionTooltip({
            placement: 'left',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
        case placement === 'topEnd':
          this._positionTooltip({
            placement: 'left',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
        case placement.startsWith('top'):
          this._positionTooltip({
            placement: 'topEnd',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
        case placement === 'bottomEnd':
          this._positionTooltip({
            placement: 'left',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
        case placement.startsWith('bottom'):
          this._positionTooltip({
            placement: 'bottomEnd',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
      }
    }

    // Bottom
    if (
      currentPosition.top + tooltipRectangle.height >
      window.scrollY + window.innerHeight
    ) {
      switch (true) {
        case placement.startsWith('bottom'):
          this._positionTooltip({
            placement: 'top',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
        case placement === 'leftEnd':
          this._positionTooltip({
            placement: 'top',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
        case placement.startsWith('left'):
          this._positionTooltip({
            placement: 'leftEnd',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
        case placement === 'rightEnd':
          this._positionTooltip({
            placement: 'top',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
        case placement.startsWith('right'):
          this._positionTooltip({
            placement: 'rightEnd',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
      }
    }

    // Left
    if (currentPosition.left < window.scrollX) {
      switch (true) {
        case placement.startsWith('left'):
          this._positionTooltip({
            placement: 'right',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
        case placement === 'topStart':
          this._positionTooltip({
            placement: 'right',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
        case placement.startsWith('top'):
          this._positionTooltip({
            placement: 'topStart',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
        case placement === 'bottomStart':
          this._positionTooltip({
            placement: 'right',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
        case placement.startsWith('bottom'):
          this._positionTooltip({
            placement: 'bottomStart',
            iteration: iteration + 1,
            currentPosition,
          });
          return;
      }
    }

    console.log('Tooltip position:', currentPosition);

    // If the tooltip is not out of bounds, set the position in the DOM
    this._position = currentPosition;
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
          width: ${this.width};
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
