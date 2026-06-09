import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import { FhiStorybookMeta } from '../../../.storybook/fhi-meta';
import { action } from 'storybook/actions';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FhiTextArea } from './fhi-text-area.component';
import { FhiIconX } from '../icons/fhi-icon-x.component';

new FhiTextArea();
new FhiIconX();

const meta: FhiStorybookMeta<FhiTextArea> = {
  title: 'Komponenter/Text Area',
  component: 'fhi-text-area',
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
          'Blir utløst når verdien av textboksen endres og brukeren har forlatt boksen.',
        valueLocation: ['event.target.value'],
      },
      {
        name: 'input',
        description:
          'Blir utløst når verdien av textboksen endres. Dette eventet utløses ved hver endring, inkludert mens brukeren skriver.',
        valueLocation: ['event.target.value'],
      },
    ],
    slotTypes: [
      {
        name: 'end',
        description:
          'Ikon som er knyttet til en handling, for eksempel å tømme boksen. I øvre høyre hjørne av boksen.',
      },
    ],
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
        'Setter navn på textboksen. Dette brukes typisk av assosierte form-elementer for å identifisere boksen i FormData.',
      defaultValue: { summary: 'undefined' },
    },
    value: {
      control: 'text',
      description:
        'Setter verdi på textboksen. Dette vil være synlig i boksen og automatisk bli med i FormData.',
      defaultValue: { summary: '' },
    },
    label: {
      control: 'text',
      description:
        'Setter label. Dette assosieres med textboksen og vises over. Om dette er satt trenger du ikke å deklarere eget label-element.',
      defaultValue: { summary: 'undefined' },
    },
    message: {
      control: 'text',
      description:
        'Vises under textboksen. Brukes til å gi veiledning til brukeren. Brukes blant annet ved Error for å forklare hva som mangler eller må justeres.',
      defaultValue: { summary: 'undefined' },
    },
    helpText: {
      name: 'help-text',
      control: 'text',
      description:
        'Vises over textboksen. Brukes til å gi utvidede forklaringer eller hjelpsomme hint til utfylling.',
      defaultValue: { summary: 'undefined' },
    },
    placeholder: {
      control: 'text',
      description:
        'Setter placeholder for textboksen. Denne vil ikke være synlig om boksen har verdi.',
      defaultValue: { summary: 'undefined' },
    },
    readonly: {
      control: 'boolean',
      description: 'Bestemmer om textboksen kan redigeres.',
      defaultValue: { summary: false },
    },
    disabled: {
      control: 'boolean',
      description: 'Bestemmer om bruker kan samhandle med textboksen.',
      defaultValue: { summary: false },
    },
    status: {
      control: 'select',
      description:
        'Bestemmer om textboksen har en status. Dette vil endre utseende på textboksen.',
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
    label: 'Kommentar',
    value: 'Verdi',
    helpText: 'Hentet fra forrige side',
    readonly: true,
  },
};

export const WithIcon: Story = {
  tags: ['!dev'],
  args: {},
  render: args =>
    html`<fhi-text-area label=${ifDefined(args.label)}>
      <fhi-icon-x name="close" slot="end"></fhi-icon-x>
    </fhi-text-area>`,
};

export default meta;
