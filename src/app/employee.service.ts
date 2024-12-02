import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// Define the structure of the API response
interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}


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
  getEmployeeById(employeeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${employeeId}`);
  }


}
