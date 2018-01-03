import { Component } from '@angular/core';
declare const monaco: any;

@Component({
  selector: 'app-root',
  template: `
    <h1>
      Welcome to {{title}}!!
    </h1>
    <button (click)="updateOptions()">Change Language</button>
    <button (click)="code = ''; codeInput=''">Set Value To Empty String</button>
    <button (click)="code = null; codeInput=null">Set Value To Null</button>
    <button (click)="code = undefined; codeInput=undefined">Set Value To undefined</button>
    <button (click)="toggle = !toggle">Toggle Editor</button>
    <ngx-monaco-editor [options]="options" [(ngModel)]="code" (onInit)="onInit($event)"></ngx-monaco-editor>
    <ngx-monaco-editor *ngIf="toggle" [options]="options" [(ngModel)]="code"></ngx-monaco-editor>
    <input type="text" [(ngModel)]="codeInput"  #inputControl/>
    {{codeInput | json}} {{inputControl.value | json}}
    <pre>{{code}}</pre>
  `,
  styles: []
})
export class AppComponent {
  codeInput: string = 'fdsfsdf';
  editor: any;
  toggle = false;
  options = {
    language: 'javascript',
    theme: 'vs-dark'
  };
  title = 'app';
  code = `(function(jit_createRendererType2_0,jit_viewDef_1,jit_textDef_2,jit_elementDef_3,jit_View_EditorComponent_0_4,jit__object_Object__5,jit_providerDef_6,jit_InjectionToken_NgValueAccessor_7,jit_EditorComponent_8,jit_directiveDef_9,jit_NgZone_10
/*\`\`*/) {
var styles_AppComponent = [];
var RenderType_AppComponent = jit_createRendererType2_0({encapsulation:2,styles:styles_AppComponent,
    data:{}});
function View_AppComponent_0(_l) {
  return jit_viewDef_1(0,[(_l()(),jit_textDef_2(null,['\\n    '])),(_l()(),jit_elementDef_3(0,
      null,null,1,'h1',[],null,null,null,null,null)),(_l()(),jit_textDef_2(null,['\\n      Welcome to ',
      '!!\\n    '])),(_l()(),jit_textDef_2(null,['\\n    '])),(_l()(),jit_elementDef_3(0,
      null,null,2,'ngx-monaco-editor',[['flex',''],['language','javascript'],['style',
          'height: 200px'],['theme','vs-dark']],null,null,null,jit_View_EditorComponent_0_4,
      jit__object_Object__5)),jit_providerDef_6(5120,null,jit_InjectionToken_NgValueAccessor_7,
      function(p0_0) {
        return [p0_0];
      },[jit_EditorComponent_8]),jit_directiveDef_9(4308992,null,0,jit_EditorComponent_8,
      [jit_NgZone_10],{language:[0,'language'],theme:[1,'theme']},null),(_l()(),jit_textDef_2(null,
      ['\\n  ']))],function(_ck,_v) {
    var currVal_1 = 'javascript';
    var currVal_2 = 'vs-dark';
    _ck(_v,6,0,currVal_1,currVal_2);
  },function(_ck,_v) {
    var _co = _v.component;
    var currVal_0 = _co.title;
    _ck(_v,2,0,currVal_0);
  });
}
return {RenderType_AppComponent:RenderType_AppComponent,View_AppComponent_0:View_AppComponent_0};
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoibmc6Ly8vQXBwTW9kdWxlL0FwcENvbXBvbmVudC5uZ2ZhY3RvcnkuanMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9BcHBNb2R1bGUvQXBwQ29tcG9uZW50Lm5nZmFjdG9yeS5qcyIsIm5nOi8vL0FwcE1vZHVsZS9BcHBDb21wb25lbnQuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiXG4gICAgPGgxPlxuICAgICAgV2VsY29tZSB0byB7e3RpdGxlfX0hIVxuICAgIDwvaDE+XG4gICAgPG5neC1tb25hY28tZWRpdG9yIHN0eWxlPVwiaGVpZ2h0OiAyMDBweFwiIHRoZW1lPVwidnMtZGFya1wiIGZsZXggbGFuZ3VhZ2U9XCJqYXZhc2NyaXB0XCI+PC9uZ3gtbW9uYWNvLWVkaXRvcj5cbiAgIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OzBCQ0FBLHdDQUNJO01BQUEsK0NBQUk7TUFBQSxjQUVDLHdDQUNMO01BQUE7VUFBQTtNQUFBO01BQUE7UUFBQTtNQUFBLDJCQUFBO01BQUEsa0VBQXdHO01BQUE7SUFBMUM7SUFBckI7SUFBekMsV0FBOEQsVUFBckIsU0FBekM7OztJQUhJO0lBQUE7OzsifQ==
})`;

  updateOptions(){
    this.options = Object.assign({}, this.options, {language: 'css'});
  }

  onInit(editor) {
    this.editor = editor;
    var line = editor.getPosition();
    var range = new monaco.Range(line.lineNumber, 1, line.lineNumber, 1);
    var id = { major: 1, minor: 1 };
    var text = "FOO";
    var op = {identifier: id, range: range, text: text, forceMoveMarkers: true};
    // editor.executeEdits("my-source", [op]);
  }
}
