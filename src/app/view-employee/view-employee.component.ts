import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchType: string = 'name';
  searchValue: string = '';
  errorMessage: string | null = null;
  p: number = 1;
  pageSize: number = 5;
  selectedEmployee: any = null; // Holds the details of the employee to be viewed

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(
      (response) => {
        this.employees = response.data;
        this.filteredEmployees = this.employees;
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

  totalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.pageSize);
  }

  pagedEmployees(): any[] {
    const startIndex = (this.p - 1) * this.pageSize;
    const endIndex = this.p * this.pageSize;
    return this.filteredEmployees.slice(startIndex, endIndex);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.p = page;
    }
  }

  // Function to show employee details
  viewEmployeeDetails(employee: any): void {
    this.selectedEmployee = employee;
  }

  // Function to close the employee details card
  closeEmployeeDetails(): void {
    this.selectedEmployee = null;
  }
}
