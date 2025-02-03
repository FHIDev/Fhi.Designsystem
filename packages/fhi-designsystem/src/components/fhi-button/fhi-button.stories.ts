import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { FhiButton, FhiButtonProps } from './fhi-button';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
FhiButton;

const meta: Meta = {
  title: 'Components/Button',
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
  },
};

type Story = StoryObj<FhiButtonProps>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {
    color: 'accent',
    variant: 'strong',
    size: 'medium',
    disabled: false,
  } satisfies FhiButtonProps,
};

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

export const showColors: Story = {
  tags: ['!dev'],
  render: () => html`
    <fhi-button color="accent" variant="strong" size="medium"
      >Handling</fhi-button
    >
    <fhi-button color="neutral" variant="strong" size="medium"
      >Handling</fhi-button
    >
    <fhi-button color="danger" variant="strong" size="medium"
      >Handling</fhi-button
    >
  `,
};

export const showVariants: Story = {
  tags: ['!dev'],
  render: () => html`
    <fhi-button color="neutral" variant="strong" size="medium"
      >Handling</fhi-button
    >
    <fhi-button color="neutral" variant="subtle" size="medium"
      >Handling</fhi-button
    >
    <fhi-button color="neutral" variant="outlined" size="medium"
      >Handling</fhi-button
    >
    <fhi-button color="neutral" variant="text" size="medium"
      >Handling</fhi-button
    >
  `,
};

export const showSizes: Story = {
  tags: ['!dev'],
  render: () => html`
    <fhi-button color="neutral" variant="strong" size="large"
      >Handling</fhi-button
    >
    <fhi-button color="neutral" variant="strong" size="medium"
      >Handling</fhi-button
    >
    <fhi-button color="neutral" variant="strong" size="small"
      >Handling</fhi-button
    >
  `,
};

export default meta;
