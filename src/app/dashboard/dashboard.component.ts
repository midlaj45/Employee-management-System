import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';

 
@Component({
  selector: 'app-dashboard',
  standalone: true, // Declare as standalon
  imports: [NavbarComponent,],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {}
 
  navigateToAddEmployee() {
    this.router.navigate(['/add-employee']);
  }
 
  navigateToDeleteEmployee() {
    this.router.navigate(['/delete-employee']);
  }
 
  navigateToUpdateEmployee() {
    this.router.navigate(['/update-employee']);
  }
 
  navigateToViewEmployee() {
    this.router.navigate(['/view-employee']);
  }
  navigateToWorkingHours()
  {
    this.router.navigate(['/working-hours']);
  }
}