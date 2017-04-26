import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { EmployeeService } from './employee.service';
import { LocationService } from './location.service';
import { RefreshService } from './refresh.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { lookupListToken } from './providers';

@Component({
  selector: 'ea-employee-form',
  templateUrl: 'app/employee-form.component.html'
})
export class EmployeeFormComponent {
  form;
  file;
  show = false;
  employee = null;
  employeeImage = "";
  edited = false;
  employeeId;

  locations;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private refreshService: RefreshService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datepipe: DatePipe,
    private locationService: LocationService,
    @Inject(lookupListToken) public lookupLists) { }

  ngOnInit() {
    this.getLocations();

    this.form = this.formBuilder.group({
      firstName: this.formBuilder.control(''),
      lastName: this.formBuilder.control(''),
      gender: this.formBuilder.control(''),
      dob: this.formBuilder.control(''),
      nationality: this.formBuilder.control(''),
      maritalStatus: this.formBuilder.control(''),
      phone: this.formBuilder.control(''),
      subDivision: this.formBuilder.control(''),
      status: this.formBuilder.control(''),
      suspendDate: this.formBuilder.control(''),
      hiredDate: this.formBuilder.control(''),
      grade: this.formBuilder.control(''),
      division: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      location: this.formBuilder.control(''),
    });

    this.activatedRoute.params
      .subscribe(params => {
        this.employeeId = params['id'];
        this.show = false;
        if (this.employeeId == "add") {
          this.edited = false;
          this.show = true;
          this.employeeImage = "../default-user-image.png";
          this.file = null;
          this.form.reset();
        } else if (this.employeeId != null && this.employeeId != "") {
          this.getEmployee(this.employeeId);
        }

      });


  }

  getLocations()
  {
    this.locationService.getAll()
      .subscribe(locations => {
        this.locations = locations;
      });
  }

  onCancel() {
    this.refreshService.notifyOther({ option: 'refreshCancel', value: 'cancel' });
    this.router.navigate(['/employees/']);
  }

  onValue() {
    if (this.edited == true) {
      let value = "";
      this.form.controls['firstName'].setValue(this.employee.firstName);
      this.form.controls['lastName'].setValue(this.employee.lastName);
      this.form.controls['gender'].setValue(this.employee.gender);
      var empDob = new Date(this.employee.dob);
      value = this.datepipe.transform(empDob, 'yyyy-MM-dd');
      this.form.controls['dob'].setValue(value);
      this.form.controls['nationality'].setValue(this.employee.nationality);
      this.form.controls['maritalStatus'].setValue(this.employee.maritalStatus);
      this.form.controls['phone'].setValue(this.employee.phone);
      this.form.controls['subDivision'].setValue(this.employee.subDivision);
      this.form.controls['status'].setValue(this.employee.status);
      if (this.employee.suspendDate != null) {
        var empSuspendDate = new Date(this.employee.suspendDate);
        value = this.datepipe.transform(empSuspendDate, 'yyyy-MM-dd');
      } else {
        value = null
      }
      this.form.controls['suspendDate'].setValue(value);
      var empHiredDate = new Date(this.employee.hiredDate);
      value = this.datepipe.transform(empHiredDate, 'yyyy-MM-dd');
      this.form.controls['hiredDate'].setValue(value);
      this.form.controls['grade'].setValue(this.employee.grade);
      this.form.controls['division'].setValue(this.employee.division);
      this.form.controls['email'].setValue(this.employee.email);
      this.form.controls['location'].setValue(this.employee.location.locationCity);
      if (this.employee.image == null) {
        this.employeeImage = "../default-user-image.png";
      } else {
        this.employeeImage = "data:image/JPEG;base64," + this.employee.image;
      }
    }
  }

  getEmployee(employeeId) {
    this.employeeService.getData(employeeId)
      .subscribe(employee => {
        this.employee = employee;
        if (this.employee == null) {
          this.show = false;
        } else {
          this.show = true;
          this.edited = true;
          this.onValue();
        }
      });
  }

  onChange(event) {
    this.file = event.srcElement.files;

    console.log(this.file[0]);
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.employeeImage = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    console.log(this.employeeImage);
    //this.employeeImage = this.file[0].name;
  }

  onSubmit(employee) {
    console.log(employee);
    this.employeeService.addOrUpdate(employee, this.file, this.employeeId)
      .subscribe((response) => {
        console.log(response);
        this.refreshService.notifyOther({ option: 'refresh', value: 'from form' });
        this.router.navigate(['/employees/']);
      });
  }
}
