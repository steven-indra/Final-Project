import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service'

@Component({
    selector: 'ea-employee',
    templateUrl: 'app/employee.component.html',
    styleUrls: ['app/employee.component.css']
})
export class EmployeeComponent {
    @Input() employee;

    constructor(private employeeService: EmployeeService,
        private router: Router) { }
    
    onSelect(){
        this.router.navigate(['/employee', this.employee.id]);
    }

}
