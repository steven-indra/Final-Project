import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { EmployeeFilterDialog } from './employee-filter.component';
import { EmployeeMessageDialog } from './employee-messagebox.component';
import { MdSnackBar } from '@angular/material';

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
  filtered = false;
  private subscription: Subscription;

  constructor(private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private refreshService: RefreshService,
    public dialog: MdDialog,
    public snackBar: MdSnackBar,) { }

  ngOnInit() {
    this.employeeService.getAll()
      .subscribe(employees => this.employees = employees);
    this.subscription = this.refreshService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'refresh') {
        this.selectedEmployee = null;
        this.edited = false;
        this.getEmployees(this.query, this.genderFilter, this.locationFilter, this.sort);
      } else if (res.hasOwnProperty('option') && res.option === 'refreshSelected') {
        this.selectedEmployee = null;
        this.edited = false;
      } else if (res.hasOwnProperty('option') && res.option === 'selectedEmployee') {
        this.selectedEmployee = res.value;
        this.edited = true;
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
    let dialogRef = this.dialog.open(EmployeeMessageDialog, {
      height: '180px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.employeeService.delete(this.selectedEmployee)
          .subscribe(empId => {
            this.openSnackBar(`Employe with id ${this.selectedEmployee.empId} has been deleted`);
            this.selectedEmployee = null;
            this.edited = false;
            this.router.navigate(['/employees/']);
            this.getEmployees(this.query, this.genderFilter, this.locationFilter, this.sort);
          });
      }
    });

  }

  onFilter() {
    let dialogRef = this.dialog.open(EmployeeFilterDialog, {
      height: '245px',
      width: '280px',
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
          if (this.locationFilter != "" || this.genderFilter != "") {
            this.filtered = true;
          } else {
            this.filtered = false;
          }
          this.getEmployees(this.query, this.genderFilter, this.locationFilter, this.sort);
        }
      }

    });

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '' , {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getEmployees(query, genderFilter, locationFilter, sort) {
    this.employeeService.get(query, genderFilter, locationFilter, sort)
      .subscribe(employees => {
        this.employees = employees;
        //console.log(this.selectedEmployee);
        if (this.employees.length == 0) {
          this.show = true;
        } else {
          this.show = false;
        }
      });
  }
}
