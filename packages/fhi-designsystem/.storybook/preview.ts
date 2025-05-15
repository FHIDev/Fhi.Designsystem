import type { Preview } from '@storybook/web-components';

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
        order: ['Kom i gang', '*', 'Ikoner', 'Design Tokens', ['Introduksjon']],
      },
    },
    designToken: {
      disable: true,
    },
  },
};

export default preview;
