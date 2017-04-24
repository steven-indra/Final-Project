import { Routes, RouterModule } from '@angular/router';

import { EmployeeFormComponent } from './employee-form.component';
// import { ReportItemComponent } from './report-item.component';

const appRoutes: Routes = [
  // { path: 'employees/add', component: EmployeeFormComponent },
  // { path: 'report', component: ReportItemComponent },
  { path: 'employees/:id', component: EmployeeFormComponent },
  { path: 'employees', pathMatch: 'full', redirectTo: 'employees/' },
  { path: '', pathMatch: 'full', redirectTo: 'employees/' }
];

export const routing = RouterModule.forRoot(appRoutes);
