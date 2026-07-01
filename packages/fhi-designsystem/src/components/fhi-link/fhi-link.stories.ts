import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiLink } from './fhi-link.component';
import { FhiBody } from '../typography/fhi-body/fhi-body.component';

import { FhiStorybookMeta } from '../../../.storybook/fhi-meta';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiLink();
new FhiBody();

const meta: FhiStorybookMeta<FhiLink> = {
  title: 'Komponenter/Link',
  component: 'fhi-link',
  parameters: {
    eventTypes: [],
    methodTypes: [],
    slotTypes: [
      {
        description: 'Innholdet som vises i lenken. Typisk ren tekst.',
      },
    ],
  },
  decorators: [],
  render: args =>
    html`<fhi-link
      href="${ifDefined(args.href)}"
      target="${ifDefined(args.target)}"
      >Gå til FHI sin hjemmeside</fhi-link
    >`,
  argTypes: {
    href: {
      name: 'href',
      description: 'URL for lenken.',
      control: { type: 'text' },
    },
    target: {
      name: 'target',
      description:
        'Angir hvor lenken skal åpnes. For mer informasjon, se: [MDN Target Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#target)',
      control: { type: 'select' },
      options: ['_self', '_blank', '_parent', '_top'],
      defaultValue: { summary: '_self' },
    },
  },
};

type Story = StoryObj<FhiLink>;

export const Preview: Story = {
  tags: [],
  args: {
    href: 'https://www.fhi.no/',
    target: '_blank',
  },
};

export const Example: Story = {
  tags: ['!dev'],
  render: args =>
    html`<fhi-body>
      FHI Designsystem er et levende system under kontinuerlig, iterativ
      utvikling. Kom gjerne med innspill, behov og tilbakemeldinger, for
      eksempel gjennom
      <fhi-link
        href="${ifDefined(args.href)}"
        target="${ifDefined(args.target)}"
      >
        våre skjema på Github
      </fhi-link>
    </fhi-body> `,
  args: {
    href: 'https://github.com/FHIDev/Fhi.Designsystem/issues',
    target: '_blank',
  },
};

export const Target: Story = {
  tags: ['!dev'],
  render: args =>
    html`<fhi-link
      href="${ifDefined(args.href)}"
      target="${ifDefined(args.target)}"
    >
      Denne lenken åpner SSB.no i en ny fane
    </fhi-link>`,
  args: {
    href: 'https://www.ssb.no/',
    target: '_blank',
  },
};

export default meta;
