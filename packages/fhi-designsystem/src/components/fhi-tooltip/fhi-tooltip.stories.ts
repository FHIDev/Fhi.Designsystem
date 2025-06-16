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
      delay=${ifDefined(args.delay)}
    >
      <fhi-button size="medium" variant="outlined">Åpne tooltip</fhi-button>
    </fhi-tooltip>
  `,
  argTypes: {
    message: {
      control: 'text',
      description:
        'Tekst som vises i tooltip-en. Uten message vil tooltip-en ikke vises.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
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
    delay: {
      control: 'number',
      description:
        'Hvor lenge, i millisekunder, tooltip-en venter før den vises.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '500' },
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
  parameters: {
    layout: 'centered',
  },
  render: args => html`
    <section
      style="
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
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
          placement="top-start"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">top-start</fhi-button>
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
          placement="top-end"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">top-end</fhi-button>
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
          placement="left-start"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">left-start</fhi-button>
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
          placement="left-end"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">left-end</fhi-button>
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
          placement="right-start"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">right-start</fhi-button>
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
          placement="right-end"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">right-end</fhi-button>
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
          placement="bottom-start"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">bottom-start</fhi-button>
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
          placement="bottom-end"
          max-width="9rem"
        >
          <fhi-button size="small" variant="outlined">bottom-end</fhi-button>
        </fhi-tooltip>
      </section>
    </section>
  `,
  args: {
    message: 'Dette er en tooltip som går over flere linjer',
  },
};

export const Default: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    message: 'Liten og informativ tekst',
  },
};

export default meta;
