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
} => {
  const position = { ...restingPosition };

  console.log('Calculating tooltip position', placement, iteration);

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
        tooltipRect,
        anchorRect,
      });
    }
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
      return calculateTooltipPosition({
        placement: 'top',
        tooltipRect,
        anchorRect,
      });
  }

  if (skipOutOfBoundsCheck) {
    return position;
  }

  // Check if the tooltip is out of bounds and recursively find a new position if so.

  // Top
  if (position.top < 0) {
    switch (true) {
      case placement.startsWith('top'):
        return calculateTooltipPosition({
          placement: 'bottom',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
      case placement === 'leftStart':
        return calculateTooltipPosition({
          placement: 'bottom',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
      case placement.startsWith('left'):
        return calculateTooltipPosition({
          placement: 'leftStart',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
      case placement === 'rightStart':
        return calculateTooltipPosition({
          placement: 'bottom',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
      case placement.startsWith('right'):
        return calculateTooltipPosition({
          placement: 'rightStart',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
    }
  }

  // Right
  if (position.left + tooltipRect.width > window.innerWidth) {
    switch (true) {
      case placement.startsWith('right'):
        return calculateTooltipPosition({
          placement: 'left',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
      case placement === 'topEnd':
        return calculateTooltipPosition({
          placement: 'left',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
      case placement.startsWith('top'):
        return calculateTooltipPosition({
          placement: 'topEnd',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
      case placement === 'bottomEnd':
        return calculateTooltipPosition({
          placement: 'left',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
      case placement.startsWith('bottom'):
        return calculateTooltipPosition({
          placement: 'bottomEnd',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
    }
  }

  // Bottom
  if (position.top + tooltipRect.height > window.innerHeight) {
    switch (true) {
      case placement.startsWith('bottom'):
        return calculateTooltipPosition({
          placement: 'top',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
      case placement === 'leftEnd':
        return calculateTooltipPosition({
          placement: 'top',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
      case placement.startsWith('left'):
        return calculateTooltipPosition({
          placement: 'leftEnd',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
      case placement === 'rightEnd':
        return calculateTooltipPosition({
          placement: 'top',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
      case placement.startsWith('right'):
        return calculateTooltipPosition({
          placement: 'rightEnd',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
    }
  }

  // Left
  if (position.left < 0) {
    switch (true) {
      case placement.startsWith('left'):
        return calculateTooltipPosition({
          placement: 'right',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
      case placement === 'topEnd':
        return calculateTooltipPosition({
          placement: 'right',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
      case placement.startsWith('top'):
        return calculateTooltipPosition({
          placement: 'topEnd',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
      case placement === 'bottomStart':
        return calculateTooltipPosition({
          placement: 'right',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
      case placement.startsWith('bottom'):
        return calculateTooltipPosition({
          placement: 'bottomStart',
          iteration: iteration + 1,
          tooltipRect,
          anchorRect,
        });
    }
  }

  return position;
};

export const getOverflowAncestors = (
  element: HTMLElement,
): (HTMLElement | Window)[] => {
  const overflowAncestors: (HTMLElement | Window)[] = [];

  let parent = element.parentElement;

  while (parent) {
    if (isOverflowElement(parent)) {
      overflowAncestors.push(parent);
    }
    parent = parent.parentElement;
  }

  overflowAncestors.push(window);

  return overflowAncestors;
};

function isOverflowElement(element: Element): boolean {
  const { overflow, overflowX, overflowY, display } =
    window.getComputedStyle(element);
  return (
    /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) &&
    !['inline', 'contents'].includes(display)
  );
}
