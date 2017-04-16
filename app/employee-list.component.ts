import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EmployeeService } from './employee.service';

@Component({
  selector: 'ea-employee-list',
  templateUrl: 'app/employee-list.component.html',
  styleUrls: ['app/employee-list.component.css']
})
export class EmployeeListComponent {
  employees;
  paramsSubscription;

  constructor(private employeeService:EmployeeService,
  private activatedRoute: ActivatedRoute){}

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params
      .subscribe(params => {       
        this.getItems('');
      });
  }

  onChange(event){
    this.paramsSubscription = this.activatedRoute.params
      .subscribe(params => {       
        this.getItems(event.target.value);
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  getItems(query) {
    this.employeeService.get(query)
      .subscribe(employees => {
        this.employees = employees;
      });
  }
}
