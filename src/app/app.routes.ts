import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'search', component: SearchComponent },// Default route
  { path: '', redirectTo: 'login', pathMatch: 'full' } // Catch-all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule], // Only RouterModule should be exported

})
export class AppRoutingModule {}
