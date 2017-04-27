import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class EmployeeService {
  progress;
  progressObserver;
  constructor(private http: Http) { }
  getAll() {
    return this.http.get('http://localhost:8080/employees/')
      .map(response => {
        return response.json();
      });
  }

  get(query, gender, location, sort) {
    let searchParams = new URLSearchParams();
    searchParams.append('firstName', query);
    searchParams.append('lastName', query);
    searchParams.append('gender', gender);
    searchParams.append('location', location);
    searchParams.append('sort', sort);
    return this.http.get('http://localhost:8080/employees/contain', { search: searchParams })
      .map(response => {
        return response.json();
      });
  }

  getData(employeeId) {
    return this.http.get('http://localhost:8080/employees/' + employeeId)
      .map(response => {
        if (response != null) {
          return response.json();
        } else {
          return null;
        }
      });
  }

  addOrUpdate(newEmployee, image, empId) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return Observable.create(observer => {
      let formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

      if (empId != "add") { 
        formData.append("empId", empId);
      }

      formData.append("firstName", newEmployee.firstName);
      formData.append("lastName", newEmployee.lastName);
      formData.append("gender", newEmployee.gender);
      formData.append("dob", newEmployee.dob);
      formData.append("nationality", newEmployee.nationality);
      formData.append("maritalStatus", newEmployee.maritalStatus);
      formData.append("phone", newEmployee.phone);
      formData.append("subDivision", newEmployee.subDivision);
      formData.append("status", newEmployee.status);
      if (newEmployee.suspendDate == null)
      {
        newEmployee.suspendDate = "";
      }
      formData.append("suspendDate", newEmployee.suspendDate);
      formData.append("hiredDate", newEmployee.hiredDate);
      formData.append("grade", newEmployee.grade);
      formData.append("division", newEmployee.division);
      formData.append("email", newEmployee.email);
      formData.append("location", newEmployee.location);
      if (image != undefined) {
        formData.append("file", image);
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = (event) => {
        if (this.progressObserver) {
          this.progress = Math.round(event.loaded / event.total * 100);

          this.progressObserver.next(this.progress);
        }
      };
      xhr.open('POST', 'http://localhost:8080/employees/addorupdate', true);
      xhr.send(formData);
    });
  }

  delete(employee) {
    console.log("http://localhost:8080/employees/" + employee.empId);
    return this.http.delete("http://localhost:8080/employees/" + employee.empId)
      .map(response => response);
  }
}
