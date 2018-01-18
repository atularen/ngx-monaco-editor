/// <reference path="../../node_modules/monaco-editor/monaco.d.ts" />

import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <ngx-monaco-editor [options]="options" [(ngModel)]="code" (onInit)="onInit($event)"></ngx-monaco-editor>
  `,
  styles: [
    `
    ngx-monaco-editor {
      height: 500px;
    }
  `
  ]
})
export class AppComponent {
  editor: monaco.editor.IStandaloneCodeEditor;
  toggle = false;
  options: monaco.editor.IEditorConstructionOptions = {
    language: "yaml",
    theme: "vs-dark"
  };
  title = "app";
  code = `
apiVersion: v1
kind: Service
metadata:
  name: dex
spec:
  type: NodePort
  ports:
  - name: dex
    port: 5556
    protocol: TCP
    targetPort: 5556
    nodePort: 32000
  selector:
    app: dex
  `;

  onInit(editor) {
    this.editor = editor;
    var line = editor.getPosition();
    var range = new monaco.Range(line.lineNumber, 1, line.lineNumber, 1);
    var id = { major: 1, minor: 1 };
    var text = "FOO";
    var op = {
      identifier: id,
      range: range,
      text: text,
      forceMoveMarkers: true
    };
  }
}
