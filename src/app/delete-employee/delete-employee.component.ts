import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
})
export class DeleteEmployeeComponent {
  deleteForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  employeeDetails: any = null;
  imageUrl: string | null = null; // Store the image URL

  private apiUrl = 'http://localhost:8080/api/photos'; // The backend API URL for photos

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private http: HttpClient) {
    this.deleteForm = this.fb.group({
      employeeId: [''],
    });
  }

  // Fetch Employee Details and Image
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
        
        // Check if the employee has a profile picture
        if (this.employeeDetails?.profilePicture) {
          this.getImageUrl(this.employeeDetails.profilePicture);
        } else {
          this.imageUrl = null; // Set to null if no profile picture is available
        }
      },
      (error) => {
        this.errorMessage = 'Employee doesnt exist' ;
        this.employeeDetails = null;
        this.imageUrl = null; // Clear image URL on error
      }
    );
  }

  // Function to fetch the image from the backend and store it
  getImageUrl(profilePicturePath: string): void {
    const url = `${this.apiUrl}?profilePicturePath=${encodeURIComponent(profilePicturePath)}`;
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (imageBlob: Blob) => {
        // Create a URL for the blob to display it in the template
        this.imageUrl = URL.createObjectURL(imageBlob);
      },
      (error) => {
        console.error('Error fetching image:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load image. Please try again later.',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    );
  }

  // Delete Functionality
  onDelete() {
    this.errorMessage = '';
    this.successMessage = '';
  
    if (!this.employeeDetails || !this.deleteForm.value.employeeId) {
      this.errorMessage = 'Please fetch and verify employee details before deleting.';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorMessage,
      });
      return;
    }
  
    this.employeeService.deleteEmployee(this.deleteForm.value.employeeId).subscribe(
      (response) => {
        this.successMessage = 'Employee deleted successfully.';
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: this.successMessage,
        });
  
        this.employeeDetails = null;
        this.imageUrl = null; // Clear the image when employee is deleted
        this.deleteForm.reset();
      },
      (error) => {
        this.errorMessage = 'Error deleting employee: ' + error.message;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: this.errorMessage,
        });
      }
    );
  }
  
}
