import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';

import { html } from 'lit';
import { FhiTextInput } from './fhi-text-input';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
FhiTextInput;

const meta: Meta<FhiTextInput> = {
  title: 'Komponenter/Text Input',
  component: 'fhi-text-input',
  parameters: {
    actions: {
      handles: ['change', 'input'],
    },
  },
  decorators: [withActions],
  render: () => html`<fhi-text-input label="hello"></fhi-text-input>`,
};

type Story = StoryObj<FhiTextInput>;

export const Default: Story = {};

export default meta;
