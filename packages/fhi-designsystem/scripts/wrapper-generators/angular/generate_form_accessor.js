export const generateFormAccessor = (
  angularTagName,
  webComponentTagName,
  accessorName,
  valueLocation,
) => {
  return `
    @Directive({ selector: '${angularTagName}[formControlName],${angularTagName}[formControl],${angularTagName}[ngModel]', standalone: true, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ${accessorName}), multi: true }] })
    export class ${accessorName} implements ControlValueAccessor, AfterViewInit {
      private _onChange: (value: any) => void = () => { };
      private _onTouched: () => void = () => { };

      private _host = inject(ElementRef);

      private _initialValue: any = null;
      private _webComponent?: any;

      ngAfterViewInit(): void {
        this._webComponent = this._host.nativeElement.querySelector('${webComponentTagName}');

        if (this._webComponent && this._initialValue !== null) {
          this._webComponent.${valueLocation} = this._initialValue;
          this._initialValue = null;
        }
      }

      writeValue(value: any): void {
        if (this._webComponent) {
          this._webComponent.${valueLocation} = value;
        } else {
          this._initialValue = value;
        }
      }

      registerOnTouched(fn: any): void {
        this._onTouched = fn;
      }

      registerOnChange(fn: any): void {
        this._onChange = fn;
      }
    }
  `;
};
