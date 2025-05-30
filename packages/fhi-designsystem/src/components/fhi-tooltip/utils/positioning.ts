import { TooltipPlacement } from '../fhi-tooltip.component';

export const restingPosition = {
  top: 0,
  left: 0,
};

/**
 * @param options.tooltipRect - The bounding rectangle of the tooltip element.
 * @param options.anchorRect - The bounding rectangle of the anchor element.
 * @param options.placement - The placement of the tooltip relative to the anchor element.
 * @param options.recursiveInteration - The number of recursive iterations to find a valid position.
 * @param options.skipOutOfBoundsCheck - Whether to skip the out-of-bounds check.
 * @returns the appropriate position for the tooltip or null if no valid position is found.
 *
 * Investigate replacing this with anchor and fallback positioning when they are out of experimental and adopted by all relevant browsers.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning
 * https://developer.mozilla.org/en-US/docs/Web/CSS/position-try-fallbacks
 */
export const calculateTooltipPosition = ({
  tooltipRect,
  anchorRect,
  placement,
  recursiveInteration = 0,
  skipOutOfBoundsCheck = false,
}: {
  tooltipRect: DOMRect;
  anchorRect: DOMRect;
  placement: TooltipPlacement;
  recursiveInteration?: number;
  skipOutOfBoundsCheck?: boolean;
}): {
  top: number;
  left: number;
} | null => {
  const position = { ...restingPosition };

  /*
    If the tooltip is out of the viewport, and we could not find a valid position
    after 4 iterations, we return null to indicate that there are no available position.
  */
  if (recursiveInteration > 3) {
    return null;
  }

  const viewportOffsetLeft = window.visualViewport?.offsetLeft || 0;
  const viewportOffsetTop = window.visualViewport?.offsetTop || 0;
  const viewportWidth = window.visualViewport?.width || window.innerWidth;
  const viewportHeight = window.visualViewport?.height || window.innerHeight;

  // Webkit browsers (like Safari) require special handling for the viewport offset.
  const isWebkit = isWebKit();

  const webkitOffsetLeft = isWebkit ? viewportOffsetLeft : 0;
  const webkitOffsetTop = isWebkit ? viewportOffsetTop : 0;

  // Calculate the position of the tooltip based on the anchor position and the given placement
  switch (placement) {
    case 'top':
      position.top = anchorRect.top - tooltipRect.height - 4 + webkitOffsetTop;
      position.left =
        anchorRect.left +
        anchorRect.width / 2 -
        tooltipRect.width / 2 +
        webkitOffsetLeft;
      break;
    case 'top-start':
      position.top = anchorRect.top - tooltipRect.height - 4 + webkitOffsetTop;
      position.left = anchorRect.left + webkitOffsetLeft;
      break;
    case 'top-end':
      position.top = anchorRect.top - tooltipRect.height - 4 + webkitOffsetTop;
      position.left = anchorRect.right - tooltipRect.width + webkitOffsetLeft;
      break;

    case 'bottom':
      position.top = anchorRect.bottom + 4 + webkitOffsetTop;
      position.left =
        anchorRect.left +
        anchorRect.width / 2 -
        tooltipRect.width / 2 +
        webkitOffsetLeft;
      break;
    case 'bottom-start':
      position.top = anchorRect.bottom + 4 + webkitOffsetTop;
      position.left = anchorRect.left + webkitOffsetLeft;
      break;
    case 'bottom-end':
      position.top = anchorRect.bottom + 4 + webkitOffsetTop;
      position.left = anchorRect.right - tooltipRect.width + webkitOffsetLeft;
      break;

    case 'left':
      position.top =
        anchorRect.top +
        anchorRect.height / 2 -
        tooltipRect.height / 2 +
        webkitOffsetTop;
      position.left =
        anchorRect.left - tooltipRect.width - 4 + webkitOffsetLeft;
      break;
    case 'left-start':
      position.top = anchorRect.top + webkitOffsetTop;
      position.left =
        anchorRect.left - tooltipRect.width - 4 + webkitOffsetLeft;
      break;
    case 'left-end':
      position.top = anchorRect.bottom - tooltipRect.height + webkitOffsetTop;
      position.left =
        anchorRect.left - tooltipRect.width - 4 + webkitOffsetLeft;
      break;

    case 'right':
      position.top =
        anchorRect.top +
        anchorRect.height / 2 -
        tooltipRect.height / 2 +
        webkitOffsetTop;
      position.left = anchorRect.right + 4 + webkitOffsetLeft;
      break;
    case 'right-start':
      position.top = anchorRect.top + webkitOffsetTop;
      position.left = anchorRect.right + 4 + webkitOffsetLeft;
      break;
    case 'right-end':
      position.top = anchorRect.bottom - tooltipRect.height + webkitOffsetTop;
      position.left = anchorRect.right + 4 + webkitOffsetLeft;
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
      recursiveInteration: recursiveInteration + 1,
      tooltipRect,
      anchorRect,
    });
  };

  if (position.top < viewportOffsetTop) {
    return calculateNextTooltipPosition('top');
  }

  if (position.left + tooltipRect.width > viewportWidth + viewportOffsetLeft) {
    return calculateNextTooltipPosition('right');
  }

  if (position.top + tooltipRect.height > viewportHeight + viewportOffsetTop) {
    return calculateNextTooltipPosition('bottom');
  }

  if (position.left < viewportOffsetLeft) {
    return calculateNextTooltipPosition('left');
  }

  return position;
};

/*
  This function is used to determine the next placement of the tooltip based on the
  current placement and the direction of intersection with the viewport.
 */
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

// Inspired by Floating UI's solution: 26.05.25 - https://github.com/floating-ui/floating-ui/blob/master/packages/dom/src/utils/getVisualOffsets.ts#L10
// Check if the browser is WebKit (Safari, iOS Safari, etc.), but not Chrome which is using Blink but is still identified as AppleWebKit.
const isWebKit = () =>
  /AppleWebKit/.test(navigator.userAgent) &&
  !/Chrome/.test(navigator.userAgent);

/**
 * Returns all scrollable ancestors of an element (including window and VisualViewport, but excluding the <body> and documentElement).
 * The function traverses through Shadow DOM boundaries.
 *
 * Investigate replacing this with anchor and fallback positioning when they are out of experimental and adopted by all relevant browsers.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning
 * https://developer.mozilla.org/en-US/docs/Web/CSS/position-try-fallbacks
 */
export const getOverflowAncestors = (element: Element) => {
  const ancestors: (Element | Window | VisualViewport)[] = [];

  if (!window || !element || !(element instanceof Element)) {
    return ancestors;
  }

  const isScrollable = (element: Element) => {
    const style = window.getComputedStyle(element);

    // 23.05.25 - https://github.com/floating-ui/floating-ui/blob/master/packages/utils/src/dom.ts
    return (
      /auto|scroll|overlay|hidden|clip/.test(
        style.overflow + style.overflowY + style.overflowX,
      ) && !['inline', 'contents'].includes(style.display)
    );
  };

  const getRoot = (node: Node) =>
    node instanceof ShadowRoot ? node.host : node;

  let currentElement: Node = element;
  while (
    currentElement !== document.body &&
    currentElement !== document.documentElement
  ) {
    if (currentElement instanceof Element && isScrollable(currentElement)) {
      ancestors.push(currentElement);
    }

    if (!currentElement.parentNode) {
      break;
    }

    currentElement = getRoot(currentElement.parentNode);
  }

  ancestors.push(window);

  if (window.visualViewport) {
    ancestors.push(window.visualViewport);
  }

  return ancestors;
};
