import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiBody } from './fhi-body.component';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiBody();

const meta: Meta<FhiBody> = {
  title: 'Komponenter/Typography/Body',
  component: 'fhi-body',
  parameters: {},
  decorators: [],
  render: args =>
    html`<fhi-body size=${args.size} color=${ifDefined(args.color)}
      >Eksempel</fhi-body
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

type Story = StoryObj<FhiBody>;

export const Preview: Story = {
  tags: [],
  args: { size: 'medium' },
};

export default meta;
