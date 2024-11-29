import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Employee } from './employee';

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
  private baseUrl = 'http://localhost:8080/api/employees';

  constructor(private httpClient: HttpClient) {}



  // Add a new employee
  createEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<ApiResponse<Employee>>(this.baseUrl, employee).pipe(
      map((response) => {
        if (response.statusCode === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Employee Added!',
            text: response.message || 'The employee has been successfully added.',
            timer: 1500,
            showConfirmButton: false,
          });
          return response.data;
        } else {
          throw new Error(response.message || 'Failed to add employee');
        }
      })
    );
  }

  
}
