/**
 * Check if the browser is Safari
 * @returns `true` if the browser is Safari
 */
const isSafari = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

export { isSafari };
