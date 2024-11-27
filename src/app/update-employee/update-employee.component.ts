import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
 
@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NavbarComponent,],
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent {
  searchForm: FormGroup; // Form to search for the employee
  updateForm: FormGroup | null = null; // Form to update employee details
  employeeData: any = null; // Placeholder for employee data
  errorMessage = '';
  successMessage = '';
 
  // Simulated Employee Database
  private employeeDatabase = [
    {
      id: '101',
      firstName: 'John',
      lastName: 'Doe',
      department: 'Engineering',
      role: 'Developer',
      email: 'john@example.com',
      mobileNumber: '1234567890'
    },
    {
      id: '102',
      firstName: 'Jane',
      lastName: 'Smith',
      department: 'Finance',
      role: 'Analyst',
      email: 'jane@example.com',
      mobileNumber: '9876543210'
    },
    {
      id: '103',
      firstName: 'Emily',
      lastName: 'Johnson',
      department: 'Sales',
      role: 'Sales Manager',
      email: 'emily@example.com',
      mobileNumber: '4561237890'
    },
  ];
 
  constructor(private fb: FormBuilder) {
    // Search Form
    this.searchForm = this.fb.group({
      employeeId: ['', Validators.required],
    });
  }
 
  // Search for Employee by ID
  searchEmployee() {
    const employeeId = this.searchForm.get('employeeId')?.value;
    this.employeeData = this.employeeDatabase.find((emp) => emp.id === employeeId);
 
    if (this.employeeData) {
      this.errorMessage = '';
      this.createUpdateForm(this.employeeData); // Initialize update form with employee data
    } else {
      this.errorMessage = 'Employee does not exist.';
      this.updateForm = null; // Reset the update form
    }
  }
 
  // Create Update Form with Employee Data
  createUpdateForm(employee: any) {
    this.updateForm = this.fb.group({
      firstName: [employee.firstName, Validators.required],
      lastName: [employee.lastName, Validators.required],
      department: [employee.department, Validators.required],
      role: [employee.role, Validators.required],
      email: [employee.email, [Validators.required, Validators.email]],
      mobileNumber: [employee.mobileNumber, [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
    });
  }
 
  // Update Employee Data
  updateEmployee() {
    if (this.updateForm?.valid) {
      const updatedData = this.updateForm.value;
 
      // Update the employee in the database (simulation)
      const employeeIndex = this.employeeDatabase.findIndex((emp) => emp.id === this.employeeData.id);
      if (employeeIndex !== -1) {
        this.employeeDatabase[employeeIndex] = {
          id: this.employeeData.id,
          ...updatedData,
        };
      }
 
      this.successMessage = 'Employee data updated successfully!';
      this.errorMessage = '';
      console.log('Updated Employee Database:', this.employeeDatabase); // Log the updated data
    } else {
      this.successMessage = '';
      this.errorMessage = 'Please complete all required fields.';
    }
  }
}