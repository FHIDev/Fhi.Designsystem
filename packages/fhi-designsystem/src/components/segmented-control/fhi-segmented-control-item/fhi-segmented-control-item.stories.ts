import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiSegmentedControlItem } from './fhi-segmented-control-item.component';

import { FhiStorybookMeta } from '../../../../.storybook/fhi-meta';

new FhiSegmentedControlItem();

const meta: FhiStorybookMeta<FhiSegmentedControlItem> = {
  title: 'Komponenter/Segmented Control Item',
  component: 'fhi-segmented-control-item',
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
          'Bestemmer varianten til Segmented Control Item. Dette arves automatisk fra <fhi-segmented-control>.',
      },
    },
  },
  decorators: [],
  render: () => html`<fhi-segmented-control-item></fhi-segmented-control-item>`,
  argTypes: {},
};

type Story = StoryObj<FhiSegmentedControlItem>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {},
};

export default meta;
