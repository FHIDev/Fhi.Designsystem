import React from 'react';
import { useOf } from '@storybook/addon-docs/blocks';

import { FhiTag } from '../../src/components/fhi-tag/fhi-tag.component';
import { FhiTitle } from '../../src/components/typography/fhi-title/fhi-title.component';
import { FhiHeadline } from '../../src/components/typography/fhi-headline/fhi-headline.component';
import { FhiBody } from '../../src/components/typography/fhi-body/fhi-body.component';
import { FhiFlex } from '../../src/components/fhi-flex/fhi-flex.component';
import { FhiGrid } from '../../src/components/fhi-grid/fhi-grid.component';
import { FhiTooltip } from '../../src/components/fhi-tooltip/fhi-tooltip.component';
import { FhiIconCircleInfo } from '../../src/components/icons/fhi-icon-circle-info.component';

new FhiTag();
new FhiTitle();
new FhiBody();
new FhiFlex();
new FhiGrid();
new FhiTooltip();
new FhiIconCircleInfo();
new FhiHeadline();

const getStory = of => {
  const resolvedOf = useOf(of || 'story', ['story', 'meta']);

  if (!resolvedOf.story) {
    throw new Error(
      `Could not resolve a story for the given 'of' prop: ${of}. Please ensure that the reference is correct and that the story exists.`,
    );
  }

  return resolvedOf.story;
};

const generateSection = (name, head, bodyItems) => {
  let content;

  if (bodyItems?.length > 0) {
    content = (
      <table
        style={{
          borderSpacing: '0px',
          color: 'var(--fhi-color-neutral-text-default)',
          textAlign: 'left',
          width: '100%',
        }}
      >
        <thead
          style={{
            color: 'var(--fhi-color-neutral-text-subtle)',
            textAlign: 'left',
          }}
        >
          <tr>{head}</tr>
        </thead>
        <tbody>{bodyItems}</tbody>
      </table>
    );
  } else {
    content = (
      <fhi-body style={{ fontStyle: 'italic', padding: '1rem' }}>
        Denne komponenten har ingen
      </fhi-body>
    );
  }

  return (
    <section>
      <fhi-title level="3" size="large">{name}</fhi-title>
      {content}
      <br />
    </section>
  );
};

export const ApiDefinition = ({ of }) => {
  const story = getStory(of);

  const methods = story.parameters?.methodTypes || [];
  const events = story.parameters?.eventTypes || [];
  const slots = story.parameters?.slotTypes || [];
  const attributes =
    Object.entries(story.argTypes).map(([propName, attribute]) => {
      return {
        propertyName: propName,
        attributeName: attribute.name,
        description: attribute.description,
      };
    }) || [];

  const mainTitle = (
    <section>
      <fhi-headline level="2">API-definisjon</fhi-headline>
      <fhi-body>
        Denne seksjonen viser en oversikt over komponentens API utover det som
        er dekket av web-standarden.
      </fhi-body>
    </section>
  );

  return (
    <section
      style={{
        margin: 'var(--fhi-spacing-400) 0',
        padding: 'var(--fhi-spacing-400) 0',
        borderTop:
          'var(--fhi-dimension-border-width) solid var(--fhi-color-neutral-border-subtle)',
      }}
    >
      {mainTitle}
      <br />
      {generateSection(
        'Attributes',
        <>
          <th>Attributte navn</th>
          <th>Property navn</th>
          <th>Beskrivelse</th>
        </>,
        attributes.map((attribute, index) => (
          <tr key={index}>
            <td>{attribute.attributeName}</td>
            <td>{attribute.propertyName}</td>
            <td>{attribute.description}</td>
          </tr>
        )),
      )}
      {generateSection(
        'Methods',
        <>
          <th>Navn</th>
          <th>Beskrivelse</th>
        </>,
        methods.map((method, index) => (
          <tr key={index}>
            <td>{method.name}</td>
            <td>{method.description}</td>
          </tr>
        )),
      )}
      {generateSection(
        'Events',
        <>
          <th>Type</th>
          <th
            style={{
              display: 'flex',
              alignItems: 'center',
              border: 'unset',
            }}
          >
            Verdilokasjon
            <fhi-tooltip
              message="Eventet kan inneholde en referanse til komponenten sin verdi. Verdilokasjonen beskriver hvor i eventobjektet denne referansen finnes."
            >
              <fhi-icon-circle-info size="small" />
            </fhi-tooltip>
          </th>
          <th>Beskrivelse</th>
        </>,
        events.map((event, index) => (
          <tr key={index}>
            <td>{event.name}</td>
            <td>
              {event.valueLocation?.length > 0 ? (
                <fhi-flex wrap>
                  {event.valueLocation.map((location, index) => {
                    return (
                      <fhi-tag key={`${event.name}-${index}`}>
                        {location}
                      </fhi-tag>
                    );
                  })}
                </fhi-flex>
              ) : (
                '—'
              )}
            </td>
            <td>{event.description}</td>
          </tr>
        )),
      )}
      {generateSection(
        'Slots',
        <>
          <th>Navn</th>
          <th>Beskrivelse</th>
        </>,
        slots.map((slot, index) => (
          <tr key={index}>
            <td>{slot.name || '—'}</td>
            <td>{slot.description}</td>
          </tr>
        )),
      )}
    </section>
  );
};
