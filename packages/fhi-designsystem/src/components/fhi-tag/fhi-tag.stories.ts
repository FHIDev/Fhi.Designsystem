import type { StoryObj } from '@storybook/web-components-vite';

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { FhiTag } from './fhi-tag.component';
import { FhiIconRefresh } from '../icons/fhi-icon-refresh.component';
import { FhiFlex } from '../fhi-flex/fhi-flex.component';
import { FhiIconDownload } from '../icons/fhi-icon-download.component';
import { FhiIconClock } from '../icons/fhi-icon-clock.component';

import { FhiStorybookMeta } from '../../../.storybook/fhi-meta';

new FhiTag();
new FhiFlex();
new FhiIconRefresh();
new FhiIconDownload();
new FhiIconClock();

const meta: FhiStorybookMeta<FhiTag> = {
  title: 'Komponenter/Tag',
  component: 'fhi-tag',
  parameters: {},
  decorators: [],
  render: args =>
    html`<fhi-tag
      color=${ifDefined(args.color)}
      variant=${ifDefined(args.variant)}
      >Tag</fhi-tag
    >`,
  argTypes: {
    color: {
      options: ['neutral', 'accent', 'success', 'warning', 'danger', 'info'],
      control: { type: 'select' },
      description: 'Bestemmer fargetema.',
      defaultValue: { summary: 'neutral' },
    },
    variant: {
      options: ['subtle', 'bordered'],
      control: { type: 'select' },
      description: 'Bestemmer om taggen skal ha en kantlinje.',
      defaultValue: { summary: 'subtle' },
    },
  },
};

type Story = StoryObj<FhiTag>;

export const Preview: Story = {
  tags: [],
  args: { color: 'neutral' },
};

export const Icon: Story = {
  tags: ['!dev'],
  render: () =>
    html`<fhi-flex direction="row" gap="small" wrap>
      <fhi-tag color="neutral"
        ><fhi-icon-download></fhi-icon-download>Fra Folkeregisteret</fhi-tag
      >
      <fhi-tag color="accent"
        ><fhi-icon-refresh></fhi-icon-refresh>Pågår</fhi-tag
      >
      <fhi-tag color="success">Publisert</fhi-tag>
      <fhi-tag color="warning"
        ><fhi-icon-clock></fhi-icon-clock>Utløper snart</fhi-tag
      >
      <fhi-tag color="danger">Ugyldig</fhi-tag>
      <fhi-tag color="info">Offisiell statistikk</fhi-tag>
    </fhi-flex>`,
};

export const Subtle: Story = {
  tags: ['!dev'],
  render: () =>
    html`<fhi-flex direction="row" gap="small" wrap>
      <fhi-tag color="accent"> subtle </fhi-tag>
      <fhi-tag color="danger"> subtle </fhi-tag>
      <fhi-tag color="info"> subtle </fhi-tag>
      <fhi-tag color="neutral"> subtle </fhi-tag>
      <fhi-tag color="success"> subtle </fhi-tag>
      <fhi-tag color="warning"> subtle </fhi-tag>
    </fhi-flex>`,
};

export const Bordered: Story = {
  tags: ['!dev'],
  render: () =>
    html`<fhi-flex direction="row" gap="small" wrap>
      <fhi-tag color="accent" variant="bordered">
        bordered
      </fhi-tag>
      </fhi-tag>
      <fhi-tag color="danger" variant="bordered">
        bordered
      </fhi-tag>
      <fhi-tag color="info" variant="bordered">
        bordered
      </fhi-tag>
      <fhi-tag color="neutral" variant="bordered">
        bordered
      </fhi-tag>
      <fhi-tag color="success" variant="bordered">
        bordered
      </fhi-tag>
      <fhi-tag color="warning" variant="bordered">
        bordered
      </fhi-tag>
    </fhi-flex>`,
};

export default meta;
