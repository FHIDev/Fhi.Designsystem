import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { FhiButton } from './fhi-button.component';

import { FhiIconX } from '../icons/fhi-icon-x.component';
import { FhiIconUpload } from '../icons/fhi-icon-upload.component';
import { FhiIconChevronDown } from '../icons/fhi-icon-chevron-down.component';
import { FhiIconArrowRight } from '../icons/fhi-icon-arrow-right.component';
import { FhiIconTrash } from '../icons/fhi-icon-trash.component';
import { FhiIconCheck } from '../icons/fhi-icon-check.component';
import { FhiIconSearch } from '../icons/fhi-icon-search.component';
import { FhiIconEllipsisVertical } from '../icons/fhi-icon-ellipsis-vertical.component';
import { FhiIconShare } from '../icons/fhi-icon-share.component';
import { FhiIconBell } from '../icons/fhi-icon-bell.component';
import { FhiIconExpand } from '../icons/fhi-icon-expand.component';
import { FhiIconUser } from '../icons/fhi-icon-user.component';

new FhiButton();

new FhiIconX();
new FhiIconUpload();
new FhiIconChevronDown();
new FhiIconArrowRight();
new FhiIconTrash();
new FhiIconCheck();
new FhiIconSearch();
new FhiIconEllipsisVertical();
new FhiIconShare();
new FhiIconBell();
new FhiIconUser();

const meta: Meta<FhiButton> = {
  title: 'Komponenter/Button',
  component: 'fhi-button',
  parameters: {
    actions: {
      handles: ['click'],
    },
    options: { selectedPanel: 'addon-controls' },
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
  decorators: [
    withActions,
    Story =>
      html`<div
        style="display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        ${Story()}
      </div>`,
  ],
  render: args =>
    html`<fhi-button
      color=${ifDefined(args.color)}
      variant=${ifDefined(args.variant)}
      size=${ifDefined(args.size)}
      type=${ifDefined(args.type)}
      ?disabled=${args.disabled}
      ?icon-only=${args.iconOnly}
    >
      Handling
    </fhi-button>`,
  argTypes: {
    color: {
      options: ['accent', 'neutral', 'danger'],
      control: { type: 'select' },
      description: 'Bestemmer farge.',
      defaultValue: { summary: 'accent' },
    },
    variant: {
      options: ['strong', 'subtle', 'outlined', 'text'],
      control: { type: 'select' },
      description: 'Bestemmer variant.',
      defaultValue: { summary: 'strong' },
    },
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'select' },
      description: 'Bestemmer størrelse.',
      defaultValue: { summary: 'medium' },
    },
    type: {
      options: ['submit', 'button', 'reset'],
      control: { type: 'select' },
      description: 'Bestemmer type.',
      defaultValue: { summary: 'submit' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Bestemmer om knappen kan trykkes på.',
      defaultValue: { summary: 'false' },
    },
    iconOnly: {
      name: 'icon-only',
      control: { type: 'boolean' },
      description:
        'Bestemmer om knappen er en ikon-knapp. Ikon-knapper skal bare ha ett ikon og ingen tekst.',
      defaultValue: { summary: 'false' },
    },
  },
};

type Story = StoryObj<FhiButton>;

export const Preview: Story = {
  tags: ['!dev'],
  args: { color: 'accent', variant: 'strong', size: 'medium' },
};

export const Accent: Story = {
  args: { color: 'accent', variant: 'strong', size: 'medium' },
};

export const Neutral: Story = {
  args: {
    color: 'neutral',
    variant: 'strong',
    size: 'medium',
  },
};

export const Danger: Story = {
  args: {
    color: 'danger',
    variant: 'strong',
    size: 'medium',
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

export const showButtonsWithTextAndIcons: Story = {
  tags: ['!dev'],
  decorators: [
    Story =>
      html`<section
        style="display: flex; gap: 1rem; flex-wrap: wrap; width: 550px; justify-content: center; align-items: center;"
      >
        ${Story()}
      </section>`,
  ],
  render: () => html`
    <fhi-button size="large">
      <fhi-icon-upload></fhi-icon-upload>
      Gjør utrekk
    </fhi-button>

    <fhi-button color="danger" variant="text" size="small">
      <fhi-icon-x></fhi-icon-x>
      Forkast kladd
    </fhi-button>

    <fhi-button color="neutral" variant="outlined">
      Alle personer
      <fhi-icon-chevron-down></fhi-icon-chevron-down>
    </fhi-button>

    <fhi-button color="neutral" variant="text" size="small">
      Neste Side
      <fhi-icon-arrow-right></fhi-icon-arrow-right>
    </fhi-button>

    <fhi-button color="danger" size="small" variant="subtle">
      <fhi-icon-trash></fhi-icon-trash>
      Slett
    </fhi-button>

    <fhi-button variant="text">
      <fhi-icon-check></fhi-icon-check>
      Lagre
    </fhi-button>
  `,
};

new FhiIconExpand();

export const showIconButtons: Story = {
  tags: ['!dev'],
  decorators: [
    Story =>
      html`<section
        style="display: flex; gap: 1rem; flex-wrap: wrap; width: 250px; justify-content: center;"
      >
        ${Story()}
      </section>`,
  ],
  render: () => html`
    <fhi-button icon-only>
      <fhi-icon-search></fhi-icon-search>
    </fhi-button>

    <fhi-button icon-only variant="subtle">
      <fhi-icon-arrow-right></fhi-icon-arrow-right>
    </fhi-button>

    <fhi-button icon-only variant="outlined">
      <fhi-icon-ellipsis-vertical></fhi-icon-ellipsis-vertical>
    </fhi-button>

    <fhi-button icon-only variant="text">
      <fhi-icon-share></fhi-icon-share>
    </fhi-button>

    <fhi-button icon-only color="neutral">
      <fhi-icon-bell></fhi-icon-bell>
    </fhi-button>

    <fhi-button icon-only color="neutral" variant="subtle">
      <fhi-icon-expand></fhi-icon-expand>
    </fhi-button>

    <fhi-button icon-only color="neutral" variant="outlined">
      <fhi-icon-user></fhi-icon-user>
    </fhi-button>

    <fhi-button icon-only color="neutral" variant="text">
      <fhi-icon-x></fhi-icon-x>
    </fhi-button>
  `,
};

export default meta;
