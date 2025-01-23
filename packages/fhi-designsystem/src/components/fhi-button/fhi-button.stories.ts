import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { FhiButton, FhiButtonProps } from './fhi-button';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
FhiButton;

const meta: Meta = {
  title: 'Components/fhi-button',
  tags: ['autodocs'],
  parameters: {
    actions: {
      handles: ['click'],
    },
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
      control: { type: 'radio' },
    },
    variant: {
      options: ['strong', 'subtle', 'outlined', 'text'],
      control: { type: 'radio' },
    },
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' },
    },
  },
};

type Story = StoryObj<FhiButtonProps>;

export const Accent: Story = {
  args: {
    color: 'accent',
    variant: 'strong',
    size: 'medium',
    disabled: false,
  } satisfies FhiButtonProps,
};

export const Neutral: Story = {
  args: {
    color: 'neutral',
    variant: 'strong',
    size: 'medium',
    disabled: false,
  } satisfies FhiButtonProps,
};

export const Danger: Story = {
  args: {
    color: 'danger',
    variant: 'strong',
    size: 'medium',
    disabled: false,
  } satisfies FhiButtonProps,
};

export const Disabled: Story = {
  args: {
    color: 'accent',
    variant: 'strong',
    size: 'medium',
    disabled: true,
  } satisfies FhiButtonProps,
};

export default meta;
