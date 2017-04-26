import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationService {
  constructor(private http: Http) { }
  getAll() {
    return this.http.get('http://localhost:8080/locations/')
      .map(response => {
        return response.json();
      });
  }
}
