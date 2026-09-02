import type { Preview } from '@storybook/web-components-vite';

import FhiTheme from './FhiTheme';

import '../src/theme/default.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Oversikt',
          'Kom i gang',
          'KI-verktøy',
          'Komponenter',
          ['*', ['Docs', 'Body', 'Label', 'Display', 'Headline', 'Title']],
          'Design Tokens',
          ['Introduksjon'],
          'Ofte stilte spørsmål',
        ],
      },
    },
    designToken: {
      disable: true,
    },
    docs: {
      theme: FhiTheme,
    },
  },
};

export default preview;
