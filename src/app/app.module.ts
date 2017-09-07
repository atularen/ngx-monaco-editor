import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MonacoEditorModule, MonacoEditor } from '../platform/editor/editor.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule
  ],
  providers: [MonacoEditor],
  bootstrap: [AppComponent]
})
export class AppModule { }
