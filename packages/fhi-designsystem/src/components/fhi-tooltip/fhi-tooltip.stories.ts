import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiTooltip } from './fhi-tooltip.component';

new FhiTooltip();

const meta: Meta<FhiTooltip> = {
  title: 'Komponenter/Tooltip',
  component: 'fhi-tooltip',
  parameters: {},
  decorators: [],
  render: () => html`<fhi-tooltip></fhi-tooltip>`,
  argTypes: {},
};

type Story = StoryObj<FhiTooltip>;

export const Preview: Story = {
  tags: [],
  args: {},
};

export default meta;
