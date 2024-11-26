import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.css'],
  imports: [CommonModule,FormsModule,NavbarComponent,], 
  
})
export class WorkingHoursComponent {
  date: string = ''; // Date for the working hours entry
  workingHours = [
    { employeeId: '', employeeName: '', project: '', startTime: '', endTime: '' },
    { employeeId: '', employeeName: '', project: '', startTime: '', endTime: '' },
    { employeeId: '', employeeName: '', project: '', startTime: '', endTime: '' },
  ];

  // Add a new row to the table
  addRow() {
    this.workingHours.push({ employeeId: '', employeeName: '', project: '', startTime: '', endTime: '' });
  }

  // Remove a row from the table (minimum 3 rows required)
  removeRow(index: number) {
    
      this.workingHours.splice(index, 1);
   
  }

  // Submit the form data
  onSubmit() {
    console.log('Working Hours Data:', { date: this.date, workingHours: this.workingHours });
    alert('Working hours submitted successfully!');
  }
}
