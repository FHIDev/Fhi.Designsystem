import { addons } from 'storybook/manager-api';

addons.register('TitleAddon', () => {
  const setTitle = () => {
    const customTitle = document.title.replace('Storybook', 'FHI Designsystem');

    if (document.title !== customTitle) {
      document.title = customTitle;
    }
  };

  const titleElement = document.querySelector('title');

  if (titleElement) {
    const observer = new MutationObserver(setTitle);
    observer.observe(titleElement, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  setTitle();
});
