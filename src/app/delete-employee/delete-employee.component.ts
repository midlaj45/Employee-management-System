import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,ReactiveFormsModule} from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { CommonModule, } from '@angular/common';

@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
})
export class DeleteEmployeeComponent {
  deleteForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  employeeDetails: any = null;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.deleteForm = this.fb.group({
      employeeId: [''],
    });
  }
  
  // Fetch Employee Details
  onFetchEmployeeDetails() {
    let { employeeId } = this.deleteForm.value;
    
    if (!employeeId) {
      this.errorMessage = 'Please enter Employee ID to fetch details.';
      this.employeeDetails = null;
      return;
    }
    employeeId = Number(employeeId);
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (response) => {
        this.employeeDetails = response.data;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Error fetching employee details: ' + error.message;
        this.employeeDetails = null;
      }
    );
  }

  // Delete Functionality
  onDelete() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.employeeDetails || !this.deleteForm.value.employeeId) {
      this.errorMessage = 'Please fetch and verify employee details before deleting.';
      return;
    }

    this.employeeService.deleteEmployee(this.deleteForm.value.employeeId).subscribe(
      (response) => {
        this.successMessage = 'Employee deleted successfully.';
        this.employeeDetails = null;
        this.deleteForm.reset();
      },
      (error) => {
        this.errorMessage = 'Error deleting employee: ' + error.message;
      }
    );
  }
}
