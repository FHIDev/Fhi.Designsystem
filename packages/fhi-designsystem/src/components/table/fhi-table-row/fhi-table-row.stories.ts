import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiTableRow } from './fhi-table-row.component';

import { FhiStorybookMeta } from '../../../../.storybook/fhi-meta';

new FhiTableRow();

const meta: FhiStorybookMeta<FhiTableRow> = {
  title: 'Komponenter/Table/Row',
  component: 'fhi-table-row',
  parameters: {
    slotTypes: [
      {
        name: '-',
        description:
          'Alle celler i raden. Bruk <fhi-table-cell> for å definere celler i raden.',
      },
    ],
  },
  decorators: [],
  render: () => html`<fhi-table-row></fhi-table-row>`,
  argTypes: {
    variant: {
      control: 'select',
      options: ['header', 'body'],
      description:
        'Definerer om raden er en header-rad eller en vanlig rad. Header-rader har en annen stil og brukes for å definere kolonneoverskrifter. Alle <fhi-table-cell> elementer i en header <fhi-table-row> vil automatisk få variant satt til header.',
      defaultValue: { summary: 'body' },
    },
  },
};

type Story = StoryObj<FhiTableRow>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {},
};

export default meta;
