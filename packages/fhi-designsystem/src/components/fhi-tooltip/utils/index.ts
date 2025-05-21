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

  // Calculate the position of the tooltip based on the anchor position and the given placement
  switch (placement) {
    case 'top':
      position.top = anchorRect.top - tooltipRect.height - 4;
      position.left =
        anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
      break;
    case 'top-start':
      position.top = anchorRect.top - tooltipRect.height - 4;
      position.left = anchorRect.left;
      break;
    case 'top-end':
      position.top = anchorRect.top - tooltipRect.height - 4;
      position.left = anchorRect.right - tooltipRect.width;
      break;

    case 'bottom':
      position.top = anchorRect.bottom + 4;
      position.left =
        anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
      break;
    case 'bottom-start':
      position.top = anchorRect.bottom + 4;
      position.left = anchorRect.left;
      break;
    case 'bottom-end':
      position.top = anchorRect.bottom + 4;
      position.left = anchorRect.right - tooltipRect.width;
      break;

    case 'left':
      position.top =
        anchorRect.top + anchorRect.height / 2 - tooltipRect.height / 2;
      position.left = anchorRect.left - tooltipRect.width - 4;
      break;
    case 'left-start':
      position.top = anchorRect.top;
      position.left = anchorRect.left - tooltipRect.width - 4;
      break;
    case 'left-end':
      position.top = anchorRect.bottom - tooltipRect.height;
      position.left = anchorRect.left - tooltipRect.width - 4;
      break;

    case 'right':
      position.top =
        anchorRect.top + anchorRect.height / 2 - tooltipRect.height / 2;
      position.left = anchorRect.right + 4;
      break;
    case 'right-start':
      position.top = anchorRect.top;
      position.left = anchorRect.right + 4;
      break;
    case 'right-end':
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
        case 'right-end':
        case 'left-end':
          return 'bottom';
        case 'top-start':
          return 'bottom-start';
        case 'top-end':
          return 'bottom-end';
        case 'right-start':
          return 'right';
        case 'left-start':
          return 'left';
        case 'left':
          return 'left-end';
        case 'right':
          return 'right-end';
        default:
          return 'bottom';
      }
    case 'right':
      switch (placement) {
        case 'top':
          return 'top-start';
        case 'top-start':
          return 'left';
        case 'top-end':
          return 'top';
        case 'bottom':
          return 'bottom-start';
        case 'bottom-start':
          return 'left';
        case 'bottom-end':
          return 'bottom';
        case 'right':
          return 'left';
        case 'right-start':
          return 'left-start';
        case 'right-end':
          return 'left-end';
        default:
          return 'left';
      }
    case 'bottom':
      switch (placement) {
        case 'bottom-start':
          return 'top-start';
        case 'bottom-end':
          return 'top-end';
        case 'left':
          return 'left-start';
        case 'left-end':
          return 'left';
        case 'right':
          return 'right-start';
        case 'right-end':
          return 'right';
        case 'bottom':
        case 'left-start':
        case 'right-start':
        default:
          return 'top';
      }
    case 'left':
      switch (placement) {
        case 'top':
          return 'top-end';
        case 'top-start':
          return 'top';
        case 'top-end':
          return 'right';
        case 'bottom':
          return 'bottom-end';
        case 'bottom-start':
          return 'bottom';
        case 'bottom-end':
          return 'right';
        case 'left':
          return 'right';
        case 'left-start':
          return 'right-start';
        case 'left-end':
          return 'right-end';
        default:
          return 'right';
      }
    default:
      return 'top';
  }
};
