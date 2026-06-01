import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiTextArea } from './fhi-text-area.component';

import { FhiStorybookMeta } from '../../../.storybook/fhi-meta';
import { action } from 'storybook/actions';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiTextArea();

const meta: FhiStorybookMeta<FhiTextArea> = {
  title: 'Komponenter/Text Area',
  component: 'fhi-text-area',
  parameters: {
    eventTypes: [],
    methodTypes: [],
    slotTypes: [],
  },
  decorators: [],
  render: args =>
    html`<fhi-text-area
      label=${ifDefined(args.label)}
      message=${ifDefined(args.message)}
      placeholder=${ifDefined(args.placeholder)}
      help-text=${ifDefined(args.helpText)}
      status=${ifDefined(args.status)}
      name=${ifDefined(args.name)}
      value=${ifDefined(args.value)}
      rows=${ifDefined(args.rows)}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      @input=${action('input')}
      @change=${action('change')}
    ></fhi-text-area>`,
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
        'Setter label. Dette assosieres med inputfeltet og vises over. Om dette er satt trenger du ikke å deklarere eget label-element.',
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
    rows: {
      control: 'number',
      description: 'Setter antall synlige tekstlinjer for tekstområdet.',
      defaultValue: { summary: 2 },
    },
  },
};

type Story = StoryObj<FhiTextArea>;

export const Preview: Story = {
  tags: [],
  args: {},
};

export default meta;
