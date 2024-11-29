import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../auth.service'; // Importing AuthService

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],

  imports: [CommonModule, FormsModule],  // No need to include LoginComponent here

})
export class SignupComponent {
  name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errors: { [key: string]: string } = {};

  isLoading: boolean = false; // State to track loading process


  constructor(private authService: AuthService, private router: Router) {} // Injecting AuthService

  validateFields(): boolean {
    this.errors = {}; // Reset errors

    if (!this.name) this.errors['name'] = 'Full Name is required';
    if (!this.email) this.errors['email'] = 'Email is required';
    if (!this.username) this.errors['username'] = 'Username is required';
    if (!this.password) this.errors['password'] = 'Password is required';
    if (!this.confirmPassword) this.errors['confirmPassword'] = 'Confirm Password is required';
    if (this.password && this.confirmPassword && this.password !== this.confirmPassword) {
      this.errors['passwordMismatch'] = 'Passwords do not match';

   
    }

    return Object.keys(this.errors).length === 0; // Return true if no errors
  }

  onSignup() {
    if (this.validateFields()) {
      const userData = {
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password,
        reconfirmPassword: this.confirmPassword,
      };
  
      this.authService.signup(userData).subscribe({
        next: (response) => {
          console.log('Signup response:', response); // Log the response for debugging
          if (response === 'User registered successfully!') {
            //alert('Signup successful!');
            this.router.navigate(['/login']); // Redirect to login page
          } else {
            alert(response); // Display the error message from the backend
          }
        },
        error: (err) => {
          console.error('Signup error:', err); // Log the error for debugging
          alert('An error occurred during signup. Please try again.');
        },
      });
    }
  }
  
  navigateToLogin() {
    this.router.navigate(['login']); // Navigate to login page if the user chooses
  }

}