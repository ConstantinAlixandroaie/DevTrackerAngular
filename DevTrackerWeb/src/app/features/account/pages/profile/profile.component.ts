import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
private returnUrl: string = '/';

constructor(private authService: AuthService,
  private router:Router,
  private route:ActivatedRoute) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/auth/login';
  }
  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl(this.returnUrl);
  }
}
