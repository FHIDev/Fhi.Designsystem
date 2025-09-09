import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';

import { html } from 'lit';

import { FhiFlex } from './fhi-flex.component';
import { FhiButton } from '../fhi-button/fhi-button.component';
import { FhiIconArrowRightLeft } from '../icons/fhi-icon-arrow-right-left.component';

new FhiFlex();
new FhiButton();
new FhiIconArrowRightLeft();

const meta: Meta<FhiFlex> = {
  title: 'Komponenter/Flex',
  component: 'fhi-flex',
  parameters: {
    options: { selectedPanel: 'addon-controls' },
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
  decorators: [
    withActions,
    Story =>
      html`<div
        style="display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        ${Story()}
      </div>`,
  ],
  render: args =>
    html`<fhi-flex
      direction=${args.direction}
      gap=${args.gap}
      ?wrap=${args.wrap}
    ></fhi-flex>`,
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['row', 'column'],
      description: 'Bestemmer retning på elementene.',
      defaultValue: { summary: 'row' },
    },
    gap: {
      control: { tyope: 'text' },
      description:
        'Bestemmer avstand mellom elementene. Kan være <code>small</code>, <code>medium</code>, <code>large</code> eller en spesifikk verdi som <code>10px</code>, <code>1rem</code> eller <code>20<code>.',
      defaultValue: { summary: 'medium' },
    },
    wrap: {
      control: { type: 'boolean' },
      description:
        'Bestemmer om elementene skal brytes til neste linje ved behov.',
      defaultValue: { summary: false },
    },
  },
};
type Story = StoryObj<FhiFlex>;

export const Preview: Story = {
  args: {
    direction: 'row',
    gap: 'medium',
    wrap: false,
  },
  render: args => html`
    <fhi-flex direction=${args.direction} gap=${args.gap} ?wrap=${args.wrap}>
      <fhi-button variant="strong">Knapp</fhi-button>
      <fhi-button variant="subtle">Knapp</fhi-button>
      <fhi-button variant="text">Knapp</fhi-button>
    </fhi-flex>
  `,
};

export const RowDirection: Story = {
  args: {
    direction: 'row',
    gap: 'medium',
    wrap: false,
  },
  render: args => html`
    <fhi-flex direction=${args.direction} gap=${args.gap} ?wrap=${args.wrap}>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >Flex
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >med
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >Default/row
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >direction
      </section>
    </fhi-flex>
  `,
};

export const ColumnDirection: Story = {
  args: {
    direction: 'column',
    gap: 'medium',
    wrap: false,
  },
  render: args => html`
    <fhi-flex direction=${args.direction} gap=${args.gap} ?wrap=${args.wrap}>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >Flex
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >med
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >column
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >direction
      </section>
    </fhi-flex>
  `,
};

export const CustomGap: Story = {
  args: {
    direction: 'row',
    gap: '2rem',
    wrap: false,
  },
  argTypes: {
    gap: {
      control: { type: 'text' },
      description:
        'Bestemmer avstand mellom elementene. Kan være <code>small</code>, <code>medium</code>, <code>large</code> eller en spesifikk verdi som <code>10px</code>, <code>1rem</code> eller <code>20<code>.',
      defaultValue: { summary: 'medium' },
    },
    direction: {
      disabled: true,
    },
    wrap: {
      disabled: true,
    },
  },
  render: args => html`
    <fhi-flex direction=${args.direction} gap=${args.gap} ?wrap=${args.wrap}>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >Flex
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >med
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >custom
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >gap
      </section>
    </fhi-flex>
  `,
};

export const Wrap: Story = {
  args: {
    direction: 'row',
    gap: 'medium',
    wrap: true,
  },
  argTypes: {
    gap: {
      disabled: true,
    },
    direction: {
      disabled: true,
    },
    wrap: {
      disabled: false,
    },
  },
  render: args => html`
    <fhi-flex direction=${args.direction} gap=${args.gap} ?wrap=${args.wrap}>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >Flex
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >med
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >Wrap
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >på
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >Section
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >Section
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >Section
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >Section
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >Section
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >Section
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >Section
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >Section
      </section>
      <section
        style="background: #DAE7F7; padding: 1rem; border-radius: 12px; border: 2px dashed #2A76C6; display: flex; justify-content: start; align-items: center; gap: 1rem;"
      >
        <fhi-icon-arrow-right-left
          size="small"
          color="#2A76C6"
        ></fhi-icon-arrow-right-left
        >Section
      </section>
    </fhi-flex>
  `,
};

export default meta;
