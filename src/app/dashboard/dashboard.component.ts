import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { PerformanceReportService } from '../performance.service';
// import { Component, OnInit } from '@angular/core';
// import { PerformanceReportService } from '../performance.service';
// import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  performanceData: { id: string; performance: string }[] | null = null;
  employeeDetails: { [key: string]: any } = {};
  topPerformers: any[] = [];
  selectedEmployee1: any = null;
  selectedEmployee2: any = null;
  selectedEmployee3: any = null;
  error: string | null = null;

  constructor(
    private performanceReportService: PerformanceReportService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.fetchPerformanceData();
  }

  fetchPerformanceData(): void {
    this.performanceReportService.getPerformanceData().subscribe(
      (data: string) => {
        this.performanceData = data
          .split('\n')
          .map((line: string) => line.split(','))
          .filter((parts: string[]) => parts.length === 2)
          .map(([id, performance]) => ({
            id: id.trim(),
            performance: parseFloat(performance.trim()).toFixed(2),
          }));

        this.performanceData.forEach((record) => {
          this.fetchEmployeeDetails(record.id);
        });
      },
      (err) => {
        this.error = 'Failed to fetch performance data.';
        console.error('Error fetching performance data:', err);
      }
    );
  }

  fetchEmployeeDetails(employeeId: string): void {
    this.employeeService.getEmployeeById(+employeeId).subscribe(
      (response) => {
        if (response && response.data) {
          const employee = response.data;
          this.employeeDetails[employeeId] = {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            department: employee.department,
            role: employee.role,
          };

          this.selectTopPerformers(); // Recalculate top performers once details are updated
        }
      },
      (err) => {
        console.error('Error fetching employee details for ID:', employeeId, err);
      }
    );
  }

  selectTopPerformers(): void {
    if (this.performanceData && Object.keys(this.employeeDetails).length > 0) {
      const combinedData = this.performanceData.map((record) => ({
        ...record,
        ...this.employeeDetails[record.id],
      }));

      this.topPerformers = combinedData
        .sort((a, b) => parseFloat(b.performance) - parseFloat(a.performance)) // Sort by performance descending
        .slice(0, 3); // Take top 3 performers

      // Assign top performers to specific variables
      this.selectedEmployee1 = this.topPerformers[0] || null;
      this.selectedEmployee2 = this.topPerformers[1] || null;
      this.selectedEmployee3 = this.topPerformers[2] || null;

      console.log('Top Performers:', this.topPerformers);
    }
  }
}
