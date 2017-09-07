import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent, EditorComponentHelper } from './editor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EditorComponent
  ],
  exports: [
    EditorComponent
  ]
})
export class MonacoEditorModule {
}
export class MonacoEditor extends EditorComponentHelper {
}

