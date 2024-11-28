import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errors: { [key: string]: string } = {};

  constructor(private router: Router) {}

  validateFields(): boolean {
    this.errors = {}; // Reset errors

    if (!this.username) this.errors['username'] = 'Username is required';
    if (!this.password) this.errors['password'] = 'Password is required';

    return Object.keys(this.errors).length === 0; // Return true if no errors
  }

  onLogin() {
    if (this.validateFields()) {
      this.router.navigate(['dashboard']); // Navigate to the dashboard
    }
  }
}
