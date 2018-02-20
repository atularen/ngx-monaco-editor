import { Component, Inject, Input } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';

import { BaseEditor } from './base-editor';
import { NGX_MONACO_EDITOR_CONFIG, NgxMonacoEditorConfig } from './config';
import { DiffEditorModel } from './types';

@Component({
  selector: 'ngx-monaco-diff-editor',
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
  `]
})
export class DiffEditorComponent extends BaseEditor {

  @Input() originalModel: DiffEditorModel;
  @Input() modifiedModel: DiffEditorModel;

  constructor(@Inject(NGX_MONACO_EDITOR_CONFIG) private editorConfig: NgxMonacoEditorConfig) {
    super(editorConfig);
  }

  protected initMonaco(options: any): void {

    if (!this.originalModel || !this.modifiedModel) {
      throw new Error('originalModel or modifiedModel not found for ngx-monaco-diff-editor');
    }

    this.originalModel.language = this.originalModel.language || options.language;
    this.modifiedModel.language = this.modifiedModel.language || options.language;

    let originalModel = monaco.editor.createModel(this.originalModel.code, this.originalModel.language);
    let modifiedModel = monaco.editor.createModel(this.modifiedModel.code, this.modifiedModel.language);

    this._editorContainer.nativeElement.innerHTML = '';
    this._editor = monaco.editor.createDiffEditor(this._editorContainer.nativeElement, options);
    this._editor.setModel({
      original: originalModel,
      modified: modifiedModel
    });

    // refresh layout on resize event.
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
    this._windowResizeSubscription = fromEvent(window, 'resize').subscribe(() => this._editor.layout());
    this.onInit.emit(this._editor);
  }

}
