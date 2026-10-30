import type { StoryObj } from '@storybook/web-components-vite';

import { html, render } from 'lit';

import { FhiChip } from './fhi-chip.component';
import { FhiFlex } from '../fhi-flex/fhi-flex.component';
import { FhiButton } from '../fhi-button/fhi-button.component';

import { FhiStorybookMeta } from '../../../.storybook/fhi-meta';
import { action } from 'storybook/actions';

new FhiChip();
new FhiFlex();
new FhiButton();

const meta: FhiStorybookMeta<FhiChip> = {
  title: 'Komponenter/Chip',
  component: 'fhi-chip',
  parameters: {
    eventTypes: [
      {
        name: 'click',
        description: 'Utløses når chipen klikkes.',
      },
    ],
    slotTypes: [
      {
        description: 'Tekstinnholdet som vises i chipen.',
      },
    ],
  },
  decorators: [],
  render: () => html`<fhi-chip @click=${action('click')}>Chip</fhi-chip>`,
  argTypes: {},
};

type Story = StoryObj<FhiChip>;

export const Preview: Story = {
  tags: [],
  args: {},
};

export const Multiple: Story = {
  tags: ['!dev'],
  render: () => {
    const defaultChips = [
      'Zoonoser',
      'Influensa',
      'Koronavirus',
      'Meslinger',
      'Tuberkulose',
      'Malaria',
      'Ebola',
    ];

    let currentChips = [...defaultChips];

    const container = document.createElement('div');

    const removeChip = (chipToRemove: string) => {
      currentChips = currentChips.filter(chip => chip !== chipToRemove);
      draw();
    };

    const resetChips = () => {
      currentChips = [...defaultChips];
      draw();
    };

    const draw = () =>
      render(
        html`
          <fhi-flex direction="column" gap="large">
            <ul
              style="display: flex; flex-wrap: wrap; gap: var(--fhi-spacing-100); list-style: none; margin: 0; padding: 0;"
            >
              ${currentChips.map(chip => {
                return html`
                  <li>
                    <fhi-chip
                      aria-label=${`Fjern ${chip}`}
                      @click=${() => removeChip(chip)}
                      >${chip}</fhi-chip
                    >
                  </li>
                `;
              })}
            </ul>
            <fhi-button
              color="neutral"
              size="small"
              type="button"
              @click=${resetChips}
            >
              Reset
            </fhi-button>
          </fhi-flex>
        `,
        container,
      );

    draw();

    return container;
  },
};

export default meta;
