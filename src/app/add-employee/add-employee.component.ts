import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.employeeForm.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onSubmit() {
    console.log('Form submitted!');
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      this.employeeService.createEmployee(employeeData).subscribe(
        (response) => {
          console.log('Employee added:', response);
          this.successMessage = 'Employee added successfully!';
        },
        (error) => {
          console.error('Error:', error);
          this.errorMessage = 'Failed to add employee. Please try again later.';
        }
      );
    } else {
      console.log('Form is invalid');
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error!',
        text: 'Please fill in all required fields.',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }
  
}
