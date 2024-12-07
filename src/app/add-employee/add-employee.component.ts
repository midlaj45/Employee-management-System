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
  filteredRoles: string[] = []; // Array to store filtered roles for the selected department

  // Role mapping for departments
  departmentRoles: { [key: string]: string[] } = {
    'Human Resources': ['Recruiter', 'HR Manager', 'HR Assistant'],
    'Engineering': ['Developer', 'Tester'],
    'Marketing': ['Marketing Executive', 'Marketing Manager'],
    'Finance': ['Accountant', 'Finance Manager'],
  };
  

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
      departmentId: ['', Validators.required],
      departmentName: ['', Validators.required],
      role: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      profilePicture: [null],

    });
  }


  ngOnInit(): void {
    // Fetch all departments when the component is initialized
    this.departmentService.getAllDepartments().subscribe(
      (response) => {
        this.departments = response.data; // Assuming response.data contains the departments
        console.log('Departments:', this.departments); // Debug log
      }
    );
  
    // Watch for changes in the departmentName field
    this.employeeForm.get('departmentName')?.valueChanges.subscribe((selectedDepartmentName) => {
      // Find the selected department and update departmentId
      const selectedDepartment = this.departments.find(dept => dept.name === selectedDepartmentName);
      if (selectedDepartment) {
        this.employeeForm.patchValue({ departmentId: selectedDepartment.id });
      }
  
      // Update the roles based on the selected department
      this.updateRoles(selectedDepartmentName);
    });
  }
  
  updateRoles(selectedDepartmentName: string): void {
    // Get the roles for the selected department
    this.filteredRoles =
      this.departmentRoles[selectedDepartmentName.trim()] || [];
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.employeeForm.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
 onFileChange(event: any): void {
  const file = event.target.files[0];
  console.log(file);  // Check if file is selected
  if (file) {
    this.employeeForm.patchValue({
      profilePicture: file,
      
    });
  }
  
}

onDepartmentNameChange(event: Event): void {
  // Get the selected department name from the dropdown
  const selectedDepartmentName = (event.target as HTMLSelectElement).value;

  // Find the matching department object
  const selectedDepartment = this.departments.find(
    (dept) => dept.name === selectedDepartmentName
  );

  if (selectedDepartment) {
    // Automatically update the departmentId field in the form
    this.employeeForm.patchValue({
      departmentId: selectedDepartment.id,
    });
  }
}

  onSubmit() {
    console.log('Form submitted!');
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      const formData = new FormData();  // Use FormData to handle file upload
  
      // Append employee data fields to FormData
      formData.append('firstName', employeeData.firstName);
      formData.append('lastName', employeeData.lastName);
      formData.append('emailId', employeeData.emailId);
      formData.append('role', employeeData.role);
      formData.append('phoneNumber', employeeData.phoneNumber);
      formData.append('departmentId', employeeData.departmentId);
      formData.append('departmentName', employeeData.departmentName);
  
      // Append profile picture if available
      const profilePicture = employeeData.profilePicture;
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }
  
      this.employeeService.createEmployee(formData).subscribe(
        (response) => {
          console.log('Employee added:', response);
          if (response.statusCode === 201) {
            this.successMessage = response.message;
            
            Swal.fire({
              icon: 'success',
              title: 'Employee Created',
              text: this.successMessage || "",
            }).then(() => {
              // Clear the form after the success message is shown
              this.employeeForm.reset();
            });
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
          }).then(() => {
            // Clear the form after the error message is shown
            this.employeeForm.reset();
          });
        }
      );
    }
  }
 
}
