import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiCheckbox } from './fhi-checkbox.component';
import { ifDefined } from 'lit/directives/if-defined.js';
import { withActions } from '@storybook/addon-actions/decorator';

import { FhiStorybookMeta } from '../../../.storybook/fhi-meta';

new FhiCheckbox();

const meta: FhiStorybookMeta<FhiCheckbox> = {
  title: 'Komponenter/Checkbox',
  component: 'fhi-checkbox',
  parameters: {
    actions: {
      handles: ['change', 'input'],
    },
    options: { selectedPanel: 'addon-controls' },
    eventTypes: [
      {
        name: 'change',
        valueLocation: 'event.target.checked',
        description: 'Utløses når avkrysningsboksen endrer tilstand.',
      },
      {
        name: 'input',
        valueLocation: 'event.target.checked',
        description: 'Utløses når brukeren samhandler med avkrysningsboksen.',
      },
    ],
  },
  decorators: [withActions],
  render: args =>
    html`<fhi-checkbox
      label=${ifDefined(args.label)}
      id=${ifDefined(args.id)}
      status=${ifDefined(args.status)}
      value=${ifDefined(args.value)}
      ?disabled=${args.disabled}
      ?checked=${args.checked}
    ></fhi-checkbox>`,
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Navnet på checkbox-gruppen',
      defaultValue: { summary: 'undefined' },
    },
    label: {
      control: { type: 'text' },
      description: 'Informerer om hvilket valg avkrysningsboksen tilsvarer.',
      defaultValue: { summary: 'undefined' },
    },
    value: {
      control: { type: 'text' },
      description:
        'Verdien som blir sendt til serveren sammen med checkbox-gruppe navnet når boksen er avkrysset.',
      defaultValue: { summary: '"on"' },
    },
    status: {
      control: { type: 'select' },
      description: 'Informerer om feil. Dette vil endre utseende.',
      defaultValue: { summary: 'undefined' },
      options: [undefined, 'error'],
    },
    checked: {
      control: { type: 'boolean' },
      description:
        'Indikerer at avkrysningsboksen er avkrysset. Kan brukes for å sette default state.',
      defaultValue: { summary: false },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Bestemmer om bruker kan samhandle med avkrysningsboksen.',
      defaultValue: { summary: false },
    },
  },
};

type Story = StoryObj<FhiCheckbox>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {
    label: 'Checkbox',
  },
};

export const Label: Story = {
  tags: [],
  args: {
    label: 'Agree',
    name: 'newsletter',
  },
};

export const NoLabel: Story = {
  tags: [],
  args: {},
};

export const Error: Story = {
  tags: [],
  args: {
    label: 'Checkbox',
    status: 'error',
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
