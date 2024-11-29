import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule for two-way binding

import { AuthService } from '../auth.service'; // Import AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],  // Import necessary modules here
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errors: { [key: string]: string } = {};
  isLoading: boolean = false;  // Flag to show loading state

  constructor(private authService: AuthService, private router: Router) {}

  validateFields(): boolean {
    this.errors = {};  // Reset errors

    if (!this.username) this.errors['username'] = 'Username is required';
    if (!this.password) this.errors['password'] = 'Password is required';

    return Object.keys(this.errors).length === 0;  // Return true if no errors
  }

  onLogin() {
    if (this.validateFields()) {
       // Show loading indicator while API call is in progress
  
      const loginData = {
        username: this.username,
        password: this.password,
      };
  
      this.authService.login(loginData).subscribe({
        next: (response) => {
          
          // Save the JWT token in localStorage or sessionStorage
          localStorage.setItem('token', response.token); // Save the token for future API calls
          
          this.router.navigate(['/dashboard']); // Navigate to dashboard or the appropriate page
        },
        error: (err) => {
         
          this.errors['login'] = 'An error occurred. Please try again later.';
          console.error(err); // Log the error for debugging
        }
      });
    }
  }
  
  
}
