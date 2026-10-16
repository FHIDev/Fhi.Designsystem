import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiToggleGroupItem } from './fhi-toggle-group-item.component';

import { FhiStorybookMeta } from '../../../../.storybook/fhi-meta';

new FhiToggleGroupItem();

const meta: FhiStorybookMeta<FhiToggleGroupItem> = {
  title: 'Komponenter/Toggle Group Item',
  component: 'fhi-toggle-group-item',
  parameters: {
    slotTypes: [
      {
        name: 'icon',
        description: 'Valgfritt ikon.',
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
          'Bestemmer varianten til Toggle Group Item. Dette arves automatisk fra <fhi-toggle-group>.',
      },
    },
  },
  decorators: [],
  render: () => html`<fhi-toggle-group-item></fhi-toggle-group-item>`,
  argTypes: {},
};

type Story = StoryObj<FhiToggleGroupItem>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {},
};

export default meta;
