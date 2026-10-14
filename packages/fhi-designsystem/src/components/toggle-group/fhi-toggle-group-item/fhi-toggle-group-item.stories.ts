import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiToggleGroupItem } from './fhi-toggle-group-item.component';

import { FhiStorybookMeta } from '../../../../.storybook/fhi-meta';

new FhiToggleGroupItem();

const meta: FhiStorybookMeta<FhiToggleGroupItem> = {
  title: 'Komponenter/Toggle Group Item',
  component: 'fhi-toggle-group-item',
  parameters: {
    eventTypes: [
      {
        name: 'click',
        description: 'Blir utløst når valget klikkes på.',
      },
    ],
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
          'Bestemmer varianten til Toggle Group Item. arver automatisk variant fra <fhi-toggle-group>.',
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
