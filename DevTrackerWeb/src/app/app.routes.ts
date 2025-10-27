import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'boards',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./features/boards/boards.module').then(m => m.BoardsModule),
      },
      {
      path: 'account',
      canActivate: [AuthGuard],
      loadChildren: () =>
        import('./features/account/account.module').then(m => m.AccountModule),
      },
      {
      path: 'auth',
      loadChildren: () =>
        import('./features/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: '',
        component: LandingComponent,
        pathMatch: 'full',
      },
  ]},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutesModule {}
