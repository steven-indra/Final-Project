import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ea-employee-data',
    templateUrl: 'app/employee-data.component.html',
    styleUrls: ['app/employee-data.component.css']
})
export class EmployeeDataComponent {
    employee = null;
    paramsSubscription;

    constructor(private employeeService: EmployeeService,
        private activatedRoute: ActivatedRoute) { }

    show = false;

    ngOnInit() {
        this.paramsSubscription = this.activatedRoute.params
        .subscribe(params => {
            let employeeId = params['id'];
            this.getItems(employeeId);            
        });
    }

    getItems(employeeId) {
        this.employeeService.getData(employeeId)
            .subscribe(employee => {
                this.employee = employee;
                if (this.employee == null)
                {
                    this.show = false;
                }else
                {
                    this.show = true;
                }
            });
        }
}
