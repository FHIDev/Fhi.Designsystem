import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FhiButton } from './fhi-button';

const meta: Meta<FhiButton> = {
  title: 'Komponenter/Button',
  component: 'fhi-button',
  parameters: {
    actions: {
      handles: ['click'],
    },
    options: { selectedPanel: 'addon-controls' },
  },
  decorators: [withActions],
  render: args =>
    html`<fhi-button
      color=${ifDefined(args.color)}
      variant=${ifDefined(args.variant)}
      size=${ifDefined(args.size)}
      ?disabled=${args.disabled}
    >
      Handling
    </fhi-button>`,
  argTypes: {
    color: {
      options: ['accent', 'neutral', 'danger'],
      control: { type: 'select' },
    },
    variant: {
      options: ['strong', 'subtle', 'outlined', 'text'],
      control: { type: 'select' },
    },
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'select' },
    },
    type: {
      options: ['submit', 'button', 'reset'],
      control: { type: 'select' },
    },
    disabled: { control: { type: 'boolean' } },
  },
};

type Story = StoryObj<FhiButton>;

export const Preview: Story = {
  tags: ['!dev'],
};

export const Accent: Story = {
  args: { color: 'accent' },
};

export const Neutral: Story = {
  args: {
    color: 'neutral',
  },
};

export const Danger: Story = {
  args: {
    color: 'danger',
  },
};

export const showColors: Story = {
  tags: ['!dev'],
  render: () => html`
    <fhi-button color="accent">Handling</fhi-button>
    <fhi-button color="neutral">Handling</fhi-button>
    <fhi-button color="danger">Handling</fhi-button>
  `,
};

export const showVariants: Story = {
  tags: ['!dev'],
  render: () => html`
    <fhi-button color="neutral" variant="strong">Handling</fhi-button>
    <fhi-button color="neutral" variant="subtle">Handling</fhi-button>
    <fhi-button color="neutral" variant="outlined">Handling</fhi-button>
    <fhi-button color="neutral" variant="text">Handling</fhi-button>
  `,
};

export const showSizes: Story = {
  tags: ['!dev'],
  render: () => html`
    <fhi-button color="neutral" size="large">Handling</fhi-button>
    <fhi-button color="neutral" size="medium">Handling</fhi-button>
    <fhi-button color="neutral" size="small">Handling</fhi-button>
  `,
};

export default meta;
