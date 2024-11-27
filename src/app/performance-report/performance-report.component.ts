import { Component } from '@angular/core';
 
import { CommonModule } from '@angular/common';
 
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar.component';
 
@Component({
 
  selector: 'app-performance-report',
 
  standalone: true,
 
  templateUrl: './performance-report.component.html',
 
  styleUrls: ['./performance-report.component.css'],
 
  imports: [CommonModule, FormsModule,NavbarComponent,],
 
})
 
export class PerformanceReportComponent {
  isAllReports: boolean = true;
  isSearchEmployee: boolean = false;
  searchId: string = '';
  selectedEmployee: any = null;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  isSearchPressed: boolean = false; // Flag to track if search button was pressed
 
  // Dummy Employee Data
  employees: any[] = [
    { id: '1', name: 'John Doe', role: 'Developer', department: 'IT', performanceRating: 9.2 },
    { id: '2', name: 'Jane Smith', role: 'Designer', department: 'Creative', performanceRating: 7.8 },
    { id: '3', name: 'Alice Brown', role: 'Manager', department: 'HR', performanceRating: 6.5 },
    { id: '4', name: 'Bob White', role: 'Engineer', department: 'Engineering', performanceRating: 4.5 },
    { id: '5', name: 'Charlie Black', role: 'Analyst', department: 'Finance', performanceRating: 8.1 },
    { id: '6', name: 'Emma Green', role: 'Project Manager', department: 'Operations', performanceRating: 7.3 },
    { id: '7', name: 'Liam Red', role: 'Sales Executive', department: 'Sales', performanceRating: 9.5 },
    { id: '8', name: 'Olivia White', role: 'Marketing Manager', department: 'Marketing', performanceRating: 6.9 },
    { id: '9', name: 'Sophia Blue', role: 'Product Lead', department: 'Product', performanceRating: 5.8 },
    { id: '10', name: 'Mason Yellow', role: 'Software Engineer', department: 'Development', performanceRating: 3.4 },
    { id: '11', name: 'Alice Green', role: 'Data Scientist', department: 'AI', performanceRating: 8.5 },
    { id: '12', name: 'Peter Blue', role: 'UX Designer', department: 'Creative', performanceRating: 7.0 },
    { id: '13', name: 'Sara Black', role: 'HR Manager', department: 'HR', performanceRating: 6.2 },
    { id: '14', name: 'Mike White', role: 'DevOps Engineer', department: 'Engineering', performanceRating: 5.0 }
  ];
 
  get paginatedEmployees(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.employees.slice(startIndex, startIndex + this.itemsPerPage);
  }
 
  get totalPages(): number {
    return Math.ceil(this.employees.length / this.itemsPerPage);
  }
 
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
 
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
 
  showAllReports(): void {
    this.isAllReports = true;
    this.isSearchEmployee = false;
    this.selectedEmployee = null;
    this.searchId = '';
    this.isSearchPressed = false;  // Reset the search flag
    this.currentPage = 1; // Reset to the first page
  }
 
  showSearchEmployee(): void {
    this.isAllReports = false;
    this.isSearchEmployee = true;
    this.selectedEmployee = null; // Reset the selected employee
    this.searchId = '';
    this.isSearchPressed = false; // Reset the search flag
    // Reset the animation when switching to the Search Employee section
    setTimeout(() => {
      document.querySelector('.search-section')?.classList.add('active');
    }, 100);
    setTimeout(() => {
      document.querySelector('.employee-info')?.classList.remove('active');
    }, 500); // Ensure employee info is hidden initially
  }
 
  searchEmployee(): void {
    this.isSearchPressed = true; // Set search flag to true when search is pressed
    this.selectedEmployee = this.employees.find((emp) => emp.id === this.searchId) || null;
    // If an employee is found, trigger the transition for employee info
    if (this.selectedEmployee) {
      setTimeout(() => {
        document.querySelector('.employee-info')?.classList.add('active');
      }, 200); // Add a slight delay to trigger the transition
    }
  }
 
  // Get circle percentage based on rating
  getCirclePercentage(rating: number): number {
    return (rating / 10) * 283; // Percentage in terms of SVG circle circumference
  }
 
  // Get color based on performance rating
  getCircleColor(rating: number): string {
    if (rating >= 9) return 'green';
    if (rating >= 7) return 'yellow';
    if (rating >= 5) return 'orange';
    return 'red';
  }
}
 