import { defineConfig, loadEnv } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import generateFile from 'vite-plugin-generate-file';

const OUTPUT_DIRECTORY = 'dist';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  if (!env.DEPLOY_TARGET) {
    console.log("No DEPLOY_TARGET specified, defaulting to 'npm'");
    env.DEPLOY_TARGET = 'npm';
  }

  switch (env.DEPLOY_TARGET) {
    case 'cdn':
      return {
        plugins: [
          generateFile({
            output: './index.html',
          }),
          viteStaticCopy({
            targets: [
              {
                src: 'src/theme',
                dest: './',
              },
              {
                src: 'staticwebapp.config.json',
                dest: './',
              },
            ],
          }),
        ],
        build: {
          lib: {
            entry: './src/library.ts',
            name: 'fhi-designsystem',
            fileName: 'fhi-designsystem',
          },
          sourcemap: true,
          outDir: `${OUTPUT_DIRECTORY}/cdn`,
        },
      };
    case 'npm':
      return {
        plugins: [
          viteStaticCopy({
            targets: [
              {
                src: 'package.json',
                dest: './',
              },
              {
                src: 'README.md',
                dest: './',
              },
              {
                src: 'src/theme',
                dest: './',
              },
            ],
          }),
        ],
        build: {
          lib: {
            formats: ['es'],
            entry: {
              /*
                If you create a new component you need to add a reference to it here, e.g:
                "new-component": "./src/components/new-component/new-component.ts",
            */
              index: './src/library.ts',
              'fhi-text-input': './src/components/fhi-text-input',
            },
          },
          sourcemap: true,
          rollupOptions: {
            output: {
              globals: {
                lit: 'lit',
              },
            },
          },
          outDir: `${OUTPUT_DIRECTORY}/npm`,
        },
      };
    default:
      throw Error(
        `Unknown DEPLOY_TARGET: ${env.DEPLOY_TARGET}. DEPLOY_TARGET should be one of these: npm, cdn`,
      );
  }
});
