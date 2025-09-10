import { litPlugin } from 'cem-plugin-lit-describe';

export default {
  globs: ['packages/fhi-designsystem/src/components/**/*.ts'],
  exclude: ['**/*.test.ts', '**/*.stories.ts'],
  plugins: [litPlugin()],
  outdir: 'packages/fhi-designsystem/custom-elements.json',
  litelement: true,
};
