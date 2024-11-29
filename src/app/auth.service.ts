import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Store the JWT in localStorage
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Get the JWT from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Remove the JWT from localStorage (logout)
  removeToken() {
    localStorage.removeItem('token');
  }

  // Login method
  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signin`, userData).pipe(
      map((response: any) => {
        // Assuming the response structure is { message: "User logged in successfully.", token: "your.jwt.token" }
        if (response && response.token) {
          // Save the JWT token to localStorage (or sessionStorage if needed)
          localStorage.setItem('token', response.token);  // Store token for later use
        }
        return response;  // Return the entire response (message, token, etc.)
      })
    );
  }
  

  // Signup method
  signup(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, userData).pipe(
      map(response => {
        // Assuming the response has a 'message' field
        return response.message; // Or the appropriate field from the response
      })
    );
  }
  

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Get authorization header with token for API calls
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }
  // Check if the JWT token exists in localStorage
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');  // Assuming the JWT is stored under the 'token' key
    return !!token;  // Returns true if the token exists, false otherwise
  }

}
