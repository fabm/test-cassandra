import { Injectable } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { EmployeePage } from '../shared/employeePage.model';
import { EmployeeService } from '../shared/employee.service';
import { Observable } from 'rxjs/Observable';
import { RecreatePageOptions } from "app/mock/recreate.page.options";
import { Subscriber } from "rxjs/Subscriber";
@Injectable()
export class EmployeeServiceMock extends EmployeeService {

    private pages: EmployeePage[] = [
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

    recreatePages(options: RecreatePageOptions) {
        let pages = []
        let i = 0;
        for (let p = 0; p < options.pages; p++) {
            let employeePage: EmployeePage = {
                employees: [],
                nextPageToken: p + 1 < options.pages ? (p + 1).toString() : null
            };


            for (let r = 0; r < options.rows; r++) {
                employeePage.employees.push({
                    age: 20,
                    id: p * options.rows,
                    name: 'mock-name-p(' + p + ') r(' + r + ')',
                    salary: Math.floor(Math.random() * 1000) + 1000
                });
            }
            pages.push(employeePage);
        }
        this.pages = pages;
    }

    load(pageToken?: string): Observable<EmployeePage> {
        if (!pageToken) {
            pageToken = null;
        }
        let pageMap = (key?: string): number => {
            if (key === null) {
                return 0;
            } else {
                return Number(key);
            }
        };

        let action = (page: EmployeePage, observer: Subscriber<EmployeePage>) => {
            observer.next(page);
            observer.complete();
        }

        return new Observable<EmployeePage>(observer => {
            let key: number = pageMap(pageToken);
            let page: EmployeePage = this.pages[key];
            setTimeout(() => action(page, observer), 2000);
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
