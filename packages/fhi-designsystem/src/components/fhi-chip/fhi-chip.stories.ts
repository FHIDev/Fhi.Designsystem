import type { StoryObj } from '@storybook/web-components-vite';

import { html } from 'lit';

import { FhiChip } from './fhi-chip.component';
import { FhiFlex } from '../fhi-flex/fhi-flex.component';

import { FhiStorybookMeta } from '../../../.storybook/fhi-meta';
import { action } from 'storybook/actions';

new FhiChip();
new FhiFlex();

const meta: FhiStorybookMeta<FhiChip> = {
  title: 'Komponenter/Chip',
  component: 'fhi-chip',
  parameters: {
    eventTypes: [
      {
        name: 'click',
        description: 'Utløses når chip-en klikkes.',
      },
    ],
    slotTypes: [
      {
        description: 'Tekstinnholdet som vises i chip-en.',
      },
    ],
  },
  decorators: [],
  render: () => html`<fhi-chip @click=${action('click')}>Chip</fhi-chip>`,
  argTypes: {},
};

type Story = StoryObj<FhiChip>;

export const Preview: Story = {
  tags: [],
  args: {},
};

export const Multiple: Story = {
  tags: ['!dev'],
  render: () =>
    html`<fhi-flex gap="small" wrap>
      <fhi-chip>Kategori</fhi-chip>
      <fhi-chip>Publisert</fhi-chip>
      <fhi-chip>2024</fhi-chip>
    </fhi-flex>`,
};

export default meta;
