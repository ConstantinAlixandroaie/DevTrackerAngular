// src/app/app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';
import { routes } from './app.routes';

// For SSR, Angular expects this named export
export const serverRoutes: ServerRoute[] = routes.map(route => ({
  ...route,
  path: route.path ?? '',
  renderMode: RenderMode.Server // or choose appropriate mode per route
}));
