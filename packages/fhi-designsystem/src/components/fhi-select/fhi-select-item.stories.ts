import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiSelectItem } from './fhi-select-item.component';

import { FhiStorybookMeta } from '../../../.storybook/fhi-meta';

new FhiSelectItem();

const meta: FhiStorybookMeta<FhiSelectItem> = {
  title: 'Komponenter/SelectItem',
  component: 'fhi-select-item',
  parameters: {
    eventTypes: [],
    methodTypes: [],
    slotTypes: [
      {
        name: '-',
        description: 'Innholdet i valget. Skal være ren tekst.',
      },
    ],
  },
  decorators: [],
  render: () => html`<fhi-select-item></fhi-select-item>`,
  argTypes: {
    label: {
      control: 'text',
      description: 'Teksten som vises i valget.',
    },
    selected: {
      control: 'boolean',
      description: 'Indikerer om dette valget er valgt.',
    },
    value: {
      control: 'text',
      description:
        'Verdien til valget. Om ikke satt, vil teksten i valget brukes som verdi. Det er denne verdien som sendes med i formData',
    },
  },
};

type Story = StoryObj<FhiSelectItem>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {},
};

export default meta;
