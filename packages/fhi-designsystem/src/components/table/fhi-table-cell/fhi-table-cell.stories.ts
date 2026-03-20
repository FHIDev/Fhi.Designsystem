import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiTableCell } from './fhi-table-cell.component';
import { ifDefined } from 'lit/directives/if-defined.js';

import { FhiStorybookMeta } from '../../../../.storybook/fhi-meta';

new FhiTableCell();

const meta: FhiStorybookMeta<FhiTableCell> = {
  title: 'Komponenter/Table/Cell',
  component: 'fhi-table-cell',
  parameters: {
    slotTypes: [
      {
        name: '-',
        description:
          'Innholdet i cellen. Kan være tekst eller andre HTML-elementer.',
      },
    ],
  },
  decorators: [],
  render: args =>
    html`<fhi-table-cell variant="${ifDefined(args.variant)}">
      374 964
    </fhi-table-cell>`,
  argTypes: {
    variant: {
      control: 'select',
      options: ['header', 'body'],
      description:
        'Definerer om cellen er en header eller body celle. Når fhi-table-cell brukes i en header fhi-table-row, vil variant automatisk bli satt til header.',
      defaultValue: { summary: 'body' },
    },
  },
};

type Story = StoryObj<FhiTableCell>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {},
};

export default meta;
