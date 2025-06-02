import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiCheckbox } from './fhi-checkbox.component';

new FhiCheckbox();

const meta: Meta<FhiCheckbox> = {
  title: 'Komponenter/Checkbox',
  component: 'fhi-checkbox',
  parameters: {},
  decorators: [],
  render: () => html`<fhi-checkbox></fhi-checkbox>`,
  argTypes: {},
};

type Story = StoryObj<FhiCheckbox>;

export const Preview: Story = {
  tags: [],
  render: () => html`
    <fhi-checkbox id="test" label="Checkbox"></fhi-checkbox>
  `,
};

export default meta;
