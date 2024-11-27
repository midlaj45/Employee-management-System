import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,NavbarComponent,],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  submitted = false; // Tracks whether the form has been submitted
  successMessage: string | null = null;
 
  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{10,15}$/)],
      ],
    });
  }
 
  onSubmit() {
    this.submitted = true; // Mark the form as submitted
    this.successMessage = null; // Reset success message
 
    if (this.employeeForm.valid) {
      this.successMessage = 'Employee details entered successfully!';
      this.employeeForm.reset(); // Reset the form
      this.submitted = false; // Reset submitted status
    } else {
      this.successMessage = null;
    }
  }
 
  // Utility function to check if a specific field is invalid and submitted
  isFieldInvalid(field: string): boolean {
    const control = this.employeeForm.get(field);
    return !!(this.submitted && control?.invalid);
  }
}
 