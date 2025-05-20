import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiTooltip } from './fhi-tooltip.component';
import { FhiButton } from '../fhi-button/fhi-button.component';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiTooltip();
new FhiButton();

const meta: Meta<FhiTooltip> = {
  title: 'Komponenter/Tooltip',
  component: 'fhi-tooltip',
  parameters: {},
  decorators: [],

  render: args => html`
    <fhi-tooltip
      message=${ifDefined(args.message)}
      placement=${ifDefined(args.placement)}
      trigger=${ifDefined(args.trigger)}
      max-width=${ifDefined(args.maxWidth)}
    >
      <fhi-button size="small" variant="outlined"
        >Hover for å åpne tooltip</fhi-button
      >
    </fhi-tooltip>
  `,
  argTypes: {
    message: {
      control: 'text',
      description: 'Tekst som vises i tooltip-en',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'topStart',
        'topEnd',
        'bottom',
        'bottomStart',
        'bottomEnd',
        'left',
        'leftStart',
        'leftEnd',
        'right',
        'rightStart',
        'rightEnd',
      ],
      description: 'Plassering av tooltip-en i forhold til slot elementet.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top' },
      },
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'Hvordan man åpner tooltip-en.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'hover' },
      },
    },
    maxWidth: {
      name: 'max-width',
      control: 'text',
      description: 'Maksimal bredde på tooltip-en.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '18.75rem' },
      },
    },
  },
};

type Story = StoryObj<FhiTooltip>;

export const Preview: Story = {
  tags: ['!dev'],
  args: {
    message: 'Liten og informativ tekst',
  },
};

export const Placement: Story = {
  tags: ['!dev'],
  render: args => html`
    <section
      style="
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 1rem;
        "
    >
      <section
        style="
            grid-row: 1;
            grid-column: 2;
            display: flex;
            justify-content: center;
            align-items: end;
            gap: 1rem;
          "
      >
        <fhi-tooltip
          message=${args.message}
          delay="150"
          placement="topStart"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">topStart</fhi-button>
        </fhi-tooltip>

        <fhi-tooltip
          message=${args.message}
          delay="150"
          placement="top"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">top</fhi-button>
        </fhi-tooltip>
        <fhi-tooltip
          message=${args.message}
          delay="150"
          placement="topEnd"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">topEnd</fhi-button>
        </fhi-tooltip>
      </section>
      <section
        style="
            grid-row: 2;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: end;
          "
      >
        <fhi-tooltip
          message=${args.message}
          delay="150"
          placement="leftStart"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">leftStart</fhi-button>
        </fhi-tooltip>
        <fhi-tooltip
          message=${args.message}
          delay="150"
          placement="left"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">left</fhi-button>
        </fhi-tooltip>
        <fhi-tooltip
          message=${args.message}
          delay="150"
          placement="leftEnd"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">leftEnd</fhi-button>
        </fhi-tooltip>
      </section>
      <section
        style="
            grid-row: 2;
            grid-column: 3;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          "
      >
        <fhi-tooltip
          message=${args.message}
          delay="150"
          placement="rightStart"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">rightStart</fhi-button>
        </fhi-tooltip>
        <fhi-tooltip
          message=${args.message}
          delay="150"
          placement="right"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">right</fhi-button>
        </fhi-tooltip>
        <fhi-tooltip
          message=${args.message}
          delay="150"
          placement="rightEnd"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">rightEnd</fhi-button>
        </fhi-tooltip>
      </section>
      <section
        style="
            grid-row: 3;
            grid-column: 2;
            display: flex;
            justify-content: center;
            gap: 1rem;
          "
      >
        <fhi-tooltip
          message=${args.message}
          delay="150"
          placement="bottomStart"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">bottomStart</fhi-button>
        </fhi-tooltip>
        <fhi-tooltip
          message=${args.message}
          delay="150"
          placement="bottom"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">bottom</fhi-button>
        </fhi-tooltip>
        <fhi-tooltip
          message=${args.message}
          delay="150"
          placement="bottomEnd"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">bottomEnd</fhi-button>
        </fhi-tooltip>
      </section>
    </section>
  `,
  args: {
    message: 'Dette er en tooltip som går over flere linjer',
  },
};

export default meta;
