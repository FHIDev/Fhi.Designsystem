import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiHeadline } from './fhi-headline.component';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiHeadline();

const meta: Meta<FhiHeadline> = {
  title: 'Komponenter/Typography/Headline',
  component: 'fhi-headline',
  parameters: {},
  decorators: [],
  render: args =>
    html`<fhi-headline
      level=${args.level}
      size=${args.size}
      color=${ifDefined(args.color)}
      >Eksempel</fhi-headline
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
        '**Påkrevd**. Overskriftsnivået på elementet (f.eks. `level="3"` gir `<h3>`). Gyldige verdier er `1 | 2 | 3 | 4 | 5 | 6`.',
    },
    color: {
      control: { type: 'text' },
      description: 'Tekstfarge.',
      defaultValue: { summary: 'var(--fhi-color-neutral-text-default)' },
    },
  },
};

type Story = StoryObj<FhiHeadline>;

export const Preview: Story = {
  tags: [],
  args: { size: 'medium', level: 1 },
};

export default meta;
