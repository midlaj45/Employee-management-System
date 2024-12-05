import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { EmployeeService } from '../employee.service';

import { DepartmentService } from '../department.service';  // Import DepartmentService
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  departments: any[] = [];  // Array to store departments

  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,  // Inject DepartmentService
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }


  ngOnInit(): void {
    // Fetch all departments when the component is initialized
    this.departmentService.getAllDepartments().subscribe(
      (response) => {
        // Handle the API response based on ApiResponse format
        this.departments = response.data;  // Assuming response.data contains the departments
      },
     
    );
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.employeeForm.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onSubmit() {
    console.log('Form submitted!');
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;


      
      // Ensure department is selected and set the department ID
      const department = { id: employeeData.department };
      employeeData.department = department;  // Assign department object with selected ID

      this.employeeService.createEmployee(employeeData).subscribe(
        (response) => {
          console.log('Employee added:', response);
          if (response.statusCode === 201) {
            this.successMessage = response.message;
            
            Swal.fire({
              icon: 'success',
              title: 'Employee Created',
              text: this.successMessage || "",
            });
            this.router.navigate(['/dashboard']);  // Redirect to the employee list page
          }

        },
        (error) => {
          console.error('Error:', error);
          this.errorMessage = 'Failed to add employee. Please try again later.';

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

}
