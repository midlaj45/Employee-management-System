import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule,FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  // Dummy employee data
  employees = [
    { id: 101, name: 'Jane Doe', department: 'IT', role: 'Developer' },
    { id: 102, name: 'John Smith', department: 'HR', role: 'Manager' },
    { id: 103, name: 'Mary Johnson', department: 'Finance', role: 'Analyst' },
    { id: 104, name: 'Michael Brown', department: 'IT', role: 'DevOps' },
    { id: 105, name: 'Emma Wilson', department: 'HR', role: 'Recruiter' }
  ];

  searchType: string = 'name'; // Default search type
  searchValue: string = '';
  filteredEmployees = [...this.employees]; // Initially show all employees

  onSearch() {
    // Filter employees based on search criteria
    if (this.searchType === 'name') {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } else if (this.searchType === 'department') {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.department.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } else if (this.searchType === 'role') {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.role.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }
  }
}
