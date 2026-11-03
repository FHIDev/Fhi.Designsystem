import type { StoryObj } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { FhiStorybookMeta } from '../../../.storybook/fhi-meta';
import { FhiTimeInput } from './fhi-time-input.component';

new FhiTimeInput();

const meta: FhiStorybookMeta<FhiTimeInput> = {
  title: 'Komponenter/Time Input',
  component: 'fhi-time-input',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
    eventTypes: [
      {
        name: 'change',
        description:
          'Blir utløst når verdien av inputfeltet endres og brukeren har forlatt feltet.',
        valueLocation: ['event.target.value'],
      },
      {
        name: 'input',
        description:
          'Blir utløst når verdien av inputfeltet endres. Dette eventet utløses ved hver endring, inkludert mens brukeren skriver.',
        valueLocation: ['event.target.value'],
      },
    ],
  },
  decorators: [story => html`<div style="max-width: 400px;">${story()}</div>`],
  render: args =>
    html`<fhi-time-input
      label=${ifDefined(args.label)}
      message=${ifDefined(args.message)}
      help-text=${ifDefined(args.helpText)}
      status=${ifDefined(args.status)}
      name=${ifDefined(args.name)}
      value=${ifDefined(args.value)}
      min=${ifDefined(args.min)}
      max=${ifDefined(args.max)}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      @input=${action('input')}
      @change=${action('change')}
    ></fhi-time-input>`,
  argTypes: {
    name: {
      control: { type: 'text' },
      description:
        'Setter navn på inputfeltet. Dette brukes typisk av assosierte form-elementer for å identifisere feltet i FormData.',
    },
    value: {
      control: { type: 'text' },
      description:
        'Setter verdi på inputfeltet. Dette vil være synlig i feltet og automatisk bli med i FormData. Format `HH:MM`',
    },
    min: {
      control: { type: 'text' },
      description:
        'Setter minimumstidspunkt (gitt som `HH:MM`), som hindrer brukeren å velge et tidspunkt tidligere enn dette. Dersom feltet ikke er satt til dette formatet vil verdien ignoreres.',
      table: {
        type: { summary: 'number:number' },
      },
    },
    max: {
      control: { type: 'text' },
      description:
        'Setter maksimumstidspunkt (gitt som `HH:MM`). Dette vil hindre at brukeren kan velge et tidspunkt senere enn dette. Dersom feltet ikke er satt til dette formatet eller verdien ikke er et tidspunkt senere enn min vil verdien ignoreres.',
      table: {
        type: { summary: 'number:number' },
      },
    },
    label: {
      control: { type: 'text' },
      description:
        'Setter label, som assosieres med inputfeltet og vises over. Om dette er satt trenger du ikke å deklarere eget label-element.',
    },
    message: {
      control: { type: 'text' },
      description:
        'Vises under inputfeltet. Brukes til å gi veiledning til brukeren. Brukes blant annet ved Error for å forklare hva som mangler eller må justeres.',
    },
    helpText: {
      name: 'help-text',
      control: { type: 'text' },
      description:
        'Vises over inputfeltet. Brukes til å gi utvidede forklaringer eller hjelpsomme hint til utfylling.',
    },
    readonly: {
      control: { type: 'boolean' },
      description: 'Bestemmer om feltet kan redigeres.',
      defaultValue: { summary: false },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Bestemmer om bruker kan samhandle med feltet.',
      defaultValue: { summary: false },
    },
    status: {
      control: { type: 'select' },
      description:
        'Bestemmer om feltet har en status. Dette vil endre utseende på feltet.',
      options: ['error'],
    },
  },
};

type Story = StoryObj<FhiTimeInput>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {
    label: 'Tid',
    helpText: 'Tid skrives i formatet tt:mm, slik som 04:56',
  },
};

export const WithNoAttributes: Story = {
  name: 'Default',
  args: {},
};

export const MinMax: Story = {
  name: 'Min og Max',
  args: {
    label: 'Tid',
    min: '08:00',
    max: '16:00',
  },
};

export const Error: Story = {
  args: {
    label: 'Tid',
    helpText: 'Må fylles ut',
    message: 'Tid må fylles ut',
    status: 'error',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    label: 'Tidspunkt',
    value: '19:29',
    readonly: true,
  },
};

export default meta;
