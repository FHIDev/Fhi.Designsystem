import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiTag } from './fhi-tag.component';

new FhiTag();

const meta: Meta<FhiTag> = {
  title: 'Komponenter/Tag',
  component: 'fhi-tag',
  parameters: {},
  decorators: [],
  render: () => html`<fhi-tag>hi</fhi-tag>`,
  argTypes: {},
};

type Story = StoryObj<FhiTag>;

export const Preview: Story = {
  tags: [],
  args: {},
};

export default meta;
