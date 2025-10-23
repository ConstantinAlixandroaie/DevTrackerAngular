import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive,Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';

@Component({
  selector: 'app-landing',
  imports: [
    RouterLink,         
    RouterLinkActive   
    ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit():void{
  if(this.authService.isAuthenticated()){
    this.router.navigate(['/boards']);
    }
  }
}
