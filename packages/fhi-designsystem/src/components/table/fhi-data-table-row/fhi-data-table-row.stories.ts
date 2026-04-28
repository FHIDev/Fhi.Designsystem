import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiDataTableRow } from './fhi-data-table-row.component';

import { FhiStorybookMeta } from '../../../../.storybook/fhi-meta';

new FhiDataTableRow();

const meta: FhiStorybookMeta<FhiDataTableRow> = {
  title: 'Komponenter/Table/Row',
  component: 'fhi-data-table-row',
  parameters: {
    slotTypes: [
      {
        name: '-',
        description:
          'Alle celler i raden. Bruk <fhi-data-table-cell> for å definere celler i raden.',
      },
    ],
  },
  decorators: [],
  render: () => html`<fhi-data-table-row></fhi-data-table-row>`,
  argTypes: {
    variant: {
      control: 'select',
      options: ['header', 'body'],
      description:
        'Definerer om raden er en header-rad eller en vanlig rad. Header-rader har en annen stil og brukes for å definere kolonneoverskrifter. Alle <fhi-data-table-cell> elementer i en header <fhi-data-table-row> vil automatisk få variant satt til header.',
      defaultValue: { summary: 'body' },
    },
  },
};

type Story = StoryObj<FhiDataTableRow>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {},
};

export default meta;
