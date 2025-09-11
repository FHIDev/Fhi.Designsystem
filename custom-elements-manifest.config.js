import { getTsProgram, typeParserPlugin } from '@wc-toolkit/type-parser';

export default {
  globs: ['src/components/**/*.ts'],
  exclude: ['**/*.test.ts', '**/*.stories.ts'],
  // Give the plugin access to the TypeScript type checker
  overrideModuleCreation({ ts, globs }) {
    const program = getTsProgram(ts, globs, 'tsconfig.json');
    return program
      .getSourceFiles()
      .filter(sf => globs.find(glob => sf.fileName.includes(glob)));
  },
  plugins: [typeParserPlugin()],
  outdir: '/dist/npm',
};
