import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NavbarComponent } from '../shared/navbar/navbar.component'; // Import CommonModule
@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule,NavbarComponent,],  // Include CommonModule here
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent {
  // Dummy employee data
  employees = [
    {
      id: 101,
      firstName: 'John',
      lastName: 'Doe',
      department: 'Engineering',
      role: 'Developer',
      email: 'john.doe@example.com',
      mobileNumber: '1234567890'
    },
    {
      id: 102,
      firstName: 'Jane',
      lastName: 'Smith',
      department: 'Marketing',
      role: 'Manager',
      email: 'jane.smith@example.com',
      mobileNumber: '9876543210'
    },
    {
      id: 103,
      firstName: 'Tom',
      lastName: 'Brown',
      department: 'Sales',
      role: 'Sales Executive',
      email: 'tom.brown@example.com',
      mobileNumber: '1122334455'
    }
  ];
}
 
 
 