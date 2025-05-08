import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import { FhiIconArrowDownLeft } from './fhi-icon-arrow-down-left.component';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiIconArrowDownLeft();

const meta: Meta<FhiIconArrowDownLeft> = {
  title: 'Komponenter/Icons',
  component: 'fhi-icon-arrow-down-left',
  parameters: {},
  decorators: [],
  render: args =>
    html`<fhi-icon-arrow-down-left
      color=${ifDefined(args.color)}
      size=${ifDefined(args.size)}
    ></fhi-icon-arrow-down-left>`,
  argTypes: {
    color: {
      control: 'text',
      description:
        'Setter farge på ikonet. Skal helst være et farge token. Se [FHI design system: Farge Tokens](https://fhi-designsystem.netlify.app/komponenter/farge/#farge-variabler)',
      defaultValue: { summary: 'var(--fhi-color-neutral-text-default)' },
    },
    size: {
      control: 'number',
      description: 'Setter størelsen på ikonet i px.',
      defaultValue: { summary: 24 },
    },
  },
};

type Story = StoryObj<FhiIconArrowDownLeft>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {
    color: 'var(--fhi-color-neutral-text-default)',
    size: 24,
  },
};

export default meta;
