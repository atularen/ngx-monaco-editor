# Monaco Editor Component for Angular 2 and above.

Using this Module you can utilize the Monaco Editor as an Angular Component. Feel free to contribute, raise feature requests and make it better.

Supports all the options available in monaco-editor [Monaco Editor Options](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html)

## Setup

### Installation

Install from npm repository:
```
npm install ngx-monaco-editor --save
 ```
 
Add the glob to assets in .angular-cli.json (to make monaco-editor lib available to the app):
```typescript
{
  "apps": [
    {
      "assets": [
        { "glob": "**/*", "input": "../node_modules/ngx-monaco-editor/assets/monaco", "output": "./assets/monaco/" }
      ],
      ...
    }
    ...
  ],
  ...
}
 ```

### Sample
Include MonacoEditorModule in Feature Module where you want to use the editor component.(eg: app.module.ts): 
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Create Editor options in component.(eg: app.component.ts)
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
}
```
Include editor in html with options and ngModel bindings.(eg: app.component.html)
```html
<ngx-monaco-editor [options]="editorOptions" [(ngModel)]="code"></ngx-monaco-editor>
```

### Styling
Add class to editor tag. (eg. class="my-code-editor")
```html
<form>
  <ngx-monaco-editor name="editor" class="my-code-editor" [options]="editorOptions" [(ngModel)]="code"></ngx-monaco-editor>
</form>
```
Add styling in css/scss file:
```scss
.my-code-editor {
  .editorContainer {
    height: calc(100vh - 100px);
  }
}
```
Set automaticLayout option to adjust editor size dynamically. Recommended when using in modal dialog or tabs where editor is not visible initially.

### Custom operations
Output event (onInit) expose editor instance that can be used for performing custom operations on the editor. 
```html
<form>
  <ngx-monaco-editor name="editor" [options]="editorOptions" [(ngModel)]="code" (onInit)="onInit($event)"></ngx-monaco-editor>
</form>
```

```typescript
export class AppComponent {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
  onInit(editor) {
      let line = editor.getPosition();
      console.log(line);
    }
}
```

## Links
[Monaco Editor](https://github.com/Microsoft/monaco-editor/)<br/>
[Monaco Editor Options](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html)
