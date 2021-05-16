import { Component, OnInit } from '@angular/core';
import { DiffEditorModel, NgxEditorModel } from 'editor';

declare var monaco: any;

@Component({
  selector: 'app-root',
  template: `
    <h1>Editor</h1>
    <button (click)="updateOptions()">Change Language</button>
    <button (click)="code = ''; codeInput=''">Set Value To Empty String</button>
    <button (click)="code = null; codeInput=null">Set Value To Null</button>
    <button (click)="code = undefined; codeInput=undefined">Set Value To undefined</button>
    <button (click)="showMultiple = !showMultiple">{{showMultiple ? 'Hide' : 'Show'}} Multiple Editor</button>

    <div style="height: 100px">
        <ngx-monaco-editor style="height: 100%" [options]="options" [(ngModel)]="code" (onInit)="onInit($event)"></ngx-monaco-editor>
    </div>
    
    <ngx-monaco-editor *ngIf="showMultiple" [options]="options" [(ngModel)]="code"></ngx-monaco-editor>

    <pre>{{code | json}}</pre>

    <h1>Diff Editor</h1>
    <button (click)="updateDiffModel()">Update Models</button>
    <ngx-monaco-diff-editor [options]="options" [originalModel]="originalModel" [modifiedModel]="modifiedModel"
                            (onInit)="onInitDiffEditor($event)"></ngx-monaco-diff-editor>

    <ngx-monaco-editor [options]="options" [model]="model"></ngx-monaco-editor>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  codeInput = 'Sample Code';
  editor: any;
  diffEditor: any;
  showMultiple = false;
  toggleLanguage = true;
  options = {
    theme: 'vs-dark'
  };
  code: string;
  cssCode = `.my-class {
  color: red;
}`;
  jsCode = `function hello() {
	 alert('Hello world!');
}`;

  originalModel: DiffEditorModel = {
    code: 'heLLo world!',
    language: 'text/plain'
  };

  modifiedModel: DiffEditorModel = {
    code: 'hello orlando!',
    language: 'text/plain'
  };

  jsonCode = [
    '{',
    '    "p1": "v3",',
    '    "p2": false',
    '}'
  ].join('\n');

  model: NgxEditorModel = {
    value: this.jsonCode,
    language: 'json'
  };

  ngOnInit() {
    this.updateOptions();
  }

  updateOptions() {
    this.toggleLanguage = !this.toggleLanguage;
    if (this.toggleLanguage) {
      this.code = this.cssCode;
      this.options = Object.assign({}, this.options, { language: 'java' });
    } else {
      this.code = this.jsCode;
      this.options = Object.assign({}, this.options, { language: 'javascript' });
    }

  }

  updateDiffModel() {
    this.originalModel = Object.assign({}, this.originalModel, { code: 'abcd' });
    this.modifiedModel = Object.assign({}, this.originalModel, { code: 'ABCD ef' });
  }

  onInit(editor) {
    this.editor = editor;
    console.log(editor);
    this.model = {
      value: this.jsonCode,
      language: 'json',
      uri: monaco.Uri.parse('a://b/foo.json')
    };
    // let line = editor.getPosition();
    // let range = new monaco.Range(line.lineNumber, 1, line.lineNumber, 1);
    // let id = { major: 1, minor: 1 };
    // let text = 'FOO';
    // let op = { identifier: id, range: range, text: text, forceMoveMarkers: true };
    // editor.executeEdits("my-source", [op]);
  }

  onInitDiffEditor(editor) {
    this.diffEditor = editor;
    console.log(editor);
  }
}
