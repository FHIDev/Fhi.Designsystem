import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiCheckbox } from './fhi-checkbox.component';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiCheckbox();

const meta: Meta<FhiCheckbox> = {
  title: 'Komponenter/Checkbox',
  component: 'fhi-checkbox',
  parameters: {},
  decorators: [],
  render: args =>
    html`<fhi-checkbox
      label=${ifDefined(args.label)}
      id=${ifDefined(args.id)}
      status=${ifDefined(args.status)}
      ?disabled=${args.disabled}
    ></fhi-checkbox>`,
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Informerer om hvilket valg avkrysningsboksen tilsvarer.',
      defaultValue: { summary: '' },
    },
    id: {
      control: { type: 'text' },
      description: 'Unik id for avkrysningsboksen.',
      defaultValue: { summary: '' },
    },
    status: {
      control: { type: 'select' },
      description: 'Informerer om feil. Dette vil endre utseende.',
      defaultValue: { summary: undefined },
      options: [undefined, 'error'],
    },
    disabled: {
      constrol: { type: 'boolean' },
      description: 'Bestemmer om bruker kan samhandle med avkrysningsboksen',
      defaultValue: { summary: false },
    },
  },
};

type Story = StoryObj<FhiCheckbox>;

export const Preview: Story = {
  tags: [],
  args: {
    label: 'Checkbox',
  },
};

export const Error: Story = {
  tags: ['!dev'],
  args: {
    label: 'Checkbox',
    status: 'error',
  },
};

export const NoLabel: Story = {
  tags: ['!dev'],
  args: {
    label: '',
  },
};

export const Disabled: Story = {
  tags: [],
  args: {
    label: 'Checkbox',
    disabled: true,
  },
};

export default meta;
