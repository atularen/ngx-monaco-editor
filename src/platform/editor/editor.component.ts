import { AfterViewInit, Component, ElementRef, forwardRef, Input, NgZone, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

let loadedMonaco: boolean = false;
let loadPromise: Promise<void>;
declare const monaco: any;
declare const require: any;

@Component({
  selector: 'ngx-monaco-editor',
  template: '<div class="editorContainer" #editorContainer></div>',
  styles: [`
    :host {
      display: block;
      height: 200px;
    }

    .editorContainer {
      width: 100%;
      height: 98%;
    }
  `],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditorComponent),
    multi: true
  }]
})
export class EditorComponent implements AfterViewInit, ControlValueAccessor {
  @ViewChild('editorContainer') _editorContainer: ElementRef;
  private _value: string = '';
  private _editor: any;
  private _options: any;
  private _windowResizeSubscription: Subscription;
  propagateChange = (_: any) => {};
  onTouched = () => {};

  constructor(private zone: NgZone) {
  }

  writeValue(value: any): void {
    this._value = value;
    if (this._editor) {
      this._editor.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @Input('options')
  set options(options: string) {
    this._options = options;
    if (this._editor) {
      this._editor.dispose();
      this.initMonaco(options);
    }
  }

  get options(): string {
    return this._options;
  }

  ngAfterViewInit(): void {
    if (loadedMonaco) {
      // Wait until monaco editor is available
      loadPromise.then(() => {
        this.initMonaco(this.options);
      });
    } else {
      loadedMonaco = true;
      loadPromise = new Promise<void>((resolve: any) => {
        if (typeof((<any>window).monaco) === 'object') {
          resolve();
          return;
        }
        let onGotAmdLoader: any = () => {
          // Load monaco
          (<any>window).require.config({ paths: { 'vs': 'assets/monaco/vs' } });
          (<any>window).require(['vs/editor/editor.main'], () => {
            this.initMonaco(this.options);
            resolve();
          });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
          let loaderScript: HTMLScriptElement = document.createElement('script');
          loaderScript.type = 'text/javascript';
          loaderScript.src = 'assets/monaco/vs/loader.js';
          loaderScript.addEventListener('load', onGotAmdLoader);
          document.body.appendChild(loaderScript);
        } else {
          onGotAmdLoader();
        }
      });
    }
  }

  private initMonaco(options: any): void {
    this._editor = monaco.editor.create(this._editorContainer.nativeElement, options);
    this._editor.setValue(this._value);
    this._editor.onDidChangeModelContent((e: any) => {
      let value = this._editor.getValue();
      this.propagateChange(value);
      // value is not propagated to parent when executing outside zone.
      this.zone.run(() => this._value = value);
    });
    // refresh layout on resize event.
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
    this._windowResizeSubscription = Observable.fromEvent(window, 'resize').subscribe(() => console.log('dsdsd'), this._editor.layout());
  }

  ngOnDestroy() {
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
    if (this._editor) {
      this._editor.dispose();
    }
  }
}
