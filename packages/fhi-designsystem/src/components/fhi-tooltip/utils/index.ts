import { TooltipPlacement } from '../fhi-tooltip.component';

export const restingPosition = {
  top: 0,
  left: 0,
};

// maybe this whole file can be replaced with https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning in the future
export const calculateTooltipPosition = ({
  tooltipRect,
  anchorRect,
  placement,
  iteration = 0,
  skipOutOfBoundsCheck = false,
}: {
  tooltipRect: DOMRect;
  anchorRect: DOMRect;
  placement: TooltipPlacement;
  iteration?: number;
  skipOutOfBoundsCheck?: boolean;
}): {
  top: number;
  left: number;
} | null => {
  const position = { ...restingPosition };

  console.log('Calculating tooltip position', placement, iteration);

  /*
    If the tooltip is out of the viewport, and we could not find a valid position
    after 4 iterations, we return null to indicate that there are no available position.
  */
  if (iteration > 3) {
    return null;
  }

  // Calculate the position of the tooltip based on the trigger position and the given placement
  switch (placement) {
    case 'top':
      position.top = anchorRect.top - tooltipRect.height - 4;
      position.left =
        anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
      break;
    case 'topStart':
      position.top = anchorRect.top - tooltipRect.height - 4;
      position.left = anchorRect.left;
      break;
    case 'topEnd':
      position.top = anchorRect.top - tooltipRect.height - 4;
      position.left = anchorRect.right - tooltipRect.width;
      break;

    case 'bottom':
      position.top = anchorRect.bottom + 4;
      position.left =
        anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
      break;
    case 'bottomStart':
      position.top = anchorRect.bottom + 4;
      position.left = anchorRect.left;
      break;
    case 'bottomEnd':
      position.top = anchorRect.bottom + 4;
      position.left = anchorRect.right - tooltipRect.width;
      break;

    case 'left':
      position.top =
        anchorRect.top + anchorRect.height / 2 - tooltipRect.height / 2;
      position.left = anchorRect.left - tooltipRect.width - 4;
      break;
    case 'leftStart':
      position.top = anchorRect.top;
      position.left = anchorRect.left - tooltipRect.width - 4;
      break;
    case 'leftEnd':
      position.top = anchorRect.bottom - tooltipRect.height;
      position.left = anchorRect.left - tooltipRect.width - 4;
      break;

    case 'right':
      position.top =
        anchorRect.top + anchorRect.height / 2 - tooltipRect.height / 2;
      position.left = anchorRect.right + 4;
      break;
    case 'rightStart':
      position.top = anchorRect.top;
      position.left = anchorRect.right + 4;
      break;
    case 'rightEnd':
      position.top = anchorRect.bottom - tooltipRect.height;
      position.left = anchorRect.right + 4;
      break;

    default:
      throw new Error(`Invalid placement: ${placement}`);
  }

  if (skipOutOfBoundsCheck) {
    return position;
  }

  // Check if the tooltip is out of bounds and recursively find a new position if so.

  const calculateNextTooltipPosition = (
    intersectionDirection: 'top' | 'right' | 'bottom' | 'left',
  ) => {
    return calculateTooltipPosition({
      placement: getNextPlacement(placement, intersectionDirection),
      iteration: iteration + 1,
      tooltipRect,
      anchorRect,
    });
  };

  if (position.top < 0) {
    return calculateNextTooltipPosition('top');
  }

  if (position.left + tooltipRect.width > window.innerWidth) {
    return calculateNextTooltipPosition('right');
  }

  if (position.top + tooltipRect.height > window.innerHeight) {
    return calculateNextTooltipPosition('bottom');
  }

  if (position.left < 0) {
    return calculateNextTooltipPosition('left');
  }

  return position;
};

const getNextPlacement = (
  placement: TooltipPlacement,
  intersectionDirection: 'top' | 'right' | 'bottom' | 'left',
): TooltipPlacement => {
  switch (intersectionDirection) {
    case 'top':
      switch (placement) {
        case 'top':
        case 'rightEnd':
        case 'leftEnd':
          return 'bottom';
        case 'topStart':
          return 'bottomStart';
        case 'topEnd':
          return 'bottomEnd';
        case 'rightStart':
          return 'right';
        case 'leftStart':
          return 'left';
        case 'left':
          return 'leftEnd';
        case 'right':
          return 'rightEnd';
        default:
          return 'bottom';
      }
    case 'right':
      switch (placement) {
        case 'top':
          return 'topStart';
        case 'topStart':
          return 'left';
        case 'topEnd':
          return 'top';
        case 'bottom':
          return 'bottomStart';
        case 'bottomStart':
          return 'left';
        case 'bottomEnd':
          return 'bottom';
        case 'right':
          return 'left';
        case 'rightStart':
          return 'leftStart';
        case 'rightEnd':
          return 'leftEnd';
        default:
          return 'left';
      }
    case 'bottom':
      switch (placement) {
        case 'bottomStart':
          return 'topStart';
        case 'bottomEnd':
          return 'topEnd';
        case 'left':
          return 'leftStart';
        case 'leftEnd':
          return 'left';
        case 'right':
          return 'rightStart';
        case 'rightEnd':
          return 'right';
        case 'bottom':
        case 'leftStart':
        case 'rightStart':
        default:
          return 'top';
      }
    case 'left':
      switch (placement) {
        case 'top':
          return 'topEnd';
        case 'topStart':
          return 'top';
        case 'topEnd':
          return 'right';
        case 'bottom':
          return 'bottomEnd';
        case 'bottomStart':
          return 'bottom';
        case 'bottomEnd':
          return 'right';
        case 'left':
          return 'right';
        case 'leftStart':
          return 'rightStart';
        case 'leftEnd':
          return 'rightEnd';
        default:
          return 'right';
      }
    default:
      return 'top';
  }
};
