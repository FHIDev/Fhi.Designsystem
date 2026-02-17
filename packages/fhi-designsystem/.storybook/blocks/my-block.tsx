import { useOf } from '@storybook/blocks';

/**
 * A block that displays the story name or title from the of prop
 * - if a story reference is passed, it renders the story name
 * - if a meta reference is passed, it renders the stories' title
 * - if nothing is passed, it defaults to the primary story
 */
export const StoryName = ({ of }) => {
  const resolvedOf = useOf(of || 'story', ['story', 'meta']);
  switch (resolvedOf.type) {
    case 'story': {
      return <h1>{resolvedOf.story.name}</h1>;
    }
    case 'meta': {
      return <h1>{resolvedOf.preparedMeta.title}</h1>;
    }
  }
  return null;
};
