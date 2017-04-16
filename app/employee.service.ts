import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {

  constructor(private http: Http) {}
  get(query) {
    let searchParams = new URLSearchParams();
    searchParams.append('query', query);
    return this.http.get('', { search: searchParams })
      .map(response => {
        return response.json().employees;
      });
  }

  getData(employeeId) {
    return this.http.get('employee/' + employeeId)
      .map(response => {
        if (response != null)
        {
          return response.json().employee;
        }else
        {
          return null;
        }
      });
  }
  
  add(newItem) {
    return this.http.post('items', newItem)
      .map(response => {});
  }

  addStock(newItem) {
    return this.http.post('items', newItem)
      .map(response => {});
  }
  reduceStock(newItem) {
    return this.http.post('items', newItem)
      .map(response => {});
  }
  
  delete(deleteItem) {
    return this.http.delete(`items/${deleteItem.id}`)
      .map(response => {});
  }
}
