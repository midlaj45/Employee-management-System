import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,NavbarComponent,],
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
})
export class DeleteEmployeeComponent {
  searchForm: FormGroup;
  employee: any = null; // Placeholder for employee details
  errorMessage: string = '';
  successMessage: string = '';
 
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      employeeId: [''], // Employee ID (optional)
      employeeName: [''], // Employee Name (optional)
    });
  }
 
  // Simulate a database
  private employeesDB = [
    { id: '1', name: 'John Doe', department: 'Engineering', role: 'Developer' },
    { id: '2', name: 'Jane Smith', department: 'HR', role: 'Manager' },
  ];
 
  // Search Functionality
  onSearch() {
    this.errorMessage = '';
    this.successMessage = '';
    const { employeeId, employeeName } = this.searchForm.value;
 
    // Check if either ID or Name is entered
    if (!employeeId && !employeeName) {
      this.errorMessage = 'Please enter Employee ID or Name to search.';
      return;
    }
 
    // Search in the mock database
    this.employee = this.employeesDB.find(
      (emp) =>
        (employeeId && emp.id === employeeId) ||
        (employeeName && emp.name.toLowerCase() === employeeName.toLowerCase())
    );
 
    if (!this.employee) {
      this.errorMessage = 'Employee does not exist.';
    }
  }
 
  // Delete Functionality
  onDelete() {
    if (this.employee) {
      // Remove employee from the mock database
      this.employeesDB = this.employeesDB.filter((emp) => emp.id !== this.employee.id);
 
      this.successMessage = 'Employee deleted successfully.';
      this.employee = null; // Clear the displayed employee
    }
  }
}
 
 
 