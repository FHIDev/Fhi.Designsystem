import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';

import { html } from 'lit';

import { ifDefined } from 'lit/directives/if-defined.js';
import { FhiRadio } from './fhi-radio.component';

new FhiRadio();

const meta: Meta<FhiRadio> = {
  title: 'Komponenter/Radio',
  component: 'fhi-radio',
  parameters: {
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
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      status=${ifDefined(args.status)}
      value=${ifDefined(args.value)}
      @input=${action('input')}
      @change=${action('change')}
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
    value: {
      control: 'text',
      description:
        'Setter verdien til radiofeltet. Denne verdien sendes til serveren om feltet er valgt når skjemaet sendes inn.',
      defaultValue: { summary: 'on' },
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
  decorators: [
    Story =>
      html` <div style="display: flex; flex-direction: column; gap: .5rem">
        ${Story()}
      </div>`,
  ],
  render: () => html`
    <fhi-radio label="Norsk" name="nationality" value="Norwegian"></fhi-radio>
    <fhi-radio label="Svensk" name="nationality" value="Swedish"></fhi-radio>
    <fhi-radio label="Dansk" name="nationality" value="Danish"></fhi-radio>
  `,
};

export default meta;
