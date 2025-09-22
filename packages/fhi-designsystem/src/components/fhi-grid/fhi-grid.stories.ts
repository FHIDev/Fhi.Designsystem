import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiGrid } from './fhi-grid.component';
import { FhiButton } from '../fhi-button/fhi-button.component';

new FhiGrid();
new FhiButton();

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
      control: { type: 'text' },
      description:
        'Bestemmer avstand mellom elementene. Kan være <code>small</code>, <code>medium</code>, <code>large</code> eller en spesifikk verdi som <code>10px</code>, <code>1rem</code> eller <code>20<code>.',
      defaultValue: { summary: 'medium' },
    },
  },
};

type Story = StoryObj<FhiGrid>;

export const Preview: Story = {
  tags: [],
  args: {
    gap: 'medium',
  },
  render: args => html`
    <fhi-flex gap=${args.gap}>
      <fhi-button variant="strong">Knapp</fhi-button>
      <fhi-button variant="subtle">Knapp</fhi-button>
      <fhi-button variant="text">Knapp</fhi-button>
    </fhi-flex>
  `,
};

export default meta;
