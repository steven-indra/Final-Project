import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { EmployeeService } from './employee.service';
import { LocationService } from './location.service';
import { RefreshService } from './refresh.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { lookupListToken } from './providers';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'ea-employee-form',
  templateUrl: 'app/employee-form.component.html',
  styleUrls: ['app/employee-form.component.css']
})
export class EmployeeFormComponent {
  form;
  file;
  show = false;
  employee = null;
  employeeImage = "";
  edited = false;
  employeeId;
  submitted = false;
  locations;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private refreshService: RefreshService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datepipe: DatePipe,
    private locationService: LocationService,
    public snackBar: MdSnackBar,
    @Inject(lookupListToken) public lookupLists) { }

  ngOnInit() {
    this.getLocations();
    
    this.form = this.formBuilder.group({
      firstName: this.formBuilder.control('', Validators.required),
      lastName: this.formBuilder.control('', Validators.required),
      gender: this.formBuilder.control('', Validators.required),
      dob: this.formBuilder.control('', Validators.required),
      nationality: this.formBuilder.control('', Validators.required),
      maritalStatus: this.formBuilder.control('', Validators.required),
      phone: this.formBuilder.control('', Validators.required),
      subDivision: this.formBuilder.control('', Validators.required),
      status: this.formBuilder.control('', Validators.required),
      suspendDate: this.formBuilder.control(''),
      hiredDate: this.formBuilder.control('', Validators.required),
      grade: this.formBuilder.control('', Validators.required),
      division: this.formBuilder.control('', Validators.required),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      location: this.formBuilder.control('', Validators.required),
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
          this.submitted = false;
        } else if (this.employeeId != null && this.employeeId != "") {
          this.getEmployee(this.employeeId);
        }

      });


  }

  getLocations() {
    this.locationService.getAll()
      .subscribe(locations => {
        this.locations = locations;
      });
  }

  onCancel() {
    this.refreshService.notifyOther({ option: 'refreshSelected', value: 'cancel' });
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
      this.form.controls['location'].setValue(this.employee.location.locId);
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
          this.file = null;
          this.refreshService.notifyOther({ option: 'selectedEmployee', value: this.employee });
        }
      });
  }

  onChange(event) {
    this.file = event.target.files[0];

    //console.log(this.file[0]);
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.employeeImage = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    //console.log(this.employeeImage);
    //this.employeeImage = this.file[0].name;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '' , {
      duration: 2000,
    });
  }

  onSubmit(employee, validation) {
    this.submitted = true;
    if (validation == true) {
      console.log(this.file);
      this.employeeService.addOrUpdate(employee, this.file, this.employeeId)
        .subscribe((response) => {
          //console.log(response);
          if (this.employeeId != "add")
          {
            this.openSnackBar(`Employe with id ${this.employeeId}, ${employee.firstName} ${employee.lastName}'s data has been updated`);
          }else
          {
            this.openSnackBar(`Employe ${employee.firstName} ${employee.lastName} has been created`);
          }
          
          this.file = undefined;
          this.refreshService.notifyOther({ option: 'refresh', value: 'from form' });
          this.router.navigate(['/employees/']);
        });
    } else {
      this.form.get('gender').markAsTouched();
      this.form.get('status').markAsTouched();
      this.form.get('grade').markAsTouched();
      this.form.get('maritalStatus').markAsTouched();
      this.form.get('division').markAsTouched();
      this.form.get('location').markAsTouched();
      return false;
    }
  }
}
