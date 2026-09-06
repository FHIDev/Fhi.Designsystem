import * as fs from 'fs';
import * as path from 'path';

const snakeToPascal = text =>
  text
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const snakeToCamel = text => {
  const pascal = snakeToPascal(text);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

const isOptionalAttribute = attribute =>
  attribute.type.text.includes('undefined') || attribute.default !== undefined;

const validateOptions = ({ manifestPath, outputPaths }) => {
  if (!manifestPath) {
    console.error(
      'Missing manifest path. Please provide a valid path to the manifest file.',
    );
    process.exit(1);
  }

  if (!outputPaths) {
    console.error(
      'Missing output paths. Please provide a valid paths to the output folders as an array.',
    );
    process.exit(1);
  }

  if (!Array.isArray(outputPaths)) {
    console.error(
      'Invalid output paths. Please provide a valid paths to the output folders as an array.',
    );
    process.exit(1);
  }
};

const prepareOutputFolder = outputPath => {
  fs.mkdirSync(outputPath, { recursive: true });

  fs.readdirSync(outputPath).forEach(fileName => {
    const filePath = path.join(outputPath, fileName);

    if (fs.lstatSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
    }
  });
};

const readManifest = manifestPath => {
  try {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  } catch (error) {
    throw new Error(`Could not read manifest at ${manifestPath}`, {
      cause: error,
    });
  }
};

const generateFormAccessor = (
  angularTagName,
  webComponentTagName,
  componentDescription,
) => {
  const accessorName = `${snakeToPascal(webComponentTagName)}ValueAccessor`;

  let stateProperty;
  let valueProperty;

  switch (webComponentTagName) {
    case 'fhi-text-input':
    case 'fhi-date-input':
    case 'fhi-select':
      stateProperty = 'value';
      valueProperty = 'value';
      break;
    case 'fhi-checkbox':
    case 'fhi-radio':
      stateProperty = 'checked';
      valueProperty = 'value';
      break;
    case 'fhi-button':
      return '';
    default:
      throw new Error(
        `No value location defined for web component ${webComponentTagName}`,
      );
  }

  const eventValue = `$any($event.target).${valueProperty}`;

  const usesCheckedState =
    webComponentTagName === 'fhi-checkbox' ||
    webComponentTagName === 'fhi-radio';

  const onChangeHandler = usesCheckedState
    ? `onChange($any($event.target).${stateProperty} ? ${eventValue} : null)`
    : `onChange(${eventValue})`;

  const initialStateValue = usesCheckedState
    ? '!!this._initialValue'
    : 'this._initialValue';

  const updatedStateValue = usesCheckedState ? '!!value' : 'value';

  return `
    /** @description
     * A ControlValueAccessor for writing a value and listening to changes on an ${webComponentTagName} element.
     * ${componentDescription} */
    @Directive({
      selector: '${angularTagName}[formControlName],${angularTagName}[formControl],${angularTagName}[ngModel]',
      standalone: true,
      host: {'(change)': '${onChangeHandler}', '(blur)': 'onTouched()'},
      providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ${accessorName}), multi: true }]
    })
    export class ${accessorName} implements ControlValueAccessor, AfterViewInit {
      onChange: (value: unknown) => void = () => { };
      onTouched: () => void = () => { };

      private _host = inject(ElementRef);

      private _initialValue: unknown = null;
      private _initialDisabledState: boolean = false;
      private _webComponent?: { [key: string]: unknown };

      ngAfterViewInit(): void {
        this._webComponent = this._host.nativeElement;

        if (!this._webComponent) {
          console.error('Could not find ${webComponentTagName} web component within the ${angularTagName} host element.');
          return;
        }

        this._webComponent["${stateProperty}"] = ${initialStateValue};
        this._webComponent["disabled"] = this._initialDisabledState;
      }

      writeValue(value: unknown): void {
        if (!this._webComponent) {
          this._initialValue = value;
          return;
        }

        this._webComponent["${stateProperty}"] = ${updatedStateValue};
      }

      setDisabledState(isDisabled: boolean): void {
        if (!this._webComponent) {
          this._initialDisabledState = isDisabled;
          return;
        }

        this._webComponent["disabled"] = isDisabled;
      }

      registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
      }

      registerOnChange(fn: (value: unknown) => void): void {
        this.onChange = fn;
      }
    }
  `;
};

const generateAngularWrapper = componentClass => {
  const className = componentClass.name;
  const componentDescription = componentClass.description || '';
  const webComponentTagName = componentClass.tagName;
  const attributes = componentClass.attributes || [];
  const events = componentClass.events || [];
  const slots = componentClass.slots || [];
  const isFormAssociated = componentClass.members.some(
    member => member.name === 'formAssociated',
  );

  if (!webComponentTagName) {
    throw new Error(`No tagName found for component class ${className}`);
  }

  const template = `
      /** This file is autogenerated. Do not edit directly. **/
      import { Component${attributes.length > 0 ? ', input' : ''}${events.length > 0 ? ', output' : ''}${isFormAssociated ? `, Directive, forwardRef, AfterViewInit, inject, ElementRef` : ''}, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

      ${isFormAssociated ? `import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';` : ''}

      import '../${webComponentTagName}';

      ${isFormAssociated ? generateFormAccessor(webComponentTagName, webComponentTagName, componentDescription) : ''}

      /** @description ${componentDescription} */
      @Component({
        selector: '${webComponentTagName}',
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        standalone: true,
        host: {
          ${attributes
            .map(
              attribute => `"[${attribute.name}]": "${attribute.fieldName}()",`,
            )
            .join('\n')}
        },
        template: ${`\`
              ${slots.map(slot => `<ng-content ${slot.name ? `select="[slot='${slot.name}']"` : ''}></ng-content>`).join('\n')}
          \``},
      })
      export class ${className}AngularWrapper {
        ${attributes
          .map(
            attribute => `
            /** ${attribute.description || ''} */
            ${attribute.fieldName} = input${isOptionalAttribute(attribute) ? '' : '.required'}<${attribute.parsedType?.text ?? attribute.type.text}>( ${isOptionalAttribute(attribute) ? `${attribute.default}, ` : ''}{ alias: "${attribute.name}" })
        `,
          )
          .join('')}
        
        ${events
          .map(
            event => `
            /** ${event.description || ''} */
            ${snakeToCamel(event.name)}Output = output<Event>( { alias: "${event.name}" } )
        `,
          )
          .join('')}
      }
    `;

  return { webComponentTagName, template };
};

const writeGeneratedFiles = (outputPath, wrappers, indexFile) => {
  wrappers.forEach(({ webComponentTagName, template }) => {
    const fileName = `${webComponentTagName}.component.ts`;

    fs.writeFileSync(path.join(outputPath, fileName), template, 'utf8');
  });

  fs.writeFileSync(path.join(outputPath, 'index.ts'), indexFile, 'utf8');
};

const main = options => {
  validateOptions(options);

  const { manifestPath, outputPaths } = options;
  const manifest = readManifest(manifestPath);

  outputPaths.forEach(prepareOutputFolder);

  const componentClasses = manifest.modules
    .map(module =>
      module.declarations.find(declaration => declaration.kind === 'class'),
    )
    .filter(componentClass => componentClass?.customElement);

  const wrappers = componentClasses.map(generateAngularWrapper);
  const indexFile = wrappers
    .map(
      ({ webComponentTagName }) =>
        `export * from './${webComponentTagName}.component';`,
    )
    .join('\n');

  outputPaths.forEach(outputPath => {
    writeGeneratedFiles(outputPath, wrappers, indexFile);
  });

  console.log(
    `Successfully generated ${wrappers.length} Angular wrappers to ${outputPaths}`,
  );
};

main({
  manifestPath: '.temp/custom-elements.json',
  outputPaths: ['dist/github/angular-wrappers', 'dist/npm/angular-wrappers'],
});
