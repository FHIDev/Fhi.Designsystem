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
import { FhiLabel } from '../../typography/fhi-label/fhi-label.component';
import { FhiFlex } from '../../fhi-flex/fhi-flex.component';

new FhiToggleGroup();
new FhiToggleGroupItem();
new FhiIconSheet();
new FhiIconChartLine();
new FhiTooltip();

new FhiLabel();
new FhiFlex();

const meta: FhiStorybookMeta<FhiToggleGroup> = {
  title: 'Komponenter/Toggle Group',
  component: 'fhi-toggle-group',
  parameters: {
    slotTypes: [
      {
        name: '-',
        description:
          'Alle knappene i gruppen. Bruk <fhi-toggle-group-item> for å definere knappene.',
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
        'Verdien til toggle group. Denne settes typisk av elementet selv når brukeren velger et alternativ, men kan også settes programmatisk.',
    },
    variant: {
      control: { type: 'select' },
      options: ['strong', 'subtle'],
      description:
        'Bestemmer variant og visuell stil. Alle <fhi-toggle-group-item> elementer vil automatisk arve denne.',
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
      value="${ifDefined(args.value)}"
      @change=${action('change')}
    >
      <fhi-toggle-group-item> Valg 1 </fhi-toggle-group-item>
      <fhi-toggle-group-item> Valg 2 </fhi-toggle-group-item>
      <fhi-toggle-group-item> Valg 3 </fhi-toggle-group-item>
    </fhi-toggle-group>
  `,
};

export const Example: Story = {
  tags: ['!dev'],
  args: { variant: 'subtle' },
  render: args => html`
    <fhi-flex direction="column" gap="small">
      <fhi-label id="toggle-group-example-label">Velg visning:</fhi-label>
      <fhi-toggle-group
        aria-labelledby="toggle-group-example-label"
        variant="${ifDefined(args.variant)}"
        value="${ifDefined(args.value)}"
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
    </fhi-flex>
  `,
};

export const WithIcon: Story = {
  tags: [],
  args: { variant: 'subtle' },
  render: args => html`
    <fhi-toggle-group
      variant="${ifDefined(args.variant)}"
      value="${ifDefined(args.value)}"
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

export const WithValue: Story = {
  tags: ['!dev'],
  args: { value: 'Fahrenheit' },
  render: args => html`
    <fhi-toggle-group
      variant="${ifDefined(args.variant)}"
      value="${ifDefined(args.value)}"
      @change=${action('change')}
    >
      <fhi-toggle-group-item>Celsius</fhi-toggle-group-item>
      <fhi-toggle-group-item>Fahrenheit</fhi-toggle-group-item>
      <fhi-toggle-group-item>Kelvin</fhi-toggle-group-item>
    </fhi-toggle-group>
  `,
};

export const WithItemValue: Story = {
  tags: ['!dev'],
  render: args => html`
    <fhi-toggle-group
      variant="${ifDefined(args.variant)}"
      value="${ifDefined(args.value)}"
      @change=${action('change')}
    >
      <fhi-toggle-group-item value="day">Dag</fhi-toggle-group-item>
      <fhi-toggle-group-item value="week">Uke</fhi-toggle-group-item>
      <fhi-toggle-group-item value="month">Måned</fhi-toggle-group-item>
    </fhi-toggle-group>
  `,
};

export const WithItemSelected: Story = {
  tags: ['!dev'],
  render: args => html`
    <fhi-toggle-group
      variant="${ifDefined(args.variant)}"
      value="${ifDefined(args.value)}"
      @change=${action('change')}
    >
      <fhi-toggle-group-item>Celsius</fhi-toggle-group-item>
      <fhi-toggle-group-item>Fahrenheit</fhi-toggle-group-item>
      <fhi-toggle-group-item selected>Kelvin</fhi-toggle-group-item>
    </fhi-toggle-group>
  `,
};

export default meta;
