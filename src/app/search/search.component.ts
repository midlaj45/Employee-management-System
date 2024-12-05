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
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  searchType: string = ''; 
  employees: any[] = [];
  filteredEmployees: any[] = [];
  paginatedEmployees: any[] = [];
  selectedEmployee: any = null;
  searchValue: string = '';
  errorMessage: string | null = null;
  departments: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(
      (response) => {
        this.employees = response.data;
        this.filteredEmployees = this.employees;
        this.departments = [
          ...new Set(this.employees.map((emp) => emp.department.name)),
        ];
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
      this.filteredEmployees = this.employees.filter(
        (employee) =>
          employee.firstName
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          employee.lastName
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          `${employee.firstName} ${employee.lastName}`
            .toLowerCase()
            .includes(this.searchValue.toLowerCase())
      );
    } else if (this.searchType === 'department') {
      this.filteredEmployees = this.employees.filter((employee) =>
        employee.department.name
          .toLowerCase()
          .includes(this.searchValue.toLowerCase())
      );
    } else if (this.searchType === 'id') {
      const searchId = Number(this.searchValue);
      this.filteredEmployees = this.employees.filter(
        (employee) => employee.id === searchId
      );
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedEmployees = this.filteredEmployees.slice(startIndex, startIndex + this.itemsPerPage);
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

  onViewMore(employee: any) {
    this.selectedEmployee = employee;
  }

  closeEmployeeDetails() {
    this.selectedEmployee = null;
  }
}
