import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiDisplay } from './fhi-display.component';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiDisplay();

const meta: Meta<FhiDisplay> = {
  title: 'Komponenter/Typography/Display',
  component: 'fhi-display',
  parameters: {},
  decorators: [],
  render: args =>
    html`<fhi-display
      level=${args.level}
      size=${args.size}
      color=${ifDefined(args.color)}
      >Eksempel</fhi-display
    >`,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'select' },
      description: 'Størrelsen på tekststilene.',
      defaultValue: { summary: 'medium' },
    },
    level: {
      options: [1, 2, 3, 4, 5, 6],
      control: { type: 'select' },
      description:
        'Overskriftsnivået på elementet (f.eks. `level="3"` gir `<h3>`). **Påkrevd**.',
    },
    color: {
      control: { type: 'text' },
      description: 'Tekstfarge.',
      defaultValue: { summary: 'var(--fhi-color-neutral-text-default)' },
    },
  },
};

type Story = StoryObj<FhiDisplay>;

export const Preview: Story = {
  tags: [],
  args: { size: 'large', level: 1 },
};

export default meta;
