import React from 'react';
import { useOf } from '@storybook/blocks';

import { FhiTag } from '../../src/components/fhi-tag/fhi-tag.component';
import { FhiTitle } from '../../src/components/fhi-title/fhi-title.component';
import { FhiBody } from '../../src/components/fhi-body/fhi-body.component';

/**
 * A block that displays the story name or title from the of prop
 * - if a story reference is passed, it renders the story name
 * - if a meta reference is passed, it renders the stories' title
 * - if nothing is passed, it defaults to the primary story
 */
export const StoryName = ({ of }) => {
  const resolvedOf = useOf(of || 'story', ['story', 'meta']);
  console.log(
    '------------------------------------------------------------------------------',
    resolvedOf,
  );

  if (!resolvedOf.story) {
    throw new Error(
      `Could not resolve a story for the given 'of' prop: ${of}. Please ensure that the reference is correct and that the story exists.`,
    );
  }

  const events = resolvedOf.story?.parameters?.eventTypes;

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <section>
      <fhi-title level="1">Events:</fhi-title>
      {events.map((event, index) => (
        <div key={`event-name-${index}`}>
          <fhi-tag>{event.name}</fhi-tag>
          <fhi-body level="1">{event.description}</fhi-body>
        </div>
      ))}
    </section>
  );
};
