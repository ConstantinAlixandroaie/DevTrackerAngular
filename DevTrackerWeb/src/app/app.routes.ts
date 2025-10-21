// src/app/app.routes.ts
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  template: `
    <div class="landing-shell">
      <h1>Welcome to DevTracker</h1>
      <p>Your workspace for managing boards, tasks, notes, and tags.</p>
      <p class="hint">Use the navigation menu or start by signing in.</p>
    </div>
  `,
  styles: [`
    .landing-shell {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
      background: linear-gradient(135deg, #f7f9fb, #e9ecf1);
      color: #333;
      font-family: Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #1976d2;
    }
    .hint {
      margin-top: 1rem;
      font-size: 0.9rem;
      color: #666;
    }
  `],
})
export class LandingPageComponent {}

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent, // standalone component can be used directly here
    pathMatch: 'full',
  },
  {
    path: 'boards',
    loadChildren: () =>
      import('./features/boards/boards.module').then(m => m.BoardsModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutesModule {}
