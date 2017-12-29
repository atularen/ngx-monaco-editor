import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MonacoEditorModule } from '../platform/editor/editor.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot({baseUrl: 'assets', defaultOptions: { scrollBeyondLastLine: false }})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
