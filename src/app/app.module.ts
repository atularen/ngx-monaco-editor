import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgxMonacoEditorConfig } from '../platform/editor/config';
import { MonacoEditorModule } from '../platform/editor/editor.module';
import { AppComponent } from './app.component';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets',
  defaultOptions: { scrollBeyondLastLine: false },
  onMonacoLoad: () => {

    console.log((<any>window).monaco);

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
