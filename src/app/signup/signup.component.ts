import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, FormsModule, LoginComponent],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errors: { [key: string]: string } = {};

  constructor(private router: Router) {}

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
      // Perform signup logic here (e.g., API call)
      alert('Signup successful!');
      this.router.navigate(['/login']); // Redirect to login page
    }
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }
}
