import type { Preview } from '@storybook/web-components';
import FhiTheme from './FhiTheme';

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
        order: [
          'Oversikt',
          'Kom i gang',
          'Komponenter',
          [
            '*',
            'Typography',
            ['Docs', 'Body', 'Label', 'Display', 'Headline', 'Title'],
          ],
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
