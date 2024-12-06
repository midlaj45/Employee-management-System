import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerformanceReportService {
  private apiEndpoint = 'http://localhost:8080/api/performance/report';

  constructor(private http: HttpClient) {}

  getPerformanceData(): Observable<string> {
    return this.http.get(this.apiEndpoint, { responseType: 'text' });
  }
}
