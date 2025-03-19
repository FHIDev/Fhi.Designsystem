import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';

import { html } from 'lit';
import { FhiTextInput } from './fhi-text-input';
import { ifDefined } from 'lit/directives/if-defined.js';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
FhiTextInput;

const meta: Meta<FhiTextInput> = {
  title: 'Komponenter/Text Input',
  component: 'fhi-text-input',
  parameters: {
    actions: {
      handles: ['change', 'input'],
    },
    options: { selectedPanel: 'addon-controls' },
  },
  decorators: [withActions],
  render: args =>
    html`<fhi-text-input
      label=${ifDefined(args.label)}
      message=${ifDefined(args.message)}
      placeholder=${ifDefined(args.placeholder)}
      status=${ifDefined(args.status)}
      name=${ifDefined(args.name)}
      value=${ifDefined(args.value)}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
    ></fhi-text-input>`,
  argTypes: {
    name: {
      control: 'text',
      description: 'Setter navn på inputfeltet',
      defaultValue: { summary: 'undefined' },
    },
    value: {
      control: 'text',
      description: 'Setter verdi på inputfeltet',
      defaultValue: { summary: 'undefined' },
    },
    label: {
      control: 'text',
      description: 'Setter label. Dette vises over inputfeltet',
      defaultValue: { summary: 'undefined' },
    },
    message: {
      control: 'text',
      description: 'Setter melding. Dette vises under inputfeltet',
      defaultValue: { summary: 'undefined' },
    },
    placeholder: {
      control: 'text',
      description:
        'Setter placeholder for inputfiltet. Denne vil ikke være synlig om feltet har verdi',
      defaultValue: { summary: 'undefined' },
    },
    readonly: {
      control: 'boolean',
      description: 'Bestemmer om feltet kan redigeres',
      defaultValue: { summary: false },
    },
    disabled: {
      control: 'boolean',
      description: 'Bestemmer om bruker kan samhandle med feltet.',
      defaultValue: { summary: false },
    },
    status: {
      control: 'select',
      description: 'Bestemmer om feltet har en status',
      defaultValue: { summary: 'undefined' },
      options: ['undefined', 'error'],
    },
  },
};

type Story = StoryObj<FhiTextInput>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {
    label: 'Label',
    message: 'Message',
    placeholder: 'Placeholder',
  },
};

export const Error: Story = {
  tags: ['!dev'],
  args: {
    status: 'error',
    value: 'This field has an error',
  },
};

export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    value: 'This field is disabled',
    disabled: true,
  },
};

export const Readonly: Story = {
  tags: ['!dev'],
  args: {
    value: 'This field is readonly',
    readonly: true,
  },
};

export const WithNoAttributes: Story = {
  name: 'Default',
  args: {},
};

export const WithLabelMessagePlaceholder: Story = {
  name: 'Label and message',
  args: {
    label: 'Adresse',
    message: 'Venligst skriv inn bostedsadresse',
  },
};

export const WithLabelMessageValueError: Story = {
  name: 'Error',
  args: {
    label: 'E-postadresse',
    message:
      'Ufullstendig adresse, sjekk at alfakrøll (@) og domene er med og riktig skrevet (f.eks: designsystemet@fhi.no)',
    value: 'daniel.fhi.no',
    status: 'error',
  },
};

export const WithReadonlyValueLabelMessage: Story = {
  name: 'Readonly',
  args: {
    label: 'Navn',
    message: 'Navn må være minst 2 bokstaver og kan ikke inneholde spesialtegn',
    value: 'Daniel',
    readonly: true,
  },
};

export const WithDisabledLabelMessage: Story = {
  name: 'Disabled',
  args: {
    label: 'Navn',
    message: 'Navn må være minst 2 bokstaver og kan ikke inneholde spesialtegn',
    disabled: true,
  },
};

export default meta;
