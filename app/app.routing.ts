import { Routes, RouterModule } from '@angular/router';

// import { ItemFormComponent } from './item-form.component';
import { EmployeeDataComponent } from './employee-data.component';
// import { ReportItemComponent } from './report-item.component';

const appRoutes: Routes = [
  // { path: 'add', component: ItemFormComponent },
  // { path: 'report', component: ReportItemComponent },
  { path: 'employee/:id', component: EmployeeDataComponent },
  { path: 'employee', pathMatch: 'full', redirectTo: 'employee/' },
  { path: '', pathMatch: 'full', redirectTo: 'employee/' }
];

export const routing = RouterModule.forRoot(appRoutes);
