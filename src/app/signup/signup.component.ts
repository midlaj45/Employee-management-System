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
  imports: [CommonModule,FormsModule,LoginComponent,],

})
export class SignupComponent {
  name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSignup() {
    if (this.name && this.email && this.username && this.password) {
      // Perform signup logic here (e.g., API call)
      alert('Signup successful!');
      this.router.navigate(['/login']); // Redirect to login page
    } else {
      alert('Please fill out all fields');
    }
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }
}
