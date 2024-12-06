import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  employees: any[] = []; // All employees fetched from the backend
  filteredEmployees: any[] = []; // Filtered results
  paginatedEmployees: any[] = []; // Employees to display on the current page
  searchType: string = 'name'; // Default search type
  searchValue: string = ''; // Input for the search
  errorMessage: string | null = null;
  departments: string[] = []; // List of departments
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 5; // Number of employees per page
  totalPages: number = 1; // Total pages
 
  constructor(private employeeService: EmployeeService) {}
 
  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(
      (response) => {
        this.employees = response.data; // Assuming API response data is under 'data'
        this.filteredEmployees = this.employees; // Default to all employees
        this.departments = [...new Set(this.employees.map(emp => emp.department.name))];
        this.updatePagination();
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
 
  onSearch() {
    if (this.searchType === 'name') {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.firstName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(this.searchValue.toLowerCase())
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
 
    this.currentPage = 1; // Reset to the first page
    this.updatePagination();
 
    
  }
 
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEmployees = this.filteredEmployees.slice(startIndex, endIndex);
  }
 
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
 
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
 
 
 
 
 
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { NavbarComponent } from '../shared/navbar/navbar.component';
// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Employee } from '../employee';
// import { EmployeeService } from '../employee.service';
// import Swal from 'sweetalert2';
// import { Department } from '../department';
 
 
// @Component({
//   selector: 'app-search',
//   standalone: true,
//   imports: [CommonModule, FormsModule, NavbarComponent,Department],
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.css']
// })
 
// export class SearchComponent implements OnInit {
//   employees: any[] = []; // Holds all employees fetched from the backend
//   filteredEmployees: any[] = []; // Holds filtered results
//   searchType: string = 'name'; // Default search type
//   searchValue: string = ''; // Input for the search
//   errorMessage: string | null = null;
 
//   constructor(private employeeService: EmployeeService) {}
 
//   ngOnInit(): void {
//     // Fetch all employees when the component is initialized
//     this.employeeService.getAllEmployees().subscribe(
//       (response) => {
//         this.employees = response.data; // Assuming API response data is under 'data'
//         this.filteredEmployees = this.employees; // Default to all employees
//       },
//       (error) => {
//         console.error('Error fetching employees:', error);
//         this.errorMessage = 'Failed to load employees. Please try again later.';
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: this.errorMessage,
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       }
//     );
//   }
 
//   onSearch() {
//     if (this.searchType === 'name') {
//       this.filteredEmployees = this.employees.filter(employee =>
//         employee.firstName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
//         employee.lastName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
//         `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(this.searchValue.toLowerCase())
//       );
    
//     } else if (this.searchType === 'department') {
//       this.filteredEmployees = this.employees.filter(employee =>
//         employee.department.name.toLowerCase().includes(this.searchValue.toLowerCase())
//       );
//     } else if (this.searchType === 'id') {
//       const searchId = Number(this.searchValue); // Ensure it's treated as a number
//       this.filteredEmployees = this.employees.filter(employee =>
//         employee.id === searchId
//       );
//     }
 
//     // Handle case where no results match the search
//     if (this.filteredEmployees.length === 0) {
//       Swal.fire({
//         icon: 'info',
//         title: 'No Results',
//         text: 'No employees match your search criteria.',
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     }
//   }
// }
 
 
 
 