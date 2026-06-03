import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiSelect } from './fhi-select.component';
import { FhiSelectItem } from './fhi-select-item.component';

import { FhiStorybookMeta } from '../../../.storybook/fhi-meta';

new FhiSelect();
new FhiSelectItem();

const meta: FhiStorybookMeta<FhiSelect> = {
  title: 'Komponenter/Select',
  component: 'fhi-select',
  parameters: {
    eventTypes: [
      {
        name: 'change',
        valueLocation: ['event.target.value'],
        description: 'Emitted when the selected option changes.',
      },
      {
        name: 'input',
        valueLocation: ['event.target.value'],
        description: 'Emitted when the selected option changes.',
      },
    ],
    methodTypes: [],
    slotTypes: [
      {
        name: '-',
        description:
          'The default slot used to pass `<fhi-select-item>` elements as options to the select component.',
      },
    ],
  },
  decorators: [],
  render: args =>
    html`<fhi-select
      name=${args.name}
      label=${args.label}
      ?disabled=${args.disabled}
    >
      <fhi-select-item>Velg Alternativ</fhi-select-item>
      <fhi-select-item>Norge</fhi-select-item>
      <fhi-select-item>Sverige</fhi-select-item>
      <fhi-select-item>Danmark</fhi-select-item>
    </fhi-select>`,
  argTypes: {
    name: {
      control: 'text',
      description:
        'The name attribute of the select element. This property is used to identify the selected option when submitting a form.',
    },
    label: {
      control: 'text',
      description:
        'The label attribute of the select element. This property is used to provide a descriptive label for the select element.',
    },
    disabled: {
      control: 'boolean',
      description:
        'When true, the select element is disabled and non-interactive.',
    },
    status: {
      control: 'select',
      options: ['error', undefined],
      description:
        'The status of the select element. When set to "error", the select element is styled to indicate an error state.',
    },
  },
};

type Story = StoryObj<FhiSelect>;

export const Preview: Story = {
  tags: [],
  args: {
    name: 'my-select',
    label: 'Land',
    disabled: false,
    status: undefined,
  },
};

export default meta;
