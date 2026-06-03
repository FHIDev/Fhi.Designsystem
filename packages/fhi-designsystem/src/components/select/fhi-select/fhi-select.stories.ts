import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiSelect } from './fhi-select.component';
import { FhiSelectItem } from '../fhi-select-item/fhi-select-item.component';

import { FhiStorybookMeta } from '../../../../.storybook/fhi-meta';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiSelect();
new FhiSelectItem();

const meta: FhiStorybookMeta<FhiSelect> = {
  title: 'Komponenter/Select',
  component: 'fhi-select',
  parameters: {
    eventTypes: [
      {
        name: 'change',
        valueLocation: ['event.target.value'],
        description: 'Emitted when the selected option changes.',
      },
      {
        name: 'input',
        valueLocation: ['event.target.value'],
        description: 'Emitted when the selected option changes.',
      },
    ],
    methodTypes: [],
    slotTypes: [
      {
        name: '-',
        description:
          'Innholdet i select-elementet. Dette skal være <fhi-select-item>-elementer som representerer de ulike valgene i select-elementet.',
      },
    ],
  },
  decorators: [],
  render: args =>
    html`<fhi-select
      name=${args.name}
      label=${args.label}
      ?disabled=${args.disabled}
      status=${ifDefined(args.status)}
      message=${ifDefined(args.message)}
    >
      <fhi-select-item>Velg Alternativ</fhi-select-item>
      <fhi-select-item>Norge</fhi-select-item>
      <fhi-select-item>Sverige</fhi-select-item>
      <fhi-select-item>Danmark</fhi-select-item>
    </fhi-select>`,
  argTypes: {
    name: {
      control: 'text',
      description:
        'Setter navn på inputfeltet. Dette brukes typisk av assosierte form-elementer for å identifisere feltet i FormData.',
    },
    label: {
      control: 'text',
      description:
        'Setter label. Dette assosieres med select-elementet og vises over. Om dette er satt trenger du ikke å deklarere eget label-element.',
    },
    disabled: {
      control: 'boolean',
      description: 'Bestemmer om bruker kan samhandle med feltet.',
    },
    status: {
      control: 'select',
      options: ['error', undefined],
      description:
        'Bestemmer om feltet har en status. Dette vil endre utseende på feltet.',
    },
    message: {
      control: 'text',
      description:
        'Vises under select-elementet. Brukes til å gi veiledning til brukeren. Brukes blant annet ved Error for å forklare hva som mangler eller må justeres.',
    },
  },
};

type Story = StoryObj<FhiSelect>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {
    name: 'my-select',
    label: 'Land',
    disabled: false,
    status: undefined,
    message: 'Dette er en valideringsmelding',
  },
};

export const Error: Story = {
  tags: [],
  args: {
    name: 'my-select',
    label: 'Land',
    disabled: false,
    status: 'error',
    message: 'Dette er en valideringsmelding',
  },
};

export const Disabled: Story = {
  tags: [],
  args: {
    name: 'my-select',
    label: 'Land',
    disabled: true,
    status: undefined,
    message: 'Dette er en valideringsmelding',
  },
};
export default meta;
