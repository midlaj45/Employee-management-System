import { Component, OnInit } from '@angular/core';
import { PerformanceReportService } from '../performance.service';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto'; // Import Chart.js

@Component({
  selector: 'app-performance-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './performance-report.component.html',
  styleUrls: ['./performance-report.component.css'],
})
export class PerformanceReportComponent implements OnInit {
  performanceData: { id: string; performance: string }[] | null = null;
  employeeDetails: { [key: string]: { name: string; department: string; role: string } } = {};
  isLoading: boolean = true;
  error: string | null = null;
  searchedEmployee: any = null;
  showTable: boolean = true;  // Define the showTable property here
  showEmployeeSearchForm: boolean = false; // Flag to show the search form
  searchId: string = ''; 
  currentPage: number = 1;
  totalPages: number = 10; 
  showGraph: boolean = false;
 
  constructor(
    private performanceReportService: PerformanceReportService,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchPerformanceData();
  }

  fetchPerformanceData(): void {
    this.performanceReportService.getPerformanceData().subscribe(
      (data: string) => {
        this.isLoading = false;
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
        this.isLoading = false;
        this.error = 'Failed to fetch performance data.';
        console.error('Error fetching performance data', err);
      }
    );
  }
  
  // New method to show the performance graph
  showPerformanceGraph(): void {
    this.showGraph = !this.showGraph;  // Toggle graph visibility
    this.showEmployeeSearchForm = false; 
    this.showTable = false;
    this.searchedEmployee = null; 
    console.log('Button clicked! showGraph:', this.showGraph);  // Check toggle
  
    if (this.showGraph) {
      // Add a small delay to allow DOM to update before rendering the chart
      setTimeout(() => {
        this.renderPerformanceGraph(); // Render the chart
      }, 3);
    }
  }
  
  
renderPerformanceGraph(): void {
  console.log('Rendering performance graph...');
  
  const ctx = (document.getElementById('performanceChart') as HTMLCanvasElement)?.getContext('2d');
  if (ctx && this.performanceData) {
    console.log('Rendering chart...');
    
    const employeeIds = this.performanceData.map(record => record.id);
    const performances = this.performanceData.map(record => parseFloat(record.performance));

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: employeeIds,  // X-axis labels (Employee IDs)
        datasets: [{
          label: 'Performance Score',
          data: performances,  // Y-axis data (Performance scores)
          backgroundColor: '#4caf50',
          borderColor: '#388e3c',
          borderWidth: 1,
          barThickness: 30,
        }],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Employee ID',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Performance Score',
            },
            min: 0,
            max: 100,
          },
        },
        plugins: {
          legend: {
            display: false,  // Hide the legend
          },
        },
      },
    });
  } else {
    console.error('Chart context not found or performance data is missing.');
  }
}
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  fetchEmployeeDetails(employeeId: string): void {
    this.employeeService.getEmployeeById(+employeeId).subscribe(
      (response) => {
        if (response && response.data) {
          const employee = response.data;
          this.employeeDetails[employeeId] = {
            name: `${employee.firstName} ${employee.lastName}`,
            department: employee.department?.name || 'Not Available',
            role: employee.role || 'Not Available',
          };
        }
      },
      (err) => {
        console.error('Error fetching employee details for ID:', employeeId, err);
      }
    );
  }

  viewAllReports(): void {
    this.showTable = true;  // Show the performance report table again
    this.showEmployeeSearchForm = false; // Flag to show the search form
    this.showGraph =false;
    this.searchedEmployee = null; 
    this.fetchPerformanceData();
  }
  
  getCircleColor(performance: number): string {
    if (performance > 80) return 'green';
    if (performance > 50) return 'yellow';
    return 'red';
  }
  
  getCirclePercentage(performance: number): number {
    return (performance / 100) * 283;  // 283 is the maximum circumference of the circle
  }

  generatePerformanceChart(performanceScore: string): void {
    const ctx = (document.getElementById('performance-chart') as HTMLCanvasElement)?.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Performance Score', 'Remaining'],
          datasets: [
            {
              data: [parseFloat(performanceScore), 100 - parseFloat(performanceScore)],
              backgroundColor: ['#4caf50', '#e6e6e6'],
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }

  // Show the employee search form
  showSearchEmployee(): void {
    this.showTable = false;
    this.showGraph =false;
    this.showEmployeeSearchForm = !this.showEmployeeSearchForm;
  }

  // Search for an employee by ID
  searchEmployee(): void {
    if (this.searchId) {
      const performance = this.performanceData?.find(
        (record) => record.id === this.searchId
      )?.performance;

      if (!performance) {
        alert('Performance data not available for this employee.');
        return;
      }

      this.employeeService.getEmployeeById(+this.searchId).subscribe(
        (response) => {
          if (response && response.data) {
            const employee = response.data;
            this.searchedEmployee = {
              id: employee.id,
              name: `${employee.firstName} ${employee.lastName}`,
              department: employee.department?.name || 'Not Available',
              role: employee.role || 'Not Available',
              performance: performance || 'Not Available',
            };
            this.generatePerformanceChart(this.searchedEmployee.performance);
          } else {
            alert('Employee not found.');
          }
        },
        (err) => {
          console.error('Error fetching employee details for search:', err);
          alert('Failed to fetch employee details.');
        }
      );
    }
  }

  closeSearchForm(): void {
    this.showEmployeeSearchForm = false;
  }
}
