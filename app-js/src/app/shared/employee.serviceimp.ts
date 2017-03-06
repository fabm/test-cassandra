import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { EmployeePage } from './employeePage.model';
import { EmployeeService } from './employee.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeServiceImp extends EmployeeService {

  static base: string = 'http://localhost:8080/'

  constructor(private http: Http) {
    super();
  }

  load(pageToken?:string): Observable<EmployeePage> {
    let nextQuery;
    if(pageToken === null){
      nextQuery = ''; 
    }else{
      nextQuery = '?next='+pageToken;
    }
    return this.http.get(EmployeeServiceImp.base + 'employees'+ nextQuery)
      .map(res => {
        return <EmployeePage>res.json()
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  insert(employee: Employee): Observable<any> {
    return this.http.post(EmployeeServiceImp.base + 'employee', employee)
      .catch(this.handleError);
  }

  update(employee: Employee): Observable<any> {
    return this.http.put(EmployeeServiceImp.base + 'employee', employee)
      .catch(this.handleError);
  }

  delete(id: number): Observable<any> {
    // quick test
    return this.http.delete(EmployeeServiceImp.base + 'employee/' + id)
      .catch(this.handleError);
  }

}
