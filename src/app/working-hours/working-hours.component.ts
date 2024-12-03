import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { EmployeeService } from '../employee.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
})
export class WorkingHoursComponent {
  date: string = ''; // Date for the working hours entry
  workingHoursData = [
    {
      employeeId: '',
      firstName: '', 
      lastName: '',  
    
     
      tasksAssigned: 0,
      tasksCompleted: 0,
      tasksCompletedOnTime: 0,
    },
  ];
 // Inject EmployeeService
 constructor(
  private employeeService: EmployeeService,
  private http: HttpClient // Inject HttpClient
) {}
  // Add a new row to the table
  addRow() {
    this.workingHoursData.push({
      employeeId: '',
      firstName: '',
      lastName: '',

     
      tasksAssigned: 0,
      tasksCompleted: 0,
      tasksCompletedOnTime: 0,
    });
  }

  // Remove a row from the table (ensure at least one row remains)
  removeRow(index: number) {
    if (this.workingHoursData.length > 1) {
      this.workingHoursData.splice(index, 1);
    } else {
      alert('At least one row must remain.');
    }
  }

  // Fetch employee name by ID (separating firstName and lastName)
  fetchEmployeeName(index: number) {
    const employeeId = this.workingHoursData[index].employeeId;
    const employeeIdNumber = Number(employeeId);

    if (!isNaN(employeeIdNumber)) {
      this.employeeService.getEmployeeById(employeeIdNumber).subscribe({
        next: (response) => {
          if (response && response.data) {
            // Assuming response.data has firstName and lastName fields
            this.workingHoursData[index].firstName = response.data.firstName;
            this.workingHoursData[index].lastName = response.data.lastName;
          } else {
            alert('Employee not found.');
            this.workingHoursData[index].firstName = '';
            this.workingHoursData[index].lastName = ''; // Reset on error
          }
        },
        error: (err) => {
          console.error('Error fetching employee:', err);
          alert('Error fetching employee.');
          this.workingHoursData[index].firstName = '';
          this.workingHoursData[index].lastName = ''; // Reset on error
        },
      });
    } else {
      alert('Invalid Employee ID');
      this.workingHoursData[index].firstName = '';
      this.workingHoursData[index].lastName = ''; // Clear if invalid ID
    }
  }

  // Submit the form data
  

  // Export data to a local file in CSV format
  onSubmit() {
    if (
      this.date &&
      this.workingHoursData.every(
        (row) =>
          row.employeeId &&
          row.firstName &&  // Check if firstName is available
          row.lastName &&   // Check if lastName is available
          row.tasksAssigned >= 0 &&
          row.tasksCompleted >= 0 &&
          row.tasksCompletedOnTime >= 0
      )
    ) {
      // Create a CSV formatted record string
      let csvRecord = '';

      this.workingHoursData.forEach((row) => {
        const line = `${row.employeeId},${row.firstName} ${row.lastName},${this.date},${row.tasksAssigned},${row.tasksCompleted},${row.tasksCompletedOnTime}`;
        csvRecord += line ;
      });

      // Use the service to submit the working hours
      this.employeeService.submitWorkingHours(csvRecord).subscribe({
        next: (response: any) => {
          alert('Working hours submitted successfully!');
          console.log(response);
        },
        
      });
    } 
  }
}
