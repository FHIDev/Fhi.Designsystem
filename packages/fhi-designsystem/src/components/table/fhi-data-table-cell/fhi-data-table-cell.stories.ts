import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiDataTableCell } from './fhi-data-table-cell.component';
import { ifDefined } from 'lit/directives/if-defined.js';

import { FhiStorybookMeta } from '../../../../.storybook/fhi-meta';

new FhiDataTableCell();

const meta: FhiStorybookMeta<FhiDataTableCell> = {
  title: 'Komponenter/Table/Cell',
  component: 'fhi-data-table-cell',
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
    html`<fhi-data-table-cell variant="${ifDefined(args.variant)}">
      374 964
    </fhi-data-table-cell>`,
  argTypes: {
    variant: {
      control: 'select',
      options: ['header', 'body'],
      description:
        'Definerer om cellen er en header eller body celle. Når <fhi-data-table-cell> brukes i en header <fhi-data-table-row>, vil variant automatisk bli satt til header.',
      defaultValue: { summary: 'body' },
    },
  },
};

type Story = StoryObj<FhiDataTableCell>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {},
};

export default meta;
