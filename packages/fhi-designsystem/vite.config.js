import { defineConfig, loadEnv } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  if (!env?.DEPLOY_TARGET) {
    console.log("No DEPLOY_TARGET specified, defaulting to 'npm'");
    env.DEPLOY_TARGET = 'npm';
  }

  switch (env.DEPLOY_TARGET) {
    case 'cdn':
      return {
        build: {
          lib: {
            entry: './src/library.ts',
            name: 'fhi-designsystem',
            fileName: 'fhi-designsystem',
          },
          sourcemap: true,
          outDir: 'dist/cdn',
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
          outDir: 'dist/npm',
        },
      };
    default:
      throw Error(
        `Unknown DEPLOY_TARGET: ${env.DEPLOY_TARGET}. DEPLOY_TARGET should be one of these: npm, cdn`,
      );
  }
});
