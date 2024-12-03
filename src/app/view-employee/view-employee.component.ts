import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { EmployeeService } from '../employee.service'; // Import EmployeeService
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employees: any[] = []; // Holds all employees fetched from the backend
  filteredEmployees: any[] = []; // Holds filtered results
  searchType: string = 'name'; // Default search type
  searchValue: string = ''; // Input for the search
  errorMessage: string | null = null;
  p: number = 1; // Current page number
  pageSize: number = 8; // Number of items per page
 
  constructor(private employeeService: EmployeeService) {}
 
  ngOnInit(): void {
    // Fetch all employees when the component is initialized
    this.employeeService.getAllEmployees().subscribe(
      (response) => {
        this.employees = response.data; // Assuming API response data is under 'data'
        this.filteredEmployees = this.employees; // Default to all employees
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
 
  onSearch(): void {
    // Filter employees based on the search type and value
    if (this.searchType === 'name') {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.firstName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } else if (this.searchType === 'department') {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.department.name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } else if (this.searchType === 'id') {
      const searchId = Number(this.searchValue); // Ensure it's treated as a number
      this.filteredEmployees = this.employees.filter(employee =>
        employee.id === searchId
      );
    }
 
    // Handle case where no results match the search
    if (this.filteredEmployees.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'No Results',
        text: 'No employees match your search criteria.',
        timer: 1500,
        showConfirmButton: false,
      });
    }
    this.p = 1; // Reset pagination when search is performed
  }
 
  // Function to calculate the total number of pages
  totalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.pageSize);
  }
 
  // Function to get the employees for the current page
  pagedEmployees(): any[] {
    const startIndex = (this.p - 1) * this.pageSize;
    const endIndex = this.p * this.pageSize;
    return this.filteredEmployees.slice(startIndex, endIndex);
  }
 
  // Function to update the current page
  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.p = page;
    }
  }
}
 
 