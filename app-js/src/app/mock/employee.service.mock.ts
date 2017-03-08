import { Injectable } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { EmployeePage } from '../shared/employeePage.model';
import { EmployeeService } from '../shared/employee.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class EmployeeServiceMock extends EmployeeService {

    private pages = [
        {
            nextPageToken: '1',
            employees: [
                { id: 0, age: 30, name: 'Francisco', salary: 3000 },
                { id: 1, age: 31, name: 'Bernardo', salary: 2000 }
            ]
        },
        {
            nextPageToken: '2',
            employees: [
                { id: 2, age: 32, name: 'Manuel', salary: 3500 },
                { id: 3, age: 33, name: 'António', salary: 2500 }
            ]
        },
        {
            nextPageToken: null,
            employees: [
                { id: 4, age: 34, name: 'José', salary: 4000 },
                { id: 5, age: 35, name: 'Miguel', salary: 4500 }
            ]
        }
    ];

    constructor() {
        super();
    }

    load(pageToken?: string): Observable<EmployeePage> {
        let pageMap = {
            null: 0,
            '1': 1,
            '2': 2
        };

        return new Observable(observer => {
            setTimeout(() => observer.next(this.pages[pageMap[pageToken]]), 200);
        });
    }

    insert(employe: Employee): Observable<any> {
        return new Observable(observer => observer.complete());
    }

    update(employe: Employee): Observable<any> {
        return new Observable(observer => observer.complete());
    }

    delete(id: number): Observable<any> {
        return new Observable(observer => observer.complete());
    }

}
