import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,  // Mark this component as standalone
  imports: [CommonModule,FormsModule], // Import CommonModule for Angular's built-in directives
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})


export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router) {}
  onLogin() {
    if (this.username && this.password) {
      this.router.navigate(['search']); // Navigate to the search page
    } else {
      alert('Please enter both username and password');
    }
  }
}
