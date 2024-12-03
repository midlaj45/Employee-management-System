import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SearchComponent} from './search/search.component';
import { FormsModule } from '@angular/forms';
import { WorkingHoursComponent } from './working-hours/working-hours.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { PerformanceReportComponent } from './performance-report/performance-report.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent ,}, 
  { path: 'search', component: SearchComponent },
  { path: 'working-hours', component: WorkingHoursComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  {path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard],},

  
  { path: 'delete-employee', component: DeleteEmployeeComponent },
  { path: 'update-employee', component: UpdateEmployeeComponent },
  { path: 'view-employee', component: ViewEmployeeComponent },
  { path: 'performance-report', component: PerformanceReportComponent },
  { path: 'signup', component: SignupComponent ,},



  // Default route
  { path: '', redirectTo: 'signup', pathMatch: 'full' } // Catch-all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule], // Only RouterModule should be exported

})
export class AppRoutingModule {}
