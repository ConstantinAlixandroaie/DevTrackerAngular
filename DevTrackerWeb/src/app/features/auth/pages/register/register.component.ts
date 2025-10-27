import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private returnUrl: string = '/';

  constructor(
    private authService: AuthService,
    private router:Router,
    private route:ActivatedRoute) { }

    ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/auth/login';
    }

   onRegister(credentials: { email: string; password: string }) {
    this.authService.register(credentials).subscribe({
      next: () => {
         this.router.navigateByUrl(this.returnUrl);
        },
      error: (error) => {
        console.error('Register failed', error);
      }
    });
  }

}
