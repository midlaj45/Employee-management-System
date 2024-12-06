import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 
import { Employee } from './employee';
 
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/employees';  // Backend URL
 

 
  constructor(private http: HttpClient,private authService: AuthService) {}
 
  // Method to create a new employee
  createEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employee);
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

  
 // Fetch deleted employees
    getDeletedEmployees(): Observable<Employee[]> {
      return this.http.get<Employee[]>(`${this.apiUrl}/deleted`);
    }

  submitWorkingHours(csvRecord: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, csvRecord, {
      headers: {
        'Content-Type': 'text/plain', // Send as plain text
      },
    });
  }
  // getEmployeeById(employeeId: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/${employeeId}`);
  // }

  getEmployeeById(employeeId: number): Observable<any> {
    const token = this.authService.getToken();  // Use lowercase `authService`

    if (!token) {
      throw new Error('No token found. User is not authenticated.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/${employeeId.toString()}`, { headers });
  }
}
 
 