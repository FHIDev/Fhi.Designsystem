import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';

import { html } from 'lit';

import { FhiFlex } from './fhi-flex.component';
import { FhiButton } from '../fhi-button/fhi-button.component';

new FhiFlex();
new FhiButton();

const meta: Meta<FhiFlex> = {
  title: 'Komponenter/Flex',
  component: 'fhi-flex',
  parameters: {
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
    html`<fhi-flex
      direction=${args.direction}
      gap=${args.gap}
      ?wrap=${args.wrap}
    ></fhi-flex>`,
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['row', 'column'],
      description: 'Bestemmer retning på elementene.',
      defaultValue: { summary: 'row' },
    },
    gap: {
      control: { tyope: 'text' },
      description:
        'Bestemmer avstand mellom elementene. Kan være <code>small</code>, <code>medium</code>, <code>large</code> eller en spesifikk verdi som <code>10px</code>, <code>1rem</code> eller <code>20<code>.',
      defaultValue: { summary: 'medium' },
    },
    wrap: {
      control: { type: 'boolean' },
      description:
        'Bestemmer om elementene skal brytes til neste linje ved behov.',
      defaultValue: { summary: false },
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description: 'Bestemmer distribusjonen til elementene.',
      defaultValue: { summary: 'start' },
    },
    align: {
      control: { type: 'select' },
      options: ['stretch', 'start', 'center', 'end', 'baseline'],
      description: 'Bestemmer distribusjonen til elementene langs kryssaksen.',
      defaultValue: { summary: 'stretch' },
    },
  },
};
type Story = StoryObj<FhiFlex>;

export const Preview: Story = {
  args: {
    direction: 'row',
    gap: 'medium',
    wrap: false,
    justify: 'start',
    align: 'start',
  },
  render: args => html`
    <fhi-flex
      direction=${args.direction}
      gap=${args.gap}
      ?wrap=${args.wrap}
      justify=${args.justify}
      align=${args.align}
    >
      <fhi-button variant="strong">Knapp</fhi-button>
      <fhi-button variant="subtle">Knapp</fhi-button>
      <fhi-button variant="text">Knapp</fhi-button>
    </fhi-flex>
  `,
};

export const RowDirection: Story = {
  args: {
    direction: 'row',
    gap: 'medium',
    wrap: false,
  },
  render: args => html`
    <fhi-flex
      direction=${args.direction}
      gap=${args.gap}
      ?wrap=${args.wrap}
      justify=${args.justify}
      align=${args.align}
    >
      ${['Flex', 'med', 'row/default', 'direction'].map(
        word => html`
          <div
            style="font-family: var(--fhi-font-family-default); color: var(--fhi-color-accent-text-subtle); background: var(--fhi-color-accent-background-subtle); border: var(--fhi-dimension-border-width) solid var(--fhi-color-accent-border-subtle); padding: var(--fhi-spacing-200); border-radius: var(--fhi-border-radius-150); display: flex; justify-content: start; align-items: center;"
          >
            ${word}
          </div>
        `,
      )}
    </fhi-flex>
  `,
};

export const ColumnDirection: Story = {
  args: {
    direction: 'column',
    gap: 'medium',
    wrap: false,
  },
  render: args => html`
    <fhi-flex
      direction=${args.direction}
      gap=${args.gap}
      ?wrap=${args.wrap}
      justify=${args.justify}
      align=${args.align}
    >
      ${['Flex', 'med', 'column', 'direction'].map(
        word => html`
          <div
            style="font-family: var(--fhi-font-family-default); color: var(--fhi-color-accent-text-subtle); background: var(--fhi-color-accent-background-subtle); border: var(--fhi-dimension-border-width) solid var(--fhi-color-accent-border-subtle); padding: var(--fhi-spacing-200); border-radius: var(--fhi-border-radius-150); display: flex; justify-content: start; align-items: center;"
          >
            ${word}
          </div>
        `,
      )}
    </fhi-flex>
  `,
};

export const CustomGap: Story = {
  args: {
    direction: 'row',
    gap: '2rem',
    wrap: false,
  },
  render: args => html`
    <fhi-flex
      direction=${args.direction}
      gap=${args.gap}
      ?wrap=${args.wrap}
      justify=${args.justify}
      align=${args.align}
    >
      ${['Flex', 'med', 'custom', 'gap'].map(
        word => html`
          <div
            style="font-family: var(--fhi-font-family-default); color: var(--fhi-color-accent-text-subtle); background: var(--fhi-color-accent-background-subtle); border: var(--fhi-dimension-border-width) solid var(--fhi-color-accent-border-subtle); padding: var(--fhi-spacing-200); border-radius: var(--fhi-border-radius-150); display: flex; justify-content: start; align-items: center;"
          >
            ${word}
          </div>
        `,
      )}
    </fhi-flex>
  `,
};

export const Wrap: Story = {
  args: {
    direction: 'row',
    gap: 'medium',
    wrap: true,
  },
  render: args => html`
    <fhi-flex
      direction=${args.direction}
      gap=${args.gap}
      ?wrap=${args.wrap}
      justify=${args.justify}
      align=${args.align}
    >
      ${[
        'Dette er et',
        'eksempel på Flex',
        'som har satt',
        'Wrap',
        'på seg',
        'så elementene går',
        'videre til neste',
        'linje når det',
        'ikke er plass',
      ].map(
        word => html`
          <div
            style="font-family: var(--fhi-font-family-default); color: var(--fhi-color-accent-text-subtle); background: var(--fhi-color-accent-background-subtle); border: var(--fhi-dimension-border-width) solid var(--fhi-color-accent-border-subtle); padding: var(--fhi-spacing-200); border-radius: var(--fhi-border-radius-150); display: flex; justify-content: start; align-items: center;"
          >
            ${word}
          </div>
        `,
      )}
    </fhi-flex>
  `,
};

export default meta;
