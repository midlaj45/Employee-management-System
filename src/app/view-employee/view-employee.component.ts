import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchType: string = 'name';
  searchValue: string = '';
  errorMessage: string | null = null;
  p: number = 1;
  pageSize: number = 5;
  selectedEmployee: any = null; // Holds the details of the employee to be viewed
  imageUrl: string | null = null; // To store the image URL

  private apiUrl = 'http://localhost:8080/api/photos'; // The backend API URL for photos

  constructor(private employeeService: EmployeeService, private http: HttpClient) {}

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(
      (response) => {
        this.employees = response.data;
        this.filteredEmployees = this.employees;
      },
      (error) => {
        console.error('Error fetching employees:', error);
        this.errorMessage = 'Failed to load employees. Please try again later.';
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

  totalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.pageSize);
  }

  pagedEmployees(): any[] {
    const startIndex = (this.p - 1) * this.pageSize;
    const endIndex = this.p * this.pageSize;
    return this.filteredEmployees.slice(startIndex, endIndex);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.p = page;
    }
  }

  // Function to show employee details and fetch the image
  viewEmployeeDetails(employee: any): void {
    this.selectedEmployee = employee;
    // Fetch the image URL using the profilePicturePath
    this.getImageUrl(employee.profilePicture);
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

  // Function to close the employee details card
  closeEmployeeDetails(): void {
    this.selectedEmployee = null;
    this.imageUrl = null;  // Clear the image when closing the details
  }
}
