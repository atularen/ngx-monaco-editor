# Monaco Editor Component for Angular 2 and above.

 - Angular <= 4: v3.x.x
 - Angular 5: v5.x.x
 - Angular 6: v6.x.x

Using this Module you can utilize the Monaco Editor as an Angular Component. Feel free to contribute, raise feature requests and make it better.

Supports all the options available in monaco-editor [Monaco Editor Options](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html)

## Setup

### Installation

Install from npm repository:
```
npm install ngx-monaco-editor --save
 ```
 
For angular version 5 use v5.x.x
```
npm install ngx-monaco-editor@5.0.0 --save
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
Include MonacoEditorModule in Main Module and Feature Modules where you want to use the editor component.(eg: app.module.ts): 
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
    MonacoEditorModule.forRoot() // use forRoot() in main app module only.
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

Include diff-editor in html with options.(eg: app.component.html)
```html
<ngx-monaco-diff-editor [options]="options" [originalModel]="originalModel" [modifiedModel]="modifiedModel"></ngx-monaco-diff-editor>
```
```typescript
import { Component } from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  options = {
    theme: 'vs-dark'
  };
  originalModel: DiffEditorModel = {
    code: 'heLLo world!',
    language: 'text/plain'
  };

  modifiedModel: DiffEditorModel = {
    code: 'hello orlando!',
    language: 'text/plain'
  };
}
```

### Styling
Add class to editor tag. (eg. class="my-code-editor")
```html
<ngx-monaco-editor class="my-code-editor" [options]="editorOptions" [(ngModel)]="code"></ngx-monaco-editor>
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

### Events
Output event (onInit) expose editor instance that can be used for performing custom operations on the editor. 
```html
<ngx-monaco-editor [options]="editorOptions" [(ngModel)]="code" (onInit)="onInit($event)"></ngx-monaco-editor>
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

## Configurations
`forRoot()` method of MonacoEditorModule accepts config of type `NgxMonacoEditorConfig`.
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { AppComponent } from './app.component';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'app-name/assets', // configure base path for monaco editor
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad: () => { console.log((<any>window).monaco); } // here monaco object will be available as window.monaco use this function to extend monaco editor functionality.
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### Configure JSON Defaults
`onMonacoLoad` property of `NgxMonacoEditorConfig` can be used to configure JSON default.
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { AppComponent } from './app.component';

const monacoConfig: NgxMonacoEditorConfig = {
  onMonacoLoad: () => { 
    const id = "foo.json";
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [{
        uri: "http://myserver/foo-schema.json",
        fileMatch: [id],
        schema: {
          type: "object",
          properties: {
            p1: {
              enum: [ "v1", "v2"]
            },
            p2: {
              $ref: "http://myserver/bar-schema.json"
            }
          }
        }
      },{
        uri: "http://myserver/bar-schema.json",
        fileMatch: [id],
        schema: {
          type: "object",
          properties: {
            q1: {
              enum: [ "x1", "x2"]
            }
          }
        }
      }]
    });
  } 
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Now pass model config of type `NgxEditorModel` to Editor Component
```typescript
@Component({
  selector: 'app-root',
  template: `<ngx-monaco-editor [options]="options" [model]="model"></ngx-monaco-editor>`,
  styles: []
})
export class AppComponent {
  options = {
    theme: 'vs-dark'
  };
  
  jsonCode = [
    '{',
    '    "p1": "v3",',
    '    "p2": false',
    '}'
  ].join('\n');

  model: NgxEditorModel = {
    value: this.jsonCode,
    language: 'json',
    uri: 'foo.json'
  };
}
```

## Links
[Monaco Editor](https://github.com/Microsoft/monaco-editor/)<br/>
[Monaco Editor Options](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html)

## License

MIT © [Atul Kumar](https://github.com/atularen)
