import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiTableCell } from './fhi-table-cell.component';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiTableCell();

const meta: Meta<FhiTableCell> = {
  title: 'Komponenter/Table/Cell',
  component: 'fhi-table-cell',
  parameters: {},
  decorators: [],
  render: args =>
    html`<fhi-table-cell variant="${ifDefined(args.variant)}">
      374 964
    </fhi-table-cell>`,
  argTypes: {
    variant: {
      control: 'select',
      options: ['header', 'body'],
      description: 'Definerer om cellen er en header eller body celle',
      defaultValue: { summary: 'body' },
    },
  },
};

type Story = StoryObj<FhiTableCell>;

export const Preview: Story = {
  tags: [],
  args: {},
};

export default meta;
