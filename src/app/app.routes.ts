import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

// Export routes if needed elsewhere
export const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route
  { path: '**', redirectTo: '', pathMatch: 'full' } // Catch-all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], // Only RouterModule should be exported
})
export class AppRoutingModule {}
