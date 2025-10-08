import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiGrid } from './fhi-grid.component';

new FhiGrid();

const meta: Meta<FhiGrid> = {
  title: 'Komponenter/Grid',
  component: 'fhi-grid',
  parameters: {
    options: { selectedPanel: 'addon-controls' },
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
  decorators: [],
  render: args => html`<fhi-grid gap=${args.gap}></fhi-grid>`,
  argTypes: {
    gap: {
      control: 'text',
      description:
        'Bestemmer avstand mellom elementene. Kan være `small`, `medium`, `large` eller en spesifikk verdi som `12px`, `1rem` eller `24`.',
      defaultValue: { summary: 'medium' },
    },
    columns: {
      controls: 'number',
      description: 'Bestemmer antall kolonner',
      defaultValue: { summary: '12' },
    },
  },
};

type Story = StoryObj<FhiGrid>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {
    gap: 'medium',
    columns: 12,
  },
  render: args => html`
    <fhi-grid gap=${args.gap} columns=${args.columns}>
      <div
        style="grid-column: span 6; font-family: var(--fhi-font-family-default); color: var(--fhi-color-accent-text-subtle); background: var(--fhi-color-accent-background-subtle); border: var(--fhi-dimension-border-width) solid var(--fhi-color-accent-border-subtle); padding: var(--fhi-spacing-200); border-radius: var(--fhi-border-radius-150); display: flex; justify-content: start; align-items: center;"
      >
        Slot
      </div>
      <div
        style="grid-column: span 3;  font-family: var(--fhi-font-family-default); color: var(--fhi-color-accent-text-subtle); background: var(--fhi-color-accent-background-subtle); border: var(--fhi-dimension-border-width) solid var(--fhi-color-accent-border-subtle); padding: var(--fhi-spacing-200); border-radius: var(--fhi-border-radius-150); display: flex; justify-content: start; align-items: center;"
      >
        Slot
      </div>
      <div
        style="grid-column: span 3;  font-family: var(--fhi-font-family-default); color: var(--fhi-color-accent-text-subtle); background: var(--fhi-color-accent-background-subtle); border: var(--fhi-dimension-border-width) solid var(--fhi-color-accent-border-subtle); padding: var(--fhi-spacing-200); border-radius: var(--fhi-border-radius-150); display: flex; justify-content: start; align-items: center;"
      >
        Slot
      </div>
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
      <div
        style="grid-column: span 4;  grid-row: span 2; font-family: var(--fhi-font-family-default); color: var(--fhi-color-accent-text-subtle); background: var(--fhi-color-accent-background-subtle); border: var(--fhi-dimension-border-width) solid var(--fhi-color-accent-border-subtle); padding: var(--fhi-spacing-200); border-radius: var(--fhi-border-radius-150); display: flex; justify-content: start; align-items: center;"
      >
        Slot
      </div>
      <div
        style="grid-column: span 4;  grid-row: span 2; font-family: var(--fhi-font-family-default); color: var(--fhi-color-accent-text-subtle); background: var(--fhi-color-accent-background-subtle); border: var(--fhi-dimension-border-width) solid var(--fhi-color-accent-border-subtle); padding: var(--fhi-spacing-200); border-radius: var(--fhi-border-radius-150); display: flex; justify-content: start; align-items: center;"
      >
        Slot
      </div>
      <div
        style="grid-column: span 4;  grid-row: span 2; font-family: var(--fhi-font-family-default); color: var(--fhi-color-accent-text-subtle); background: var(--fhi-color-accent-background-subtle); border: var(--fhi-dimension-border-width) solid var(--fhi-color-accent-border-subtle); padding: var(--fhi-spacing-200); border-radius: var(--fhi-border-radius-150); display: flex; justify-content: start; align-items: center;"
      >
        Slot
      </div>
      <div
        style="grid-column: span 6;  font-family: var(--fhi-font-family-default); color: var(--fhi-color-accent-text-subtle); background: var(--fhi-color-accent-background-subtle); border: var(--fhi-dimension-border-width) solid var(--fhi-color-accent-border-subtle); padding: var(--fhi-spacing-200); border-radius: var(--fhi-border-radius-150); display: flex; justify-content: start; align-items: center;"
      >
        Slot
      </div>
      <div
        style="grid-column: span 6;  font-family: var(--fhi-font-family-default); color: var(--fhi-color-accent-text-subtle); background: var(--fhi-color-accent-background-subtle); border: var(--fhi-dimension-border-width) solid var(--fhi-color-accent-border-subtle); padding: var(--fhi-spacing-200); border-radius: var(--fhi-border-radius-150); display: flex; justify-content: start; align-items: center;"
      >
        Slot
      </div>
      <div
        style="grid-column: span 10;  font-family: var(--fhi-font-family-default); color: var(--fhi-color-accent-text-subtle); background: var(--fhi-color-accent-background-subtle); border: var(--fhi-dimension-border-width) solid var(--fhi-color-accent-border-subtle); padding: var(--fhi-spacing-200); border-radius: var(--fhi-border-radius-150); display: flex; justify-content: start; align-items: center;"
      >
        Slot
      </div>
      <div
        style="grid-column: span 2; font-family: var(--fhi-font-family-default); color: var(--fhi-color-accent-text-subtle); background: var(--fhi-color-accent-background-subtle); border: var(--fhi-dimension-border-width) solid var(--fhi-color-accent-border-subtle); padding: var(--fhi-spacing-400); border-radius: var(--fhi-border-radius-150); display: flex; justify-content: start; align-items: center;"
      >
        Slot
      </div>
    </fhi-grid>
  `,
};

export default meta;
