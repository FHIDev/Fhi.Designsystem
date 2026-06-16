import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiSelect } from './fhi-select.component';
import { FhiSelectItem } from '../fhi-select-item/fhi-select-item.component';

import { FhiStorybookMeta } from '../../../../.storybook/fhi-meta';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FhiBody } from '../../typography/fhi-body/fhi-body.component';
import { FhiFlex } from '../../fhi-flex/fhi-flex.component';

new FhiSelect();
new FhiSelectItem();

new FhiBody();
new FhiFlex();

const meta: FhiStorybookMeta<FhiSelect> = {
  title: 'Komponenter/Select',
  component: 'fhi-select',
  parameters: {
    eventTypes: [
      {
        name: 'change',
        valueLocation: ['event.target.value'],
        description: 'Blir utløst når det valgte alternativet endres.',
      },
      {
        name: 'input',
        valueLocation: ['event.target.value'],
        description: 'Blir utløst når det valgte alternativet endres.',
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
      status=${ifDefined(args.status)}
      message=${ifDefined(args.message)}
      help-text=${ifDefined(args.helpText)}
      ?disabled=${args.disabled}
    >
      <fhi-select-item>Velg alternativ</fhi-select-item>
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
    helpText: {
      control: 'text',
      description:
        'Vises mellom label og select-elementet. Brukes til å gi utvidede forklaringer eller hjelpsomme hint til utfylling.',
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
    message: 'Dette er en valideringsmelding',
    helpText: 'Dette er hjelpeteksten',
  },
};

export const Error: Story = {
  tags: [],
  args: {
    name: 'my-select',
    label: 'Land',
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
    message: 'Dette er en valideringsmelding',
  },
};

export const WithValue: Story = {
  tags: ['!dev'],
  render: args =>
    html`<fhi-select
      name=${args.name}
      label=${args.label}
      ?disabled=${args.disabled}
      status=${ifDefined(args.status)}
      message=${ifDefined(args.message)}
    >
      <fhi-select-item value="">Velg alternativ</fhi-select-item>
      <fhi-select-item value="1">Volvo</fhi-select-item>
      <fhi-select-item value="2">X-Peng</fhi-select-item>
      <fhi-select-item value="3">Mercedes</fhi-select-item>
    </fhi-select>`,
  args: {
    name: 'my-car-select',
    label: 'Bilmerke',
  },
};

export const WithLabel: Story = {
  tags: ['!dev'],
  render: args =>
    html`<fhi-select
      name=${args.name}
      label=${args.label}
      ?disabled=${args.disabled}
      status=${ifDefined(args.status)}
      message=${ifDefined(args.message)}
    >
      <fhi-select-item value="" label="Velg alternativ"></fhi-select-item>
      <fhi-select-item
        value="Kinesisk"
        label="Mapo Tofu – 麻婆豆腐"
      ></fhi-select-item>
      <fhi-select-item
        value="Italiensk"
        label="Tagliatelle (al Ragù) Bolognese"
      ></fhi-select-item>
      <fhi-select-item
        value="Japansk"
        label="Shoyu Ramen - 醤油ラーメン"
      ></fhi-select-item>
    </fhi-select>`,
  args: {
    name: 'my-dinner-select',
    label: 'Favorittmiddag',
  },
};

export const Pagination: Story = {
  tags: ['!dev'],
  render: args => html`
    <fhi-flex gap="small" align="center">
      <fhi-select
        name=${args.name}
        label=${ifDefined(args.label)}
        ?disabled=${args.disabled}
        status=${ifDefined(args.status)}
        message=${ifDefined(args.message)}
        aria-label="Velg side"
      >
        <fhi-select-item>1</fhi-select-item>
        <fhi-select-item>2</fhi-select-item>
        <fhi-select-item>3</fhi-select-item>
      </fhi-select>
      <fhi-body>av 3</fhi-body>
    </fhi-flex>
  `,
  args: {
    name: 'my-pagination-select',
  },
};

export default meta;
