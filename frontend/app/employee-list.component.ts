import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { EmployeeFilterDialog } from './employee-filter.component';

import { RefreshService } from './refresh.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ea-employee-list',
  templateUrl: 'app/employee-list.component.html',
  styleUrls: ['app/employee-list.component.css']
})
export class EmployeeListComponent {
  employees = null;
  sort = "asc";
  query = "";
  show = false;
  edited = false;
  selectedEmployee = null;
  locationFilter = "";
  genderFilter = "";
  private subscription: Subscription;

  constructor(private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private refreshService: RefreshService,
    public dialog: MdDialog) { }

  ngOnInit() {
    this.employeeService.getAll()
      .subscribe(employees => this.employees = employees);
    this.subscription = this.refreshService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'refresh') {
        this.getEmployees(this.query, this.genderFilter, this.locationFilter, this.sort);
      } else if (res.hasOwnProperty('option') && res.option === 'refreshSelected') {
        this.selectedEmployee = null;
        this.edited = false;
      }else if (res.hasOwnProperty('option') && res.option === 'refreshCancel') {
        this.selectedEmployee = null;
        this.edited = false;
      }
    });
  }

  onClick(employee) {
    this.edited = true;
    this.selectedEmployee = employee;
    this.router.navigate(['/employees', employee.empId]);
  }

  onChange(event) {
    this.query = event.target.value;
    this.getEmployees(this.query, this.genderFilter, this.locationFilter, this.sort);
  }

  onSort() {
    if (this.sort == "asc") {
      this.sort = "desc";
    } else {
      this.sort = "asc";
    }
    this.getEmployees(this.query, this.genderFilter, this.locationFilter, this.sort);
  }

  onDelete() {
    this.employeeService.delete(this.selectedEmployee)
      .subscribe(empId => {
        this.selectedEmployee = null;
        this.edited = false;
        this.router.navigate(['/employees/']);
        this.getEmployees(this.query, this.genderFilter, this.locationFilter, this.sort);
      });
  }

  onFilter() {
    let dialogRef = this.dialog.open(EmployeeFilterDialog, {
      height: '400px',
      width: '600px',
    });
    if (this.genderFilter != "") {
      dialogRef.componentInstance.gender = this.genderFilter;
      dialogRef.componentInstance.tempGender = this.genderFilter;
      dialogRef.componentInstance.genderDisabled = true;
    }
    if (this.locationFilter != "") {
      dialogRef.componentInstance.location = this.locationFilter;
      dialogRef.componentInstance.tempLocation = this.locationFilter;
      dialogRef.componentInstance.locationDisabled = true;
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.action == "filter") {
          this.locationFilter = result.locValue;
          this.genderFilter = result.genderValue;
          this.getEmployees(this.query, this.genderFilter, this.locationFilter, this.sort);
        }
      }

    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getEmployees(query, genderFilter, locationFilter, sort) {
    this.employeeService.get(query, genderFilter, locationFilter, sort)
      .subscribe(employees => {
        this.employees = employees;
        console.log(this.selectedEmployee);
        if (this.employees.length == 0) {
          this.show = true;
        } else {
          this.show = false;
        }
      });
  }
}
