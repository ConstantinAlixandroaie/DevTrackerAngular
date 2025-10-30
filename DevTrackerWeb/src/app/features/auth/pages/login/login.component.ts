import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  private returnUrl: string = '/';

constructor(
  private authService: AuthService,
  private router:Router,
  private route:ActivatedRoute) { }

ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/boards';
  }

  onLogin(loginRequest: { email: string; password: string }) {
    this.authService.login(loginRequest).subscribe({
      next: () => {
         this.router.navigateByUrl(this.returnUrl);
        },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
