import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiToggleGroupItem } from './fhi-toggle-group-item.component';

import { FhiStorybookMeta } from '../../../../.storybook/fhi-meta';

new FhiToggleGroupItem();

const meta: FhiStorybookMeta<FhiToggleGroupItem> = {
  title: 'Komponenter/Component',
  component: 'fhi-toggle-group-item',
  parameters: {
    eventTypes: [],
    slotTypes: [
      {
        name: 'icon',
        description: 'Valgfritt ikon som plaseres på venstre side av knappen.',
      },
      {
        name: '-',
        description: 'Tekstinnholdet som vises i knappen.',
      },
    ],
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['strong', 'subtle'],
        description:
          'Variant av Toggle Group Item. Alle <fhi-toggle-group-item> elementer i gruppen arver varianten fra <fhi-toggle-group>.',
      },
    },
  },
  decorators: [],
  render: () => html`<fhi-toggle-group-item></fhi-toggle-group-item>`,
  argTypes: {},
};

type Story = StoryObj<FhiToggleGroupItem>;

export const Preview: Story = {
  tags: [],
  args: {},
};

export default meta;
