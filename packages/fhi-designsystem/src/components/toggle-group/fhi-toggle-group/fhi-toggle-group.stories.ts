import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import { FhiToggleGroup } from './fhi-toggle-group.component';
import { FhiToggleGroupItem } from '../fhi-toggle-group-item/fhi-toggle-group-item.component';
import { FhiIconSheet } from '../../icons/fhi-icon-sheet.component';
import { FhiIconChartLine } from '../../icons/fhi-icon-chart-line.component';
import { FhiTooltip } from '../../fhi-tooltip/fhi-tooltip.component';

import { FhiStorybookMeta } from '../../../../.storybook/fhi-meta';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiToggleGroup();
new FhiToggleGroupItem();
new FhiIconSheet();
new FhiIconChartLine();
new FhiTooltip();

const meta: FhiStorybookMeta<FhiToggleGroup> = {
  title: 'Komponenter/Toggle Group',
  component: 'fhi-toggle-group',
  parameters: {
    slotTypes: [
      {
        name: '-',
        description: '<fhi-toggle-group-item> knapper som vises i gruppen.',
      },
    ],
    eventTypes: [
      {
        name: 'change',
        valueLocation: ['event.target.value'],
        description: 'Blir utløst når en knapp i toggle-gruppen blir valgt.',
      },
    ],
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['strong', 'subtle'],
      description:
        'Variant av Toggle Group. Dette påvirker den visuelle stilen til gruppen.',
    },
  },
};

type Story = StoryObj<FhiToggleGroup>;

export const Preview: Story = {
  tags: [],
  args: { variant: 'strong' },
  render: args => html`
    <fhi-toggle-group
      variant="${ifDefined(args.variant)}"
      @change=${action('change')}
    >
      <fhi-toggle-group-item>Valg</fhi-toggle-group-item>
      <fhi-toggle-group-item>Valg</fhi-toggle-group-item>
      <fhi-toggle-group-item>Valg</fhi-toggle-group-item>
    </fhi-toggle-group>
  `,
};

export const WithIcon: Story = {
  tags: [],
  args: { variant: 'strong' },
  render: args => html`
    <fhi-toggle-group
      variant="${ifDefined(args.variant)}"
      @change=${action('change')}
    >
      <fhi-toggle-group-item>
        <fhi-icon-sheet slot="icon"></fhi-icon-sheet>
        Tabell
      </fhi-toggle-group-item>
      <fhi-toggle-group-item>
        <fhi-icon-chart-line slot="icon"></fhi-icon-chart-line>
        Graf
      </fhi-toggle-group-item>
    </fhi-toggle-group>
  `,
};

export default meta;
