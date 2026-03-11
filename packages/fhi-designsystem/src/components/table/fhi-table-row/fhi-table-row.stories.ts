import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiTableRow } from './fhi-table-row.component';

new FhiTableRow();

const meta: Meta<FhiTableRow> = {
  title: 'Komponenter/Table/Row',
  component: 'fhi-table-row',
  parameters: {},
  decorators: [],
  render: () => html`<fhi-table-row></fhi-table-row>`,
  argTypes: {},
};

type Story = StoryObj<FhiTableRow>;

export const Preview: Story = {
  tags: [],
  args: {},
};

export default meta;
