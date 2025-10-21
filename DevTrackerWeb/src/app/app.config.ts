// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { routes } from './app.routes';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

export const appConfig: ApplicationConfig = {
  providers: [
    // 👇 Routing setup (with preloading)
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // 👇 Import traditional NgModules into the DI graph
    importProvidersFrom(CoreModule, SharedModule),
  ],
};
