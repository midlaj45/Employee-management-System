import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router) {}
  navigateToAddEmployee()
  {
    this.router.navigate(['/add-employee']);
  }
  navigateToViewEmployee()
  {
    this.router.navigate(['/view-employee']);
  }
  navigateToDeleteEmployee()
  {
    this.router.navigate(['/delete-employee']);
  }
  navigateToUpdateEmployee()
  {
    this.router.navigate(['/update-employee']);
  }

  navigateToWorkingHours()
  {
    this.router.navigate(['/working-hours']);
  }

}
