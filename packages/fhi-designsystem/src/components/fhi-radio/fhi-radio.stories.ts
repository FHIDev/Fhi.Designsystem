import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiRadio } from './fhi-radio.component';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiRadio();

const meta: Meta<FhiRadio> = {
  title: 'Komponenter/Radio',
  component: 'fhi-radio',
  parameters: {
    actions: {
      handles: ['change'],
    },
    options: { selectedPanel: 'addon-controls' },
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
  decorators: [],
  render: args =>
    html`<fhi-radio
      name=${ifDefined(args.name)}
      label=${ifDefined(args.label)}
      ?checked=${ifDefined(args.checked)}
      ?disabled=${ifDefined(args.disabled)}
      status=${ifDefined(args.status)}
    ></fhi-radio>`,
  argTypes: {
    name: {
      control: 'text',
      description:
        'Setter navn på radiofeltet. Dette brukes typisk av assosierte form-elementer for å identifisere feltet i FormData.',
      defaultValue: { summary: 'undefined' },
    },
    label: {
      control: 'text',
      description:
        'Setter label. Dette assosieres med radiofelted og vises til brukeren.',
      defaultValue: { summary: 'undefined' },
    },
    checked: {
      control: 'boolean',
      description:
        'Bestemmer om feltet er valgt. Brukeren kan sette feltet til valgt ved å klikke på det.',
      defaultValue: { summary: false },
    },
    disabled: {
      control: 'boolean',
      description:
        'Bestemmer om feltet er deaktivert. Brukeren kan ikke endre feltet når det er deaktivert.',
      defaultValue: { summary: false },
    },
    status: {
      control: 'select',
      options: [undefined, 'error'],
      description: 'Bestemmer statusen på feltet.',
      defaultValue: { summary: undefined },
    },
  },
};

type Story = StoryObj<FhiRadio>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {
    label: 'Label',
  },
};

export const Default: Story = {
  tags: [],
  args: {
    label: 'Label',
  },
};

export const Error: Story = {
  tags: [],
  args: {
    label: 'Label',
    status: 'error',
  },
};

export const Disabled: Story = {
  tags: [],
  args: {
    label: 'Label',
    disabled: true,
  },
};

export const Group: Story = {
  tags: ['!dev'],
  render: () => html`
    <fhi-radio
      label="Norwegian"
      name="nationality"
      value="Norwegian"
    ></fhi-radio>
    <fhi-radio label="Swedish" name="nationality" value="Swedish"></fhi-radio>
    <fhi-radio label="Danish" name="nationality" value="Danish"></fhi-radio>
  `,
};

export default meta;
