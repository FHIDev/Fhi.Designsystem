import type { Meta, StoryObj } from '@storybook/web-components-vite';

import { html } from 'lit';
import { FhiLabel } from './fhi-label.component';

import { ifDefined } from 'lit/directives/if-defined.js';

new FhiLabel();

const meta: Meta<FhiLabel> = {
  title: 'Komponenter/Typography/Label',
  component: 'fhi-label',
  parameters: {},
  decorators: [],
  render: args =>
    html`<fhi-label size=${args.size} color=${ifDefined(args.color)}
      >Eksempel</fhi-label
    >`,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'select' },
      description: 'Størrelsen på tekststilene.',
      defaultValue: { summary: 'medium' },
    },
    color: {
      control: { type: 'text' },
      description: 'Tekstfarge.',
      defaultValue: { summary: 'var(--fhi-color-neutral-text-default)' },
    },
  },
};

type Story = StoryObj<FhiLabel>;

export const Preview: Story = {
  tags: [],
  args: { size: 'medium' },
};

export default meta;
