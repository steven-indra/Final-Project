import { Component, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { lookupListToken } from './providers';
import { LocationService } from './location.service';

@Component({
    selector: 'employee-filter-dialog',
    templateUrl: 'app/employee-filter.component.html',
    styleUrls: ['app/employee-filter.component.css']

})
export class EmployeeFilterDialog {
    genderDisabled = false; //false => disabled; true => enabled
    locationDisabled = false; // false => disabled; true => enabled
    gender = "";
    tempGender = "";
    location = "";
    tempLocation = "";
    constructor(public dialogRef: MdDialogRef<EmployeeFilterDialog>,
        private locationService: LocationService,
        @Inject(lookupListToken) public lookupLists) { }
    locations;

    ngOnInit() {
        this.locationService.getAll()
            .subscribe(locations => {
                this.locations = locations;
            });
    }

    onGenderCbClick() {
        if (this.genderDisabled == true) {
            this.gender = "";
        } else {
            this.gender = this.tempGender;
        }
    }
    onGenderChange(event) {
        this.gender = event.value;
        this.tempGender = event.value;
    }
    onLocationCbClick() {
        if (this.locationDisabled == true) {
            this.location = "";
        } else {
            this.location = this.tempLocation;
        }
    }
    onLocationChange(event) {
        this.location = event.value;
        this.tempLocation = event.value;
    }
}