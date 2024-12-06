import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 
  constructor(private authService: AuthService, private router: Router) {}
 
 
  navigateToSearch()
  {
    this.router.navigate(['/search']);
  }
  navigateToPerformance()
  {
    this.router.navigate(['/performance-report']);
  }
 
  logout(): void {
    this.authService.logoutUser().subscribe({
      next: (response) => {
        console.log(response); // Log the response for debugging
        localStorage.removeItem('token'); // Clear authentication token
        this.router.navigate(['/login']); // Redirect to the login page
      },
      error: (error) => {
        console.error('Error during logout:', error);
        alert('Failed to log out. Please try again.');
      },
    });
  }
}
 
 