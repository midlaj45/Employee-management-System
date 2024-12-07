import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
 
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/employees';  // Backend URL
 
  constructor(private http: HttpClient) {}
 
  // Method to create a new employee


  createEmployee(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
  getAllEmployees(): Observable<any> {
    return this.http.get<any>(this.apiUrl);  // Make GET request to fetch employee data
  }
 
  // Update Employee by ID
  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, employee);
  }
  // Delete Employee by ID (using number for ID)
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  getEmployeeById(employeeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${employeeId}`);
  }
  submitWorkingHours(csvRecord: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, csvRecord, {
      headers: {
        'Content-Type': 'text/plain', // Send as plain text
      },
    });
  }
 
}
 