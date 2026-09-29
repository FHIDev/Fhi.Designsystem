import type { Meta, StoryObj } from '@storybook/web-components-vite';

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { FhiHeadline } from './fhi-headline.component';

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
      ?emphasized=${args.emphasized}
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
      defaultValue: { summary: 'currentcolor' },
    },
    emphasized: {
      control: { type: 'boolean' },
      description: 'Bestemmer om teksten er kursiv og semantisk fremhevet.',
      defaultValue: { summary: false },
    },
  },
};

type Story = StoryObj<FhiHeadline>;

export const Preview: Story = {
  tags: [],
  args: { size: 'medium', level: 1, emphasized: false },
};

export default meta;
