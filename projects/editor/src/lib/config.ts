import { InjectionToken } from '@angular/core';

export const NGX_MONACO_EDITOR_CONFIG = new InjectionToken('NGX_MONACO_EDITOR_CONFIG');

export interface NgxMonacoEditorConfig {
  baseUrl?: string;
  defaultOptions?: { [key: string]: any; },
  onMonacoLoad?: Function;
}
