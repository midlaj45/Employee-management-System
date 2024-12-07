import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { NavbarComponent } from '../shared/navbar/navbar.component'; // Adjust path if necessary
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
  imports: [FormsModule, NavbarComponent, ReactiveFormsModule, CommonModule],
})
export class UpdateEmployeeComponent {
  searchForm: FormGroup; // Form to search for the employee
  updateForm: FormGroup; // Form to update employee details
  employeeData: any = null; // Placeholder for employee data
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    // Initialize search form
    this.searchForm = this.fb.group({
      employeeId: ['', Validators.required],
    });

    // Initialize update form
    this.updateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      department: ['', Validators.required], // Assume department name as string
      role: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
    });
  }

  // Search for Employee by ID and populate the form
  searchEmployee() {
    const employeeId = this.searchForm.get('employeeId')?.value;
  
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (response) => {
        if (response && response.data) {
          this.employeeData = response.data; // Extract the 'data' object
          this.errorMessage = ''; // Clear any previous errors
          this.populateUpdateForm(this.employeeData); // Populate the form with data
  
          // Show success message using SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Employee Found',
            text: 'Employee details fetched successfully!',
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          // Show error message using SweetAlert if no employee found
          Swal.fire({
            icon: 'error',
            title: 'No Data Found',
            text: 'No data found for the given Employee ID.',
            timer: 1500,
            showConfirmButton: false,
          });
  
          this.employeeData = null;
          this.updateForm.reset();
        }
      },
      (error) => {
        console.error('Error fetching employee:', error);
  
        // Show error message using SweetAlert on error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Employee does not exist or an error occurred.',
          timer: 2000,
          showConfirmButton: false,
        });
  
        this.employeeData = null;
        this.updateForm.reset();
      }
    );
  }
  

  // Populate the update form with employee data
  populateUpdateForm(employee: any) {
    this.updateForm.setValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      department: employee.department.name, // Use department.name
      role: employee.role,
      emailId: employee.emailId, // Match the response key
      phoneNumber: employee.phoneNumber, // Match the response key
    });

    // Ensure validations are synchronized
    Object.keys(this.updateForm.controls).forEach((controlName) => {
      this.updateForm.controls[controlName].markAsTouched();
      this.updateForm.controls[controlName].updateValueAndValidity();
    });
  }

  // Update Employee Data
  // Update Employee Data
updateEmployee() {
  // Transform the form data if necessary
  const updatedData = {
    ...this.updateForm.value,
    department: { id: this.employeeData.department.id, name: this.updateForm.value.department },
  };

  // Debug the payload before sending
  console.log('Payload sent to API:', updatedData);

  this.employeeService.updateEmployee(this.employeeData.id, updatedData).subscribe(
    (response) => {
      console.log('Update response:', response);

      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Employee data updated successfully!',
        timer: 1500,
        showConfirmButton: false,
      });
    },
    (error) => {
      console.error('Error updating employee:', error);

      // Show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.status === 500
          ? 'Internal server error. Please try again later or contact support.'
          : 'Error updating employee data.',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  );
}

  
  
  }

