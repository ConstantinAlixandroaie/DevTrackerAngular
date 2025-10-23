import { RenderMode, ServerRoute } from '@angular/ssr';
import { routes } from './app.routes';

export const serverRoutes: ServerRoute[] = routes.map(route => ({
  ...route,
  path: route.path ?? '',
  renderMode: RenderMode.Server | RenderMode.Client,
}));
