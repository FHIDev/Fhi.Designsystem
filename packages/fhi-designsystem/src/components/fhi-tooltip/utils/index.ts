import { TooltipPlacement } from '../fhi-tooltip.component';

export const restingPosition = {
  top: -1000,
  left: -1000,
};

export const calculateTooltipPosition = ({
  tooltipReference,
  anchorReference,
  placement,
  iteration = 0,
  skipOutOfBoundsCheck = false,
}: {
  tooltipReference: HTMLElement;
  anchorReference: HTMLElement;
  placement: TooltipPlacement;
  iteration?: number;
  skipOutOfBoundsCheck?: boolean;
}): {
  top: number;
  left: number;
} => {
  console.log('Positioning tooltip', placement, iteration);

  const currentPosition = { ...restingPosition };

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
        anchorReference: anchorReference,
      });
    }
  }

  const anchorRectangle = anchorReference.getBoundingClientRect();
  const tooltipRectangle = tooltipReference.getBoundingClientRect();

  // Calculate the position of the tooltip based on the trigger position and the given placement
  switch (placement) {
    case 'top':
      currentPosition.top =
        anchorRectangle.top + window.scrollY - tooltipRectangle.height - 4;
      currentPosition.left =
        anchorRectangle.left +
        window.scrollX +
        anchorRectangle.width / 2 -
        tooltipRectangle.width / 2;
      break;
    case 'topStart':
      currentPosition.top =
        anchorRectangle.top + window.scrollY - tooltipRectangle.height - 4;
      currentPosition.left = anchorRectangle.left + window.scrollX;
      break;
    case 'topEnd':
      currentPosition.top =
        anchorRectangle.top + window.scrollY - tooltipRectangle.height - 4;
      currentPosition.left =
        anchorRectangle.right + window.scrollX - tooltipRectangle.width;
      break;

    case 'bottom':
      currentPosition.top = anchorRectangle.bottom + window.scrollY + 4;
      currentPosition.left =
        anchorRectangle.left +
        window.scrollX +
        anchorRectangle.width / 2 -
        tooltipRectangle.width / 2;
      break;
    case 'bottomStart':
      currentPosition.top = anchorRectangle.bottom + window.scrollY + 4;
      currentPosition.left = anchorRectangle.left + window.scrollX;
      break;
    case 'bottomEnd':
      currentPosition.top = anchorRectangle.bottom + window.scrollY + 4;
      currentPosition.left =
        anchorRectangle.right + window.scrollX - tooltipRectangle.width;
      break;

    case 'left':
      currentPosition.top =
        anchorRectangle.top +
        window.scrollY +
        anchorRectangle.height / 2 -
        tooltipRectangle.height / 2;
      currentPosition.left =
        anchorRectangle.left + window.scrollX - tooltipRectangle.width - 4;
      break;
    case 'leftStart':
      currentPosition.top = anchorRectangle.top + window.scrollY;
      currentPosition.left =
        anchorRectangle.left + window.scrollX - tooltipRectangle.width - 4;
      break;
    case 'leftEnd':
      currentPosition.top =
        anchorRectangle.bottom - tooltipRectangle.height + window.scrollY;
      currentPosition.left =
        anchorRectangle.left + window.scrollX - tooltipRectangle.width - 4;
      break;

    case 'right':
      currentPosition.top =
        anchorRectangle.top +
        window.scrollY +
        anchorRectangle.height / 2 -
        tooltipRectangle.height / 2;
      currentPosition.left = anchorRectangle.right + window.scrollX + 4;
      break;
    case 'rightStart':
      currentPosition.top = anchorRectangle.top + window.scrollY;
      currentPosition.left = anchorRectangle.right + window.scrollX + 4;
      break;
    case 'rightEnd':
      currentPosition.top =
        anchorRectangle.bottom + window.scrollY - tooltipRectangle.height;
      currentPosition.left = anchorRectangle.right + window.scrollX + 4;
      break;

    default:
      return calculateTooltipPosition({
        placement: 'top',
        tooltipReference,
        anchorReference,
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
          tooltipReference,
          anchorReference: anchorReference,
        });
      case placement === 'leftStart':
        return calculateTooltipPosition({
          placement: 'bottom',
          iteration: iteration + 1,
          tooltipReference,
          anchorReference: anchorReference,
        });
      case placement.startsWith('left'):
        return calculateTooltipPosition({
          placement: 'leftStart',
          iteration: iteration + 1,
          tooltipReference,
          anchorReference: anchorReference,
        });
      case placement === 'rightStart':
        return calculateTooltipPosition({
          placement: 'bottom',
          iteration: iteration + 1,
          tooltipReference,
          anchorReference: anchorReference,
        });
      case placement.startsWith('right'):
        return calculateTooltipPosition({
          placement: 'rightStart',
          iteration: iteration + 1,
          tooltipReference,
          anchorReference: anchorReference,
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
          tooltipReference,
          anchorReference: anchorReference,
        });
      case placement === 'topEnd':
        return calculateTooltipPosition({
          placement: 'left',
          iteration: iteration + 1,
          tooltipReference,
          anchorReference: anchorReference,
        });
      case placement.startsWith('top'):
        return calculateTooltipPosition({
          placement: 'topEnd',
          iteration: iteration + 1,
          tooltipReference,
          anchorReference: anchorReference,
        });
      case placement === 'bottomEnd':
        return calculateTooltipPosition({
          placement: 'left',
          iteration: iteration + 1,
          tooltipReference,
          anchorReference: anchorReference,
        });
      case placement.startsWith('bottom'):
        return calculateTooltipPosition({
          placement: 'bottomEnd',
          iteration: iteration + 1,
          tooltipReference,
          anchorReference: anchorReference,
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
          tooltipReference,
          anchorReference: anchorReference,
        });
      case placement === 'leftEnd':
        return calculateTooltipPosition({
          placement: 'top',
          iteration: iteration + 1,
          tooltipReference,
          anchorReference: anchorReference,
        });
      case placement.startsWith('left'):
        return calculateTooltipPosition({
          placement: 'leftEnd',
          iteration: iteration + 1,
          tooltipReference,
          anchorReference: anchorReference,
        });
      case placement === 'rightEnd':
        return calculateTooltipPosition({
          placement: 'top',
          iteration: iteration + 1,
          tooltipReference,
          anchorReference: anchorReference,
        });
      case placement.startsWith('right'):
        return calculateTooltipPosition({
          placement: 'rightEnd',
          iteration: iteration + 1,
          tooltipReference,
          anchorReference: anchorReference,
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
          tooltipReference,
          anchorReference: anchorReference,
        });
      case placement === 'topStart':
        return calculateTooltipPosition({
          placement: 'right',
          iteration: iteration + 1,
          tooltipReference,
          anchorReference: anchorReference,
        });
      case placement.startsWith('top'):
        return calculateTooltipPosition({
          placement: 'topStart',
          iteration: iteration + 1,
          tooltipReference,
          anchorReference: anchorReference,
        });
      case placement === 'bottomStart':
        return calculateTooltipPosition({
          placement: 'right',
          iteration: iteration + 1,
          tooltipReference,
          anchorReference: anchorReference,
        });
      case placement.startsWith('bottom'):
        return calculateTooltipPosition({
          placement: 'bottomStart',
          iteration: iteration + 1,
          tooltipReference,
          anchorReference: anchorReference,
        });
    }
  }

  // If the tooltip is not out of bounds, return the current position
  return currentPosition;
};
