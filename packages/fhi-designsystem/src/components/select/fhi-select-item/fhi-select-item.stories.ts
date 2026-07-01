import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiSelectItem } from './fhi-select-item.component';

import { FhiStorybookMeta } from '../../../../.storybook/fhi-meta';

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
        description:
          'Innholdet som vises i valget. Skal være ren tekst. Dette blir overskrevet av `label`-attributten om den er satt.',
      },
    ],
  },
  decorators: [],
  render: () => html`<fhi-select-item></fhi-select-item>`,
  argTypes: {
    label: {
      control: 'text',
      description:
        'Teksten som vises i valget. Om ikke satt, vil innholdet i `value` brukes.',
    },
    selected: {
      control: 'boolean',
      description: 'Indikerer om dette valget er valgt.',
    },
    value: {
      control: 'text',
      description:
        'Verdien til valget som blir sendt med i formData. Om ikke satt, vil tekst innholdet brukes som verdi.',
    },
  },
};

type Story = StoryObj<FhiSelectItem>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {},
};

export default meta;
