import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiCallout } from './fhi-callout.component';

import { FhiStorybookMeta } from '../../../.storybook/fhi-meta';
import { FhiBody } from '../typography/fhi-body/fhi-body.component';
import { FhiIconCircleInfo } from '../icons/fhi-icon-circle-info.component';
import { FhiIconOctagonAlert } from '../icons/fhi-icon-octagon-alert.component';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FhiFlex } from '../fhi-flex/fhi-flex.component';

new FhiCallout();
new FhiBody();
new FhiIconCircleInfo();
new FhiIconOctagonAlert();
new FhiFlex();

const meta: FhiStorybookMeta<FhiCallout> = {
  title: 'Komponenter/Callout',
  component: 'fhi-callout',
  parameters: {
    eventTypes: [],
    methodTypes: [],
    slotTypes: [
      {
        description:
          'Hovedinnholdet i Callout-en. Dette er beskjeden eller statusen som skal kommuniseres til brukeren.',
      },
      {
        name: 'icon',
        description: 'Valgfritt ikon som skal vises i Callout-en.',
      },
    ],
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
  decorators: [
    Story => html` <fhi-flex direction="column"> ${Story()} </fhi-flex> `,
  ],
  argTypes: {
    color: {
      control: 'select',
      defaultValue: {
        summary: 'neutral',
      },
      options: ['neutral', 'success', 'warning', 'danger'],
      description:
        'Bestemmer fargen på Callout-en. Dette formidler typen informasjon som kommuniseres.',
    },
    variant: {
      control: 'select',
      defaultValue: {
        summary: 'subtle',
      },
      options: ['subtle', 'bordered'],
      description:
        'Bestemmer varianten på Callout-en. Dette påvirker den visuelle stilen.',
    },
    heading: {
      control: 'text',
      defaultValue: {
        summary: undefined,
      },
      description:
        'Valgfri overskrift på Callout-en, for eksempel for å kort oppsummere innholdet.',
    },
  },
};

type Story = StoryObj<FhiCallout>;

export const Preview: Story = {
  tags: [],
  args: {
    color: 'neutral',
    variant: 'subtle',
    heading: undefined,
  },
  render: ({ color, variant, heading }) => html`
    <fhi-callout
      color=${color}
      variant=${variant}
      heading=${ifDefined(heading)}
    >
      <fhi-icon-circle-info slot="icon"></fhi-icon-circle-info>
      Callout kan brukes for å fremheve viktig informasjon til brukeren
    </fhi-callout>
  `,
};

export const Color: Story = {
  tags: ['!dev'],
  args: {},
  render: () => html`
    <fhi-callout color="neutral" heading="Neutral (default)">
      For nøytral informasjon til brukeren som må stå litt ekstra ut
    </fhi-callout>

    <fhi-callout color="success" heading="Success">
      For å melde at noe var en suksess, for eksempel en bekreftelse at en
      oppgave er fullført som forventet
    </fhi-callout>

    <fhi-callout color="warning" heading="Warning">
      For å advare brukeren om noe viktig, at handling kreves eller at man må
      trø videre varsomt
    </fhi-callout>

    <fhi-callout color="danger" heading="Danger">
      For å si ifra om at noe kritisk har skjedd eller kan skje, ofte noe som
      hindrer brukeren i å fortsette eller ikke kan angres
    </fhi-callout>
  `,
};

export const Variant: Story = {
  tags: ['!dev'],
  args: {},
  render: () => html`
    <fhi-callout color="success" heading="Subtle (default)">
      Standardvarianten og fungerer på de fleste flater.
    </fhi-callout>

    <fhi-callout color="success" heading="Bordered" variant="bordered">
      En subtil kant som kan bidra til å få komponenten (og dens
      fargeassosiasjon) til å stå ut mer
    </fhi-callout>
  `,
};

export const Icon: Story = {
  tags: ['!dev'],
  render: () => html`
    <fhi-callout color="warning">
      <fhi-icon-octagon-alert slot="icon"></fhi-icon-octagon-alert>
      Upublisert data skal kun brukes som avtalt med avsender. Denne
      forhåndsvisningen utløper 23. mars 2039 kl. 15.36.
    </fhi-callout>

    <fhi-callout color="neutral" heading="En ny oppdatering er tilgjengelig">
      <fhi-icon-circle-info slot="icon"></fhi-icon-circle-info>
      Vennligst oppdater til den nyeste versjonen for å få tilgang til de nyeste
      funksjonene og forbedringene.
    </fhi-callout>
  `,
};

export default meta;
