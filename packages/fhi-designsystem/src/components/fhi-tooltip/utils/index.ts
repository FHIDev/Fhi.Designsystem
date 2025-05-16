import { TooltipPlacement } from '../fhi-tooltip.component';

export const calculateTooltipPosition = ({
  tooltipReference,
  triggerReference,
  placement,
  iteration = 0,
  currentPosition = {
    top: -1,
    left: -1,
  },
  skipOutOfBoundsCheck = false,
}: {
  tooltipReference: HTMLElement;
  triggerReference: HTMLElement;
  placement: TooltipPlacement;
  iteration?: number;
  currentPosition?: { top: number; left: number };
  skipOutOfBoundsCheck?: boolean;
}): {
  top: number;
  left: number;
} => {
  console.log('Positioning tooltip', placement, iteration);

  /*
    If the tooltip is out of the viewport, and we could not find a valid position
    after 5 iterations, we will just place it on top of the trigger
  */
  if (iteration > 4) {
    console.log('Tooltip out of bounds, placing on top');

    if (placement !== 'top') {
      return calculateTooltipPosition({
        placement: 'top',
        skipOutOfBoundsCheck: true,
        tooltipReference,
        triggerReference,
      });
    }
  }

  const triggerRectangle = triggerReference.getBoundingClientRect();
  const tooltipRectangle = tooltipReference.getBoundingClientRect();

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
      currentPosition.left = triggerRectangle.right + window.scrollX + 4;
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
      return calculateTooltipPosition({
        placement: 'top',
        tooltipReference,
        triggerReference,
        currentPosition,
      });
  }

  if (skipOutOfBoundsCheck) {
    return currentPosition;
  }

  // Check if the tooltip is out of bounds and recursively find a new position if so.

  // Top
  if (currentPosition.top < window.scrollY) {
    switch (true) {
      case placement.startsWith('top'):
        return calculateTooltipPosition({
          placement: 'bottom',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
      case placement === 'leftStart':
        return calculateTooltipPosition({
          placement: 'bottom',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
      case placement.startsWith('left'):
        return calculateTooltipPosition({
          placement: 'leftStart',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
      case placement === 'rightStart':
        return calculateTooltipPosition({
          placement: 'bottom',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
      case placement.startsWith('right'):
        return calculateTooltipPosition({
          placement: 'rightStart',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
    }
  }

  // Right
  if (
    currentPosition.left + tooltipRectangle.width >
    window.scrollX + window.innerWidth
  ) {
    switch (true) {
      case placement.startsWith('right'):
        return calculateTooltipPosition({
          placement: 'left',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
      case placement === 'topEnd':
        return calculateTooltipPosition({
          placement: 'left',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
      case placement.startsWith('top'):
        return calculateTooltipPosition({
          placement: 'topEnd',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
      case placement === 'bottomEnd':
        return calculateTooltipPosition({
          placement: 'left',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
      case placement.startsWith('bottom'):
        return calculateTooltipPosition({
          placement: 'bottomEnd',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
    }
  }

  // Bottom
  if (
    currentPosition.top + tooltipRectangle.height >
    window.scrollY + window.innerHeight
  ) {
    switch (true) {
      case placement.startsWith('bottom'):
        return calculateTooltipPosition({
          placement: 'top',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
      case placement === 'leftEnd':
        return calculateTooltipPosition({
          placement: 'top',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
      case placement.startsWith('left'):
        return calculateTooltipPosition({
          placement: 'leftEnd',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
      case placement === 'rightEnd':
        return calculateTooltipPosition({
          placement: 'top',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
      case placement.startsWith('right'):
        return calculateTooltipPosition({
          placement: 'rightEnd',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
    }
  }

  // Left
  if (currentPosition.left < window.scrollX) {
    switch (true) {
      case placement.startsWith('left'):
        return calculateTooltipPosition({
          placement: 'right',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
      case placement === 'topStart':
        return calculateTooltipPosition({
          placement: 'right',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
      case placement.startsWith('top'):
        return calculateTooltipPosition({
          placement: 'topStart',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
      case placement === 'bottomStart':
        return calculateTooltipPosition({
          placement: 'right',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
      case placement.startsWith('bottom'):
        return calculateTooltipPosition({
          placement: 'bottomStart',
          iteration: iteration + 1,
          currentPosition,
          tooltipReference,
          triggerReference,
        });
    }
  }

  // If the tooltip is not out of bounds, return the current position
  return currentPosition;
};
