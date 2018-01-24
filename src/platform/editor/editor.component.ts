import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs/observable/fromEvent';

import { BaseEditor } from './base-editor';

@Component({
  selector: 'ngx-monaco-editor',
  template: '<div class="editor-container" #editorContainer></div>',
  styles: [`
    :host {
      display: block;
      height: 200px;
    }

    .editor-container {
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
export class EditorComponent extends BaseEditor implements ControlValueAccessor {

  private _value: string = '';

  propagateChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this._value = value || '';
    // Fix for value change while dispose in process.
    setTimeout(() => {
      if (this._editor) {
        this._editor.setValue(this._value);
      }
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  protected initMonaco(options: any): void {
    this._editor = monaco.editor.create(this._editorContainer.nativeElement, options);
    this._editor.setValue(this._value);
    this._editor.onDidChangeModelContent((e: any) => {
      const value = this._editor.getValue();
      this.propagateChange(value);
      // value is not propagated to parent when executing outside zone.
      this.zone.run(() => this._value = value);
    });

    this._editor.onDidBlurEditor((e: any) => {
      this.onTouched();
    });

    // refresh layout on resize event.
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
    this._windowResizeSubscription = fromEvent(window, 'resize').subscribe(() => this._editor.layout());
    this.onInit.emit(this._editor);
  }

}
