import { cemSorterPlugin } from '@wc-toolkit/cem-sorter';
import { typeParserPlugin } from '@wc-toolkit/type-parser';

export default {
  globs: ['src/components/**/*.component.ts'],
  exclude: ['**/*.test.ts', '**/*.stories.ts'],
  outdir: 'dist/npm/',
  LitElement: true,
  plugins: [
    cemSorterPlugin({
      deprecatedLast: true,
      customFields: ['customProperty'],
    }),
    typeParserPlugin({ propertyName: 'expandedType' }),
  ],
};
