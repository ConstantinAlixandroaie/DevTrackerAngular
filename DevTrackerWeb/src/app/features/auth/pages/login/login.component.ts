import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { cp } from 'fs';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor(private authService: AuthService) { }

  onLogin(credentials: { email: string; password: string }) {
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        //TODO navigate to boards
        },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
