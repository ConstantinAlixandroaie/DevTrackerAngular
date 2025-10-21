import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-shell">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-shell {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: #f9fafb;
      color: #333;
      font-family: Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
  `]
})
export class AppComponent {}
