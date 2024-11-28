import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../employee.service';  // Make sure the service is imported
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [CommonModule, NavbarComponent,ReactiveFormsModule, ],
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
})
export class DeleteEmployeeComponent {
  deleteForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.deleteForm = this.fb.group({
      employeeId: [''],  // Only employee ID for deletion
    });
  }

  // Delete Functionality
  onDelete() {
    this.errorMessage = '';
    this.successMessage = '';
    const { employeeId } = this.deleteForm.value;

    // Check if employeeId is provided
    if (!employeeId) {
      this.errorMessage = 'Please enter Employee ID to delete.';
      return;
    }

    // Call the deleteEmployee service method
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response) => {
        this.successMessage = 'Employee deleted successfully.';
        this.deleteForm.reset();  // Reset the form after successful deletion
      },
      (error) => {
        this.errorMessage = 'Error deleting employee: ' + error.message;
      }
    );
  }
}
