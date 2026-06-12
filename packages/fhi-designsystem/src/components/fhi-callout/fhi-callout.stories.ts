import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { FhiCallout } from './fhi-callout.component';

import { FhiStorybookMeta } from '../../../.storybook/fhi-meta';
import { FhiBody } from '../typography/fhi-body/fhi-body.component';
import { FhiIconCircleInfo } from '../icons/fhi-icon-circle-info.component';
import { FhiIconOctagonAlert } from '../icons/fhi-icon-octagon-alert.component';
import { ifDefined } from 'lit/directives/if-defined.js';

new FhiCallout();
new FhiBody();
new FhiIconCircleInfo();
new FhiIconOctagonAlert();

const meta: FhiStorybookMeta<FhiCallout> = {
  title: 'Komponenter/Callout',
  component: 'fhi-callout',
  parameters: {
    eventTypes: [],
    methodTypes: [],
    slotTypes: [
      {
        name: 'icon',
        description: 'Valgfritt ikon som skal vises i callouten.',
      },
      {
        name: 'message',
        description:
          'Hovedinnholdet i callouten. Dette er beskjeden eller statusen som skal kommuniseres til brukeren.',
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
        'Bestemmer fargen på callouten. Dette formidler typen informasjon som kommuniseres.',
    },
    variant: {
      control: 'select',
      defaultValue: {
        summary: 'subtle',
      },
      options: ['subtle', 'bordered'],
      description:
        'Bestemmer varianten på callouten. Dette påvirker utseendet og stilen.',
    },
    heading: {
      control: 'text',
      defaultValue: {
        summary: undefined,
      },
      description:
        'Bestemmer overskriften på callouten. Dette skal gi en kort oppsummering av innholdet.',
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
      <fhi-body slot="message"
        >Dette er en callout. Brukes for å fremheve viktig informasjon til
        brukeren.</fhi-body
      >
    </fhi-callout>
  `,
};

export const Color: Story = {
  tags: ['!dev'],
  args: {},
  render: () => html`
    <fhi-callout color="neutral" heading="Nøytral (neutral)">
      <fhi-body slot="message">
        (default) for nøytral informasjon til brukeren</fhi-body
      >
    </fhi-callout>

    <fhi-callout color="success" heading="Suksess (success)">
      <fhi-body slot="message"
        >som bekreftelse at en oppgave er fullført som forventet</fhi-body
      >
    </fhi-callout>

    <fhi-callout color="warning" heading="Advarsel (warning)">
      <fhi-body slot="message"
        >for å advare brukeren om noe viktig eller at handling kreves</fhi-body
      >
    </fhi-callout>

    <fhi-callout color="danger" heading="Fare (danger)">
      <fhi-body slot="message"
        >for å si ifra om at noe kritisk har skjedd, ofte noe som hindrer
        brukeren i å fortsette</fhi-body
      >
    </fhi-callout>
  `,
};

export const Variant: Story = {
  tags: ['!dev'],
  args: {},
  render: () => html`
    <fhi-callout color="success" heading="subtle">
      <fhi-body slot="message">
        (default) Standardvarianten og fungerer på de fleste flater.</fhi-body
      >
    </fhi-callout>

    <fhi-callout color="success" heading="bordered" variant="bordered">
      <fhi-body slot="message"
        >En subtil kant rundt taggen kan bidra til å få komponenten (og dets
        fargeassosiasjon) til å stå ut mer.</fhi-body
      >
    </fhi-callout>
  `,
};

export const Icon: Story = {
  tags: ['!dev'],
  render: () => html`
    <fhi-callout color="warning">
      <fhi-icon-octagon-alert slot="icon"></fhi-icon-octagon-alert>
      <fhi-body slot="message"
        >Upublisert data skal kun brukes som avtalt med avsender. Denne
        forhåndsvisningen utløper 23. mars 2024 kl. 15.36.</fhi-body
      >
    </fhi-callout>

    <fhi-callout color="neutral" heading="En ny oppdatering er tilgjengelig">
      <fhi-icon-circle-info slot="icon"></fhi-icon-circle-info>
      <fhi-body slot="message">
        Vennligst oppdater til den nyeste versjonen for å få tilgang til de
        nyeste funksjonene og forbedringene.</fhi-body
      >
    </fhi-callout>
  `,
};

export default meta;
