import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import { FhiSegmentedControl } from './fhi-segmented-control.component';
import { FhiSegmentedControlItem } from '../fhi-segmented-control-item/fhi-segmented-control-item.component';
import { FhiIconSheet } from '../../icons/fhi-icon-sheet.component';
import { FhiIconChartLine } from '../../icons/fhi-icon-chart-line.component';
import { FhiTooltip } from '../../fhi-tooltip/fhi-tooltip.component';

import { FhiStorybookMeta } from '../../../../.storybook/fhi-meta';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FhiLabel } from '../../typography/fhi-label/fhi-label.component';
import { FhiFlex } from '../../fhi-flex/fhi-flex.component';

new FhiSegmentedControl();
new FhiSegmentedControlItem();
new FhiIconSheet();
new FhiIconChartLine();
new FhiTooltip();

new FhiLabel();
new FhiFlex();

const meta: FhiStorybookMeta<FhiSegmentedControl> = {
  title: 'Komponenter/Segmented Control',
  component: 'fhi-segmented-control',
  parameters: {
    slotTypes: [
      {
        name: '-',
        description:
          'Alle knappene i gruppen. Bruk <fhi-segmented-control-item> for å definere knappene.',
      },
    ],
    eventTypes: [
      {
        name: 'change',
        valueLocation: ['event.target.value'],
        description: 'Utløses når et alternativ blir valgt.',
      },
    ],
  },
  argTypes: {
    value: {
      control: { type: 'text' },
      description:
        'Verdien til segmented control. Denne settes typisk av elementet selv når brukeren velger et alternativ, men kan også settes programmatisk.',
    },
    variant: {
      control: { type: 'select' },
      options: ['strong', 'subtle'],
      description:
        'Bestemmer variant og visuell stil. Alle <fhi-segmented-control-item> elementer vil automatisk arve denne.',
    },
  },
};

type Story = StoryObj<FhiSegmentedControl>;

export const Preview: Story = {
  tags: [],
  args: { variant: 'strong' },
  render: args => html`
    <fhi-segmented-control
      variant="${ifDefined(args.variant)}"
      value="${ifDefined(args.value)}"
      @change=${action('change')}
    >
      <fhi-segmented-control-item> Valg 1 </fhi-segmented-control-item>
      <fhi-segmented-control-item> Valg 2 </fhi-segmented-control-item>
      <fhi-segmented-control-item> Valg 3 </fhi-segmented-control-item>
    </fhi-segmented-control>
  `,
};

export const Example: Story = {
  tags: ['!dev'],
  args: { variant: 'subtle' },
  render: args => html`
    <fhi-flex direction="column" gap="small">
      <fhi-label id="segmented-control-example-label">Velg visning:</fhi-label>
      <fhi-segmented-control
        aria-labelledby="segmented-control-example-label"
        variant="${ifDefined(args.variant)}"
        value="${ifDefined(args.value)}"
        @change=${action('change')}
      >
        <fhi-segmented-control-item>
          <fhi-icon-sheet slot="icon"></fhi-icon-sheet>
          Tabell
        </fhi-segmented-control-item>
        <fhi-segmented-control-item>
          <fhi-icon-chart-line slot="icon"></fhi-icon-chart-line>
          Graf
        </fhi-segmented-control-item>
      </fhi-segmented-control>
    </fhi-flex>
  `,
};

export const WithIcon: Story = {
  tags: [],
  args: { variant: 'subtle' },
  render: args => html`
    <fhi-segmented-control
      variant="${ifDefined(args.variant)}"
      value="${ifDefined(args.value)}"
      @change=${action('change')}
    >
      <fhi-segmented-control-item>
        <fhi-icon-sheet slot="icon"></fhi-icon-sheet>
        Tabell
      </fhi-segmented-control-item>
      <fhi-segmented-control-item>
        <fhi-icon-chart-line slot="icon"></fhi-icon-chart-line>
        Graf
      </fhi-segmented-control-item>
    </fhi-segmented-control>
  `,
};

export const WithValue: Story = {
  tags: ['!dev'],
  args: { value: 'Fahrenheit' },
  render: args => html`
    <fhi-segmented-control
      variant="${ifDefined(args.variant)}"
      value="${ifDefined(args.value)}"
      @change=${action('change')}
    >
      <fhi-segmented-control-item>Celsius</fhi-segmented-control-item>
      <fhi-segmented-control-item>Fahrenheit</fhi-segmented-control-item>
      <fhi-segmented-control-item>Kelvin</fhi-segmented-control-item>
    </fhi-segmented-control>
  `,
};

export const WithItemValue: Story = {
  tags: ['!dev'],
  render: args => html`
    <fhi-segmented-control
      variant="${ifDefined(args.variant)}"
      value="${ifDefined(args.value)}"
      @change=${action('change')}
    >
      <fhi-segmented-control-item value="day">Dag</fhi-segmented-control-item>
      <fhi-segmented-control-item value="week">Uke</fhi-segmented-control-item>
      <fhi-segmented-control-item value="month"
        >Måned</fhi-segmented-control-item
      >
    </fhi-segmented-control>
  `,
};

export const WithItemSelected: Story = {
  tags: ['!dev'],
  render: args => html`
    <fhi-segmented-control
      variant="${ifDefined(args.variant)}"
      value="${ifDefined(args.value)}"
      @change=${action('change')}
    >
      <fhi-segmented-control-item>Celsius</fhi-segmented-control-item>
      <fhi-segmented-control-item>Fahrenheit</fhi-segmented-control-item>
      <fhi-segmented-control-item selected>Kelvin</fhi-segmented-control-item>
    </fhi-segmented-control>
  `,
};

export default meta;
