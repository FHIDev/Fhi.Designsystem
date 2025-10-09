import { cemSorterPlugin } from '@wc-toolkit/cem-sorter';
import { typeParserPlugin } from '@wc-toolkit/type-parser';
import { customElementJetBrainsPlugin } from 'custom-element-jet-brains-integration';

const options = {
  outdir: './.temp/',
  webTypesFileName: 'web-types.json',
  descriptionSrc: 'description',
  hideSlotDocs: false,
  hideEventDocs: false,
  hideCssPropertiesDocs: false,
  hideCssPartsDocs: false,
  hideMethodDocs: true,
  excludeHtml: false,
  excludeCss: true,
  labels: {
    slots: 'Slot Section',
    events: 'Custom Events',
    cssProperties: 'CSS Variables',
    cssParts: 'Style Hooks',
    methods: 'Methods',
  },
  typesSrc: 'expandedType',
};

export default {
  globs: ['src/components/**/*.component.ts'],
  exclude: ['**/*.test.ts', '**/*.stories.ts'],
  outdir: './.temp/',
  LitElement: true,
  plugins: [
    cemSorterPlugin({
      deprecatedLast: true,
      customFields: ['customProperty'],
    }),
    typeParserPlugin({ propertyName: 'expandedType' }),
    customElementJetBrainsPlugin(options),
  ],
};
