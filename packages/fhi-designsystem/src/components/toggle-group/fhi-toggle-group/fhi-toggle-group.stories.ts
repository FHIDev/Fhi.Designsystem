import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import { FhiToggleGroup } from './fhi-toggle-group.component';
import { FhiToggleGroupItem } from '../fhi-toggle-group-item/fhi-toggle-group-item.component';

import { FhiStorybookMeta } from '../../../../.storybook/fhi-meta';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiToggleGroup();
new FhiToggleGroupItem();

const meta: FhiStorybookMeta<FhiToggleGroup> = {
  title: 'Komponenter/Toggle Group',
  component: 'fhi-toggle-group',
  parameters: {
    slotTypes: [
      {
        name: '-',
        description: 'Tekstinnholdet i knappen.',
      },
      {
        name: 'icon',
        description:
          'Ikon som plaseres på venstre side av knappen. En knapp kan ha både tekst og ikon, eller kun ikon.',
      },
    ],
    eventTypes: [
      {
        name: 'click',
        description: 'Blir utløst når en knapp blir klikket på.',
      },
    ],
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['strong', 'subtle'],
    },
  },
};

type Story = StoryObj<FhiToggleGroup>;

export const Preview: Story = {
  tags: [],
  args: { variant: 'strong' },
  render: args => html`
    <fhi-toggle-group variant="${ifDefined(args.variant)}">
      <fhi-toggle-group-item>Option 1</fhi-toggle-group-item>
      <fhi-toggle-group-item>Option 2</fhi-toggle-group-item>
      <fhi-toggle-group-item>Option 3</fhi-toggle-group-item>
    </fhi-toggle-group>
  `,
};

export default meta;
