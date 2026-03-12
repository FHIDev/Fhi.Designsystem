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
  argTypes: {
    columns: {
      control: 'text',
      description:
        'Definerer kolonneoppsettet for raden. Bruk CSS grid-template-columns format, f.eks. "1fr 2fr 1fr".',
      defaultValue: { summary: '1fr' },
    },
    variant: {
      control: 'select',
      options: ['header', 'body'],
      description:
        'Definerer om raden er en header-rad eller en vanlig rad. Header-rader har en annen stil og brukes for å definere kolonneoverskrifter.',
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
