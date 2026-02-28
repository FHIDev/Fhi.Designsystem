import type { Meta, StoryObj } from '@storybook/web-components-vite';

import { html } from 'lit/html.js';

import { FhiGrid } from './fhi-grid.component';

new FhiGrid();

const meta: Meta<FhiGrid> = {
  title: 'Komponenter/Grid',
  component: 'fhi-grid',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
  decorators: [
    Story =>
      html` <div>
        <style>
          fhi-grid div {
            font-family: var(--fhi-font-family-default);
            color: var(--fhi-color-accent-text-subtle);
            background: var(--fhi-color-accent-background-subtle);
            border: var(--fhi-dimension-border-width) solid
              var(--fhi-color-accent-border-subtle);
            padding: var(--fhi-spacing-200);
            border-radius: var(--fhi-border-radius-150);
            display: flex;
            justify-content: start;
            align-items: center;
          }
        </style>
        ${Story()}
      </div>`,
  ],
  render: args => html`<fhi-grid gap=${args.gap}></fhi-grid>`,
  argTypes: {
    gap: {
      control: 'text',
      description:
        'Bestemmer avstand mellom elementene. Kan være `small`, `medium`, `large` eller en spesifikk verdi som `12px`, `1rem` eller `24`. Rene tallverdier blir angitt som px.',
      defaultValue: { summary: 'medium' },
    },
    columns: {
      controls: 'number',
      description: 'Bestemmer antall kolonner',
      defaultValue: { summary: '12' },
    },
    rows: {
      controls: 'number',
      description: 'Bestemmer antall rader',
      defaultValue: { summary: '1' },
    },
  },
};

type Story = StoryObj<FhiGrid>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {
    gap: 'medium',
    columns: 12,
    rows: 1,
  },
  render: args => html`
    <fhi-grid gap=${args.gap} columns=${args.columns} rows=${args.rows}>
      <div style="grid-column: span 6;">Slot</div>
      <div style="grid-column: span 3;">Slot</div>
      <div style="grid-column: span 3;">Slot</div>
    </fhi-grid>
  `,
};

export const LargeGrid: Story = {
  tags: [],
  args: {
    gap: 'medium',
    columns: 12,
  },
  render: args => html`
    <fhi-grid gap=${args.gap} columns=${args.columns}>
      <div style="grid-column: span 4;">Slot</div>
      <div style="grid-column: span 4;">Slot</div>
      <div style="grid-column: span 4;">Slot</div>
      <div style="grid-column: span 6;">Slot</div>
      <div style="grid-column: span 6;">Slot</div>
      <div style="grid-column: span 10;">Slot</div>
      <div style="grid-column: span 2;">Slot</div>
    </fhi-grid>
  `,
};

export const GridWithRowsAndColumns: Story = {
  tags: [],
  args: {
    gap: 'medium',
    rows: 8,
  },
  render: args => html`
    <fhi-grid rows=${args.rows}>
      <div style="grid-row: span 8; grid-column: 1;">Slot</div>
      <div style="grid-row: 1; grid-column: 2 / 13;">Slot</div>
      <div style="grid-row: 2 / 8; grid-column: 2 / 13;">Slot</div>
      <div style="grid-row: 8; grid-column: 2 / 13;">Slot</div>
    </fhi-grid>
  `,
};

export const NoSpan: Story = {
  tags: [],
  args: {
    gap: 'medium',
    columns: 3,
  },
  render: args => html`
    <fhi-grid gap=${args.gap} columns=${args.columns}>
      <div>Slot</div>
      <div>Slot</div>
      <div>Slot</div>
    </fhi-grid>
  `,
};

export default meta;
