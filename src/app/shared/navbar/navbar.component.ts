import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router module
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  // Define the function to navigate
  navigateToPerformanceReport(): void {
    this.router.navigate(['/performance-report']);
  }

  navigateToSearch() {
    this.router.navigate(['/search']);
  }

  logout(): void {
    this.authService.logoutUser().subscribe({
      next: (response) => {
        console.log(response); // Log the response for debugging
        alert('User logged out successfully!');
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
