import { Component, OnInit, OnDestroy } from '@angular/core';

import { EmployeePage } from '../shared/employeePage.model';
import { EmployeeService } from "app/shared/employee.service";
import { EmployeeServiceMock } from "app/mock/employee.service.mock";
import { LazyLoadEvent } from "primeng/components/common/api";
import { Employee } from "app/shared/employee.model";
import { FilterMetadata } from 'primeng/components/common/api';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-vscroll',
  templateUrl: './vscroll.component.html',
  styleUrls: ['./vscroll.component.css']
})
export class VscrollComponent implements OnInit, OnDestroy {


  constructor(private es: EmployeeServiceMock) { }

  employees: Employee[] = [
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(0)", "salary": 1210 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(1)", "salary": 1873 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(2)", "salary": 1241 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(3)", "salary": 1955 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(4)", "salary": 1428 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(5)", "salary": 1684 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(6)", "salary": 1613 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(7)", "salary": 1698 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(8)", "salary": 1334 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(9)", "salary": 1942 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(10)", "salary": 1984 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(11)", "salary": 1239 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(12)", "salary": 1978 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(13)", "salary": 1251 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(14)", "salary": 1346 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(15)", "salary": 1225 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(16)", "salary": 1601 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(17)", "salary": 1344 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(18)", "salary": 1398 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(19)", "salary": 1311 },
    { "age": 20, "id": 0, "name": "mock-name-p(0) r(20)", "salary": 1079 }
  ];
  totalRecords;
  rows = 25;
  lastrows: number;
  tokens: { [key: number]: string } = {};

  ngOnInit() {
    let pages = 20;
    this.es.recreatePages({ pages: pages, rows: this.rows });
    this.totalRecords = pages * this.rows;
    this.tokens[0] = null;

  }

  private load(page: number, callback: (EmployeePage: EmployeePage) => void) {
    if (page < 0 || isNaN(page)) {
      throw "it\'s not possible to have negative pages";
    }
    if (typeof (this.tokens[page]) === 'undefined') {
      console.log('token doesn\'t exist', page);
      this.load(page - 1, (employeePage) => this.es.load(employeePage.nextPageToken).subscribe(res => {
        console.log('previews token', res.nextPageToken);
        this.tokens[page] = res.nextPageToken;
        this.load(page - 1, callback);
      }));
    } else {
      this.es.load(this.tokens[page]).subscribe(res => {
        console.log('loaded page', page);
        res.employees = JSON.parse(JSON.stringify(res.employees));
        this.tokens[page + 1] = res.nextPageToken;
        callback(res);
      });
    }
  }

  lazyLoad(event: LazyLoadEvent) {
    console.log(event);
    if (this.lastrows === event.first) {
      console.log('cloning');
      this.employees = JSON.parse(JSON.stringify(this.employees));
    } else {
      let page = event.first / this.rows;
      console.log('page', page);
      this.load(page, res => {
        this.employees = res.employees;
        this.load(page + 1, res2 => {
          this.employees = this.employees.concat(res2.employees);
        });
      });
    }
    this.lastrows = event.first;
  }

  virtScroll(event) {
    console.log(event);
  }

  ngOnDestroy(): void {
    console.log('destroy-vscroll');
  }
}
