import { Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class MockXHRBackend {
  constructor() {
  }

  createConnection(request: Request) {
    var response = new Observable((responseObserver: Observer<Response>) => {
      var responseData;
      var responseOptions;
      switch (request.method) {
        case RequestMethod.Get:
          var emp = null;
          if (request.url.indexOf("employee/") >= 0) {
            let employeeId = request.url.split("/")[1];
            if (employeeId != null && employeeId != "" && employeeId != "undefined") {
              emp = this.employees.find(emp => emp.id === parseInt(employeeId));
            }
            responseOptions = new ResponseOptions({
              body: { employee: JSON.parse(JSON.stringify(emp)) },
              status: 200
            });
          } else {
            if (request.url != "")
            {
                let query = request.url.split("=")[1].toLowerCase();
                if (query !="")
                {
                  emp = this.employees.filter(employee => employee.firstName.toLowerCase().includes(query) || employee.lastName.toLowerCase().includes(query));
                }else
                {
                  emp = this.employees
                }
            }
            responseOptions = new ResponseOptions({
              body: { employees: JSON.parse(JSON.stringify(emp)) },
              status: 200
            });
          }
          break;
        case RequestMethod.Post:
          var item = JSON.parse(request.text().toString());
          if (item.id > 0) {
            var myItem = this.employees.find(myItem => myItem.id === item.id);
            var index = this.employees.indexOf(myItem);
          } else {
            item.id = this._getNewId();
            this.employees.push(item);
          }

          responseOptions = new ResponseOptions({ status: 201 });
          break;
        case RequestMethod.Delete:
          var id = parseInt(request.url.split('/')[1]);
          this._deleteItem(id);
          responseOptions = new ResponseOptions({ status: 200 });
      }

      var responseObject = new Response(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => { };
    });
    return { response };
  }

  _deleteItem(id) {
    var emp = this.employees.find(emp => emp.id === id);
    var index = this.employees.indexOf(emp);
    if (index >= 0) {
      this.employees.splice(index, 1);
    }
  }

  _getNewId() {
    if (this.employees.length > 0) {
      return Math.max.apply(Math, this.employees.map(item => item.id)) + 1;
    }
  }

  employees = [
    {
      id: 1,
      firstName: "Spongebob",
      lastName: "Squarepants",
      gender: "Male",
      dob: new Date(),
      nationality: "Indonesian",
      maritalStatus: "Single",
      phone: "+62812351293",
      subDivision: "Red",
      status: "Contract",
      suspendDate: "-",
      hiredDate: new Date(),
      grade: "SE-PG",
      division: "CDC",
      email: "spongebob.squarepants@gmail.com"
    },
    {
      id: 2,
      firstName: "Patrick",
      lastName: "Star",
      gender: "Male",
      dob: new Date(),
      nationality: "Indonesian",
      maritalStatus: "Single",
      phone: "+628122512393",
      subDivision: "Green",
      status: "Contract",
      suspendDate: "-",
      hiredDate: new Date(),
      grade: "SE-PG",
      division: "CDC",
      email: "Patrick.Star@gmail.com"
    }, {
      id: 3,
      firstName: "Upin",
      lastName: "Ipin",
      gender: "Male",
      dob: new Date(),
      nationality: "Malaysian",
      maritalStatus: "Married",
      phone: "+6281123983",
      subDivision: "Blue",
      status: "Contract",
      suspendDate: "-",
      hiredDate: new Date(),
      grade: "SE-JP",
      division: "CDC",
      email: "Upin.Ipin@gmail.com"
    }, {
      id: 4,
      firstName: "Dora",
      lastName: "Explorer",
      gender: "Female",
      dob: new Date(),
      nationality: "Spanish",
      maritalStatus: "Married",
      phone: "+6238123123",
      subDivision: "Pink",
      status: "Contract",
      suspendDate: "-",
      hiredDate: new Date(),
      grade: "SE-PG",
      division: "CDC",
      email: "Dora.Explorer@gmail.com"
    }, {
      id: 5,
      firstName: "Mickey",
      lastName: "Mouse",
      gender: "Male",
      dob: new Date(),
      nationality: "Indonesian",
      maritalStatus: "Single",
      phone: "+628112381623",
      subDivision: "Black",
      status: "Contract",
      suspendDate: "-",
      hiredDate: new Date(),
      grade: "SE-PG",
      division: "CDC",
      email: "Mickey.Mouse@gmail.com"
    }
  ];
}