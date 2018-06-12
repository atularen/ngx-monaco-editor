import { Injectable, Inject } from "@angular/core";
import { NgxMonacoEditorConfig, NGX_MONACO_EDITOR_CONFIG } from './config';

let loadedMonaco: boolean = false;
let loadPromise: Promise<void>;
declare const require: any;

@Injectable()
export class MonacoService {

  private baseHref: string;

  constructor(@Inject(NGX_MONACO_EDITOR_CONFIG) private config: NgxMonacoEditorConfig) {
  }

  loadMonaco(): Promise<void> {
    if (!loadedMonaco) {
      loadedMonaco = true;
      loadPromise = new Promise<void>((resolve: any) => {
        const baseUrl = this.config.baseUrl || '/assets';
        if (typeof((<any>window).monaco) === 'object') {
          resolve();
          return;
        }
        const onGotAmdLoader: any = () => {
          // Load monaco
          (<any>window).require.config({ paths: { 'vs': `${baseUrl}/monaco/vs` } });
          (<any>window).require(['vs/editor/editor.main'], () => {
            if (typeof this.config.onMonacoLoad === 'function') {
              this.config.onMonacoLoad();
            }
            resolve();
          });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
          const loaderScript: HTMLScriptElement = document.createElement('script');
          loaderScript.type = 'text/javascript';
          loaderScript.src = `${baseUrl}/monaco/vs/loader.js`;
          loaderScript.addEventListener('load', onGotAmdLoader);
          document.body.appendChild(loaderScript);
        } else {
          onGotAmdLoader();
        }
      });
    }

    return loadPromise;
  }

}
