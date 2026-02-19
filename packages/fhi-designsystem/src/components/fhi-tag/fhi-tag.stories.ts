import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FhiTag } from './fhi-tag.component';
import { ifDefined } from 'lit/directives/if-defined.js';
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
  render: args => html`<fhi-tag color=${ifDefined(args.color)}>Tag</fhi-tag>`,
  argTypes: {
    color: {
      options: ['neutral', 'accent', 'success', 'warning', 'danger', 'info'],
      control: { type: 'select' },
      description: 'Bestemmer fargetema.',
      defaultValue: { summary: 'neutral' },
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

export default meta;
