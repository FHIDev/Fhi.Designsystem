import { cemSorterPlugin } from '@wc-toolkit/cem-sorter';
import { typeParserPlugin, getTsProgram } from '@wc-toolkit/type-parser';
import { customElementJetBrainsPlugin } from 'custom-element-jet-brains-integration';

export default {
  globs: ['src/components/**/*.component.ts'],
  exclude: ['**/*.test.ts', '**/*.stories.ts'],
  outdir: './.temp/',
  LitElement: true,
  overrideModuleCreation({ ts, globs }) {
    const program = getTsProgram(ts, globs, 'tsconfig.json');
    return program
      .getSourceFiles()
      .filter(sourceFile =>
        globs.find(glob => sourceFile.fileName.includes(glob)),
      );
  },
  plugins: [
    cemSorterPlugin({
      deprecatedLast: true,
      customFields: ['customProperty'],
    }),
    typeParserPlugin(),
    customElementJetBrainsPlugin({
      outdir: './.temp/',
      webTypesFileName: 'web-types.json',
      descriptionSrc: 'description',
      typesSrc: 'parsedType',
    }),
  ],
};
