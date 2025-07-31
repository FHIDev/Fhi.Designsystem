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
      .checked=${ifDefined(args.checked)}
      disabled=${ifDefined(args.disabled)}
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
        'Bestemmer om feltet er valgt. Brukeren kan endre dette ved å trykke på radiofeltet.',
      defaultValue: { summary: false },
    },
  },
};

type Story = StoryObj<FhiRadio>;

export const Preview: Story = {
  tags: [],
  args: {},
};

export default meta;
