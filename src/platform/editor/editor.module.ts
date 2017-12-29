import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NGX_MONACO_EDITOR_CONFIG, NgxMonacoEditorConfig } from './config';
import { EditorComponent } from './editor.component';

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
  public static forRoot(config: NgxMonacoEditorConfig = {}): ModuleWithProviders {
    return {
      ngModule: MonacoEditorModule,
      providers: [
        { provide: NGX_MONACO_EDITOR_CONFIG, useValue: config }
      ]
    };
  }
}
