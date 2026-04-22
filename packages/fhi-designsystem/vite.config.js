import { defineConfig, loadEnv } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
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

  /**
   * We need to generate dummy .d.ts files for each component in order for the intellisense in the consuming project to treat the components as modules.
   * The content of the .d.ts files is not important, as long as they exist and export something (in this case, an empty object).
   */
  const dummyTypes = Object.keys(listOfComponents).map(key => ({
    fileName: `${key}.d.ts`,
    content: `export {};`,
  }));

  /**
   * read the package.json file for the project and add necessary changes to it.
   * right now it only adds exports for each component and the main entry point so that the consumers intellisense works correctly.
   *
   * @returns package.json ready for deployment as an npm package
   */
  const preparedPackageJson = (() => {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

    packageJson.exports = packageJson.exports || {};

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
      style: './theme/default.css',
    };

    packageJson.exports['./custom-elements.json'] = {
      default: './custom-elements.json',
    };

    return packageJson;
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

  /**
   * Vite plugin that writes files to the output directory after the bundle is closed.
   * @param {*} files an array of objects with the following structure: { path: string, content: string }. The path is relative to the output directory and the content is the content of the file to be written.
   */
  function writeFileOnCloseBundle(files) {
    let _outDir = null;

    return {
      name: 'vite-plugin-fhi-write-file-on-close-bundle',
      configResolved(resolvedConfig) {
        _outDir = resolvedConfig.build.outDir;
      },
      closeBundle() {
        for (const file of files) {
          if (!file.path) {
            throw Error('"path" is required');
          }

          fs.writeFileSync(`${_outDir}/${file.path}`, file.content || '');
        }
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
          writeFileOnCloseBundle([
            {
              path: 'index.html',
            },
          ]),
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
                src: '.temp/*',
                dest: './',
              },
            ],
          }),
          writeFileOnCloseBundle([
            {
              path: 'package.json',
              content: JSON.stringify(preparedPackageJson),
            },
            ...dummyTypes.map(({ fileName, content }) => ({
              path: fileName,
              content,
            })),
          ]),
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
