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
    @Input() selectedEmployee;

    constructor(private employeeService: EmployeeService,
        private router: Router) { }

    image() {
        if (this.employee.image == null) {
            return "../default-user-image.png";
        } else {
            return "data:image/JPEG;base64," + this.employee.image;
        }

    }

    isSelected()
    {
        let flag = false;
        if (this.employee != null && this.selectedEmployee != null)
        {
            if (this.employee.empId === this.selectedEmployee.empId)
            {
                flag = true;
            }
        }
        return flag;
    }

    onSelect() {
        this.router.navigate(['/employees', this.employee.empId]);
    }

}
