import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { EmployeeService } from '../employee.service'; // Import EmployeeService
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employees: any[] = [];  // Array to hold employee data
  errorMessage: string | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    // Fetch all employees when the component is initialized
    this.employeeService.getAllEmployees().subscribe(
      (response) => {
        // Assuming the API response contains the employee data under the 'data' property
        this.employees = response.data;
      },
      (error) => {
        console.error('Error fetching employees:', error);
        this.errorMessage = 'Failed to load employees. Please try again later.';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: this.errorMessage,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    );
  }
}

 
 