import { defineConfig, loadEnv } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import generateFile from 'vite-plugin-generate-file';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIRECTORY = 'dist';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  if (!env.DEPLOY_TARGET) {
    console.log("No DEPLOY_TARGET specified, defaulting to 'npm'");
    env.DEPLOY_TARGET = 'npm';
  }

  // generate a list of components from the components directory.
  // this is used to create a library entry for each component
  const listOfComponents = (function () {
    const componentsDirectory = './src/components';

    const files = fs.readdirSync(componentsDirectory, {
      recursive: true,
    });

    const entries = {};

    files.forEach(file => {
      if (process.platform === 'win32') {
        file = file.replace(/\\/g, '/');
      }

      let fileName = path.posix.basename(file);

      if (
        fileName &&
        fileName.startsWith('fhi-') &&
        fileName.endsWith('.ts') &&
        fileName.includes('.component.')
      ) {
        let customeElementSelector = path.basename(file, '.component.ts');
        entries[customeElementSelector] = `${componentsDirectory}/${file}`;
      }
    });

    return entries;
  })();

  // create a virtual module that exports all components defined in the listOfComponents
  const virtualLibraryModule = (function () {
    let code = '';

    Object.values(listOfComponents).forEach(value => {
      code += `export * from '${value}';`;
    });

    return {
      path: 'virtual:FhiLibrary',
      code,
    };
  })();

  // https://vite.dev/guide/api-plugin.html#virtual-modules-convention
  function resolveVirtualModule({ moduleId, moduleContent }) {
    const virtualModuleId = moduleId;
    const resolvedVirtualModuleId = '\0' + moduleId;

    return {
      name: 'vite-plugin-fhi-resolve-virtual-module',
      resolveId(id) {
        if (id.endsWith(virtualModuleId)) {
          return resolvedVirtualModuleId;
        }
      },
      load(id) {
        if (id === resolvedVirtualModuleId) {
          return moduleContent;
        }
      },
    };
  }

  function addExportsToPackageJson() {
    let _outDir = null;

    return {
      name: 'vite-plugin-fhi-add-exports-to-package-json',
      configResolved(resolvedConfig) {
        _outDir = resolvedConfig.build.outDir;
      },
      closeBundle() {
        const packageJson = JSON.parse(
          fs.readFileSync('./package.json', 'utf-8'),
        );

        packageJson.exports = packageJson.exports || {};

        // Make sure the intellisense in the consuming project can find the components when importing from the package.
        Object.keys(listOfComponents).forEach(key => {
          packageJson.exports[`./${key}`] = {
            default: `./${key}.js`,
            types: `./${key}.d.ts`,
          };
        });

        packageJson.exports['.'] = {
          default: './index.js',
        };

        packageJson.exports['./theme/default.css'] = {
          default: './theme/default.css',
        };

        packageJson.exports['./custom-elements.json'] = {
          default: './custom-elements.json',
        };

        fs.writeFileSync(
          `${_outDir}/package.json`,
          JSON.stringify(packageJson),
        );
      },
    };
  }

  function generateDummyTypes() {
    let _outDir = null;

    return {
      name: 'vite-plugin-fhi-generate-dummy-types',
      configResolved(resolvedConfig) {
        _outDir = resolvedConfig.build.outDir;
      },
      closeBundle() {
        // This will allow the consuming project to import the components as modules.
        Object.keys(listOfComponents).forEach(key => {
          fs.writeFileSync(`${_outDir}/${key}.d.ts`, `export {};`);
        });
      },
    };
  }

  switch (env.DEPLOY_TARGET) {
    case 'cdn':
      return {
        plugins: [
          resolveVirtualModule({
            moduleId: virtualLibraryModule.path,
            moduleContent: virtualLibraryModule.code,
          }),
          generateFile({
            output: './index.html',
          }),
          viteStaticCopy({
            targets: [
              {
                src: 'staticwebapp.config.json',
                dest: './',
              },
              {
                src: '.temp/custom-elements.json',
                dest: './',
              },
              {
                src: '.temp/web-types.json',
                dest: './',
              },
            ],
          }),
        ],
        build: {
          cssCodeSplit: true,
          lib: {
            formats: ['es'],
            entry: {
              'theme/default.css': './src/theme/default.css',
              'fonts/RobotoFlex.ttf': './fonts/RobotoFlex.ttf',
              'fhi-designsystem': virtualLibraryModule.path,
            },
          },
          sourcemap: true,
          outDir: `${OUTPUT_DIRECTORY}/cdn`,
        },
      };
    case 'github':
    case 'npm':
      return {
        plugins: [
          resolveVirtualModule({
            moduleId: virtualLibraryModule.path,
            moduleContent: virtualLibraryModule.code,
          }),
          viteStaticCopy({
            targets: [
              {
                src: 'README.md',
                dest: './',
              },
              {
                src: '.temp/custom-elements.json',
                dest: './',
              },
              {
                src: '.temp/web-types.json',
                dest: './',
              },
            ],
          }),
          generateDummyTypes(),
          addExportsToPackageJson(),
        ],
        build: {
          cssCodeSplit: true,
          lib: {
            formats: ['es'],
            entry: {
              'theme/default.css': './src/theme/default.css',
              'fonts/RobotoFlex.ttf': './fonts/RobotoFlex.ttf',
              index: virtualLibraryModule.path,
              ...listOfComponents,
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
          outDir: `${OUTPUT_DIRECTORY}/${env.DEPLOY_TARGET}`,
        },
      };
    default:
      throw Error(
        `Unknown DEPLOY_TARGET: ${env.DEPLOY_TARGET}. DEPLOY_TARGET should be one of these: npm, cdn`,
      );
  }
});
