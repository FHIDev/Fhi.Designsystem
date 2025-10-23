import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiTitle } from './fhi-title.component';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiTitle();

const meta: Meta<FhiTitle> = {
  title: 'Komponenter/Title',
  component: 'fhi-title',
  parameters: {},
  decorators: [],
  render: args =>
    html`<fhi-title
      level=${ifDefined(args.level)}
      size=${args.size}
      color=${ifDefined(args.color)}
      >Eksempel</fhi-title
    >`,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'select' },
      description: 'Størrelsen på tekststilene.',
      defaultValue: { summary: 'medium' },
    },
    level: {
      options: ['1', '2', '3', '4', '5', '6'],
      control: { type: 'select' },
      description: 'Nivået på h-tag. **Obligatorisk attributt**.',
    },
    color: {
      control: { type: 'text' },
      description: 'Tekstfarge.',
      defaultValue: { summary: 'var(--fhi-color-neutral-text-default)' },
    },
  },
};

type Story = StoryObj<FhiTitle>;

export const Preview: Story = {
  tags: [],
  args: { size: 'large', level: 1 },
};

export default meta;
