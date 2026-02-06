import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';

import { html } from 'lit';
import { FhiTextInput } from './fhi-text-input.component';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiTextInput();

const meta: Meta<FhiTextInput> = {
  title: 'Komponenter/Text Input',
  component: 'fhi-text-input',
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
    html`<fhi-text-input
      label=${ifDefined(args.label)}
      message=${ifDefined(args.message)}
      placeholder=${ifDefined(args.placeholder)}
      help-text=${ifDefined(args.helpText)}
      status=${ifDefined(args.status)}
      name=${ifDefined(args.name)}
      value=${ifDefined(args.value)}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
    ></fhi-text-input>`,
  argTypes: {
    name: {
      control: 'text',
      description:
        'Setter navn på inputfeltet. Dette brukes typisk av assosierte form-elementer for å identifisere feltet i FormData.',
      defaultValue: { summary: 'undefined' },
    },
    value: {
      control: 'text',
      description:
        'Setter verdi på inputfeltet. Dette vil være synlig i feltet og automatisk bli med i FormData.',
      defaultValue: { summary: '' },
    },
    label: {
      control: 'text',
      description:
        'Setter label. Dette assosieres med inputfelted og vises over. Om dette er satt trenger du ikke å deklarere eget label-element.',
      defaultValue: { summary: 'undefined' },
    },
    message: {
      control: 'text',
      description:
        'Vises under inputfeltet. Brukes til å gi veiledning til brukeren. Brukes blant annet ved Error for å forklare hva som mangler eller må justeres.',
      defaultValue: { summary: 'undefined' },
    },
    helpText: {
      name: 'help-text',
      control: 'text',
      description:
        'Vises over inputfeltet. Brukes til å gi utvidede forklaringer eller hjelpsomme hint til utfylling.',
      defaultValue: { summary: 'undefined' },
    },
    placeholder: {
      control: 'text',
      description:
        'Setter placeholder for inputfeltet. Denne vil ikke være synlig om feltet har verdi.',
      defaultValue: { summary: 'undefined' },
    },
    readonly: {
      control: 'boolean',
      description: 'Bestemmer om feltet kan redigeres.',
      defaultValue: { summary: false },
    },
    disabled: {
      control: 'boolean',
      description: 'Bestemmer om bruker kan samhandle med feltet.',
      defaultValue: { summary: false },
    },
    status: {
      control: 'select',
      description:
        'Bestemmer om feltet har en status. Dette vil endre utseende på feltet.',
      defaultValue: { summary: 'undefined' },
      options: [undefined, 'error'],
    },
  },
};

type Story = StoryObj<FhiTextInput>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {
    label: 'Label',
  },
};

export const Error: Story = {
  tags: ['!dev'],
  args: {
    label: 'Label',
    message: 'Informative error message',
    status: 'error',
    value: 'This field has an error',
  },
};

export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    label: 'Label',
    value: 'This field is disabled',
    disabled: true,
  },
};

export const Readonly: Story = {
  tags: ['!dev'],
  args: {
    label: 'Navn',
    value: 'Ola Nordmann',
    helpText: 'Hentet fra Folkerigisteret',
    readonly: true,
  },
};

export const WithNoAttributes: Story = {
  name: 'Default',
  args: {},
};

export const WithHelpText: Story = {
  name: 'HelpText',
  args: {
    label: 'Adresse',
    helpText: 'Valgfritt',
  },
};

export const WithLabelMessageValueError: Story = {
  name: 'Error',
  args: {
    label: 'E-postadresse',
    helpText: 'Eks: designsystemet@fhi.no',
    message:
      'Ufullstendig adresse, sjekk at krøllalfa (@) og domene er med og riktig skrevet',
    value: 'designsystemet.fhi.no',
    status: 'error',
  },
};

export const WithReadonlyValueLabelHelpText: Story = {
  name: 'Readonly',
  args: {
    label: 'Navn',
    helpText: 'Hentet fra Folkeregisteret',
    value: 'Ola Nordmann',
    readonly: true,
  },
};

export const WithDisabledLabel: Story = {
  name: 'Disabled',
  args: {
    label: 'Navn',
    disabled: true,
  },
};

export default meta;
