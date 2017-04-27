import { Component, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
    selector: 'employee-message-dialog',
    templateUrl: 'app/employee-messagebox.component.html',
})
export class EmployeeMessageDialog {
    constructor(public dialogRef: MdDialogRef<EmployeeMessageDialog>) { }
}