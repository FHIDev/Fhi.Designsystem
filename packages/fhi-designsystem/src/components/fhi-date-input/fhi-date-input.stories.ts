import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';

import { html } from 'lit';
import { FhiDateInput } from './fhi-date-input.component';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiDateInput();

const meta: Meta<FhiDateInput> = {
  title: 'Komponenter/Date Input',
  component: 'fhi-date-input',
  parameters: {
    actions: {
      handles: ['change', 'input'],
    },
    options: { selectedPanel: 'addon-controls' },
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
  decorators: [
    withActions,
    story => html`<div style="max-width: 400px;">${story()}</div>`,
  ],
  render: args =>
    html`<fhi-date-input
      label=${ifDefined(args.label)}
      message=${ifDefined(args.message)}
      description=${ifDefined(args.description)}
      status=${ifDefined(args.status)}
      name=${ifDefined(args.name)}
      value=${ifDefined(args.value)}
      min=${ifDefined(args.min)}
      max=${ifDefined(args.max)}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
    ></fhi-date-input>`,
  argTypes: {
    name: {
      control: { type: 'text' },
      description:
        'Setter navn på inputfeltet. Dette brukes typisk av assosierte form-elementer for å identifisere feltet i FormData.',
      defaultValue: { summary: 'undefined' },
    },
    value: {
      control: { type: 'text' },
      description:
        'Setter verdi på inputfeltet. Dette vil være synlig i feltet og automatisk bli med i FormData. Format `YYYY-MM-DD`',
      defaultValue: { summary: '' },
    },
    min: {
      control: { type: 'text' },
      description:
        'Setter minimumsdato (gitt som `YYYY-MM-DD`), som hindrer brukeren å velge en dato tidligere enn denne. Dersom feltet ikke er satt til dette formatet vil verdien ignoreres.',
      table: {
        type: { summary: 'number-number-number' },
      },
      defaultValue: { summary: 'undefined' },
    },
    max: {
      control: { type: 'text' },
      description:
        'Setter maksimumdato (gitt som `YYYY-MM-DD`). Dette vil hindre at brukeren kan velge en dato senere enn denne. Dersom feltet ikke er satt til dette formatet eller verdien ikke er en dato senere enn min vil verdien ignoreres.',
      table: {
        type: { summary: 'number-number-number' },
      },
      defaultValue: { summary: 'undefined' },
    },
    label: {
      control: { type: 'text' },
      description:
        'Setter label, som assosieres med inputfeltet og vises over. Om dette er satt trenger du ikke å deklarere eget label-element.',
      defaultValue: { summary: 'undefined' },
    },
    message: {
      control: { type: 'text' },
      description:
        'Vises under inputfeltet. Brukes til å gi veiledning til brukeren, for eksempel ved feil eller mangler i feltet. Ved Error skal det være en melding om hva som mangler eller må justeres.',
      defaultValue: { summary: 'undefined' },
    },
    description: {
      control: { type: 'text' },
      description:
        'Vises over inputfeltet. Brukes til å gi utvidede forklaringer eller hjelpsomme hint til utfylling.',
      defaultValue: { summary: 'undefined' },
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
      defaultValue: { summary: 'undefined' },
      options: [undefined, 'error'],
    },
  },
};

type Story = StoryObj<FhiDateInput>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {
    label: 'Label',
    message: 'Message',
    description: 'Description',
  },
};

export const WithNoAttributes: Story = {
  name: 'Default',
  args: {},
};

export const MinMax: Story = {
  name: 'Min og Max',
  args: {
    label: 'Label',
    message: 'Field with min and max date',
    min: '2025-09-01',
    max: '2025-09-30',
  },
};

export const Error: Story = {
  name: 'Error',
  args: {
    label: 'Label',
    message: 'Informative error message',
    status: 'error',
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    label: 'Label',
    message: 'This field is disabled',
    disabled: true,
  },
};

export const Readonly: Story = {
  name: 'ReadOnly',
  args: {
    label: 'Set date',
    value: '2025-09-26',
    readonly: true,
  },
};

export default meta;
