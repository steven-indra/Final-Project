import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdCardModule,MdDialogModule, MdSelectModule, MdToolbarModule, MdIconModule, MdChipsModule, MdInputModule, MdTabsModule } from '@angular/material';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeFilterDialog } from './employee-filter.component';
import { EmployeeMessageDialog } from './employee-messagebox.component';
import { SafeUrl } from './safe-url.pipe';
import { EmployeeFormComponent } from './employee-form.component';
import { EmployeeService } from './employee.service';
import { LocationService } from './location.service';
import { lookupListToken, lookupLists } from './providers';
import { routing } from './app.routing';
import { RefreshService } from './refresh.service';
import { DatePipe } from '@angular/common';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdDialogModule,
    MdSelectModule,
    MdToolbarModule,
    MdIconModule,
    MdChipsModule,
    MdInputModule,
    MdTabsModule,
    routing
  ],
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeFilterDialog,
    SafeUrl,
    EmployeeMessageDialog,
    EmployeeFormComponent
  ],
  entryComponents: [
    EmployeeFilterDialog,
    EmployeeMessageDialog
  ],
  providers: [
    EmployeeService,
    RefreshService,
    LocationService,
    { provide: lookupListToken, useValue: lookupLists },
    DatePipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}