import { Component, OnInit, Inject, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { EmployeeService } from './shared/employee.service';
import { Employee } from "./shared/employee.model";
import { TreeNode } from 'primeng/primeng';
import { MenuItem } from 'primeng/primeng';
import { Dialog } from 'primeng/primeng';
import { Spinner } from 'primeng/primeng';
import { LazyLoadEvent } from 'primeng/primeng';
import { EmployeeErrors } from './shared/employee.errors';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  headerDetail: string = null;
  displayDialog = false;
  newEmployee = true;
  employee: Employee = AppComponent.createEmployee();
  selectedEmployee: Employee;
  employeeErrors: any = AppComponent.createEmployeeErrors();
  rowsNumb = 2;
  pageTokens: string[] = null;
  totalRecords = this.rowsNumb;
  variavel = 'ola';

  allColls: { [key: string]: boolean } = {
    age: true,
    salary: true,
    name: true
  };
  cols: any[] = [
    { "header": "Age", "field": "age" },
    { "header": "Salary", "field": "salary" },
    { "header": "Name", "field": "name" }];
  items: MenuItem[];
  employees: Employee[] = [];

  selection: Employee[] = [];

  private static createEmployeeErrors() {
    return {
      hasErrors: false,
      name: { hasError: false },
      salary: { hasError: false },
      age: { hasError: false }
    }
  }

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
  }

  shownCols() {
    let sCols = [];
    this.cols.forEach(col => {
      if (this.allColls[col.field]) {
        sCols.push(col);
      }
    });
    return sCols;
  }

  private rowSelChange() {
    if (this.selection.length === 1) {
      this.newEmployee = false;
    } else {
      this.newEmployee = true;
    }
  }

  myClick(event) {
    console.log(event);
  }


  private static createEmployee(): Employee {
    return {
      id: 0,
      age: 0,
      name: '',
      salary: 0
    }
  }

  private delete() {
    let ids: Observable<any>[] = [];
    let copy: Employee[] = [];
    this.employees.forEach(el => {
      if (this.selection.includes(el)) {
        ids.push(this.employeeService.delete(el.id));
      } else {
        copy.push(el);
      }
    });

    Observable.forkJoin(ids).subscribe(results => {
      this.employees = copy;
      this.selection = [];
      this.newEmployee = true;
    });
  }

  private showDialog() {

    if (this.newEmployee) {
      this.employee = AppComponent.createEmployee();
    } else {
      this.employee = AppComponent.cloneEmployee(this.selection[0]);
    }
    this.displayDialog = true;
    this.employeeErrors = AppComponent.createEmployeeErrors();
  }

  onClose() {
    if (this.newEmployee) {
      this.employee = AppComponent.createEmployee();
    } else {
      this.employee = this.selection[0];
    }
  }

  save() {
    let employeeErrors = this.employeeService.validateEmployee(this.employee);
    for (let k in employeeErrors) {
      if (k === 'hasErrors') {
        continue;
      }
      if (employeeErrors[k] === null) {
        employeeErrors[k] = {
          hasError: false
        };
      } else {
        employeeErrors[k] = {
          hasError: true,
          value: employeeErrors[k]
        };
      }
    }
    this.employeeErrors = employeeErrors;

    let afterSave = () => {
      this.employee = AppComponent.createEmployee();
      this.displayDialog = false;
      this.selection = [];
      this.newEmployee = true;
    };

    if (this.employeeErrors.hasErrors) {
      return;
    }
    if (this.newEmployee) {
      this.employeeService.insert(this.employee).subscribe(x => {
        this.employees.push(this.employee);
      }, null, afterSave);
    } else {
      //replace current employee
      this.employeeService.update(this.employee).subscribe(next => {
        this.employees[this.findSelectedEmployee()] = this.employee;
      }, null, afterSave);
    }

  }

  private findSelectedEmployee(): number {
    let selIndex = this.employees.indexOf(this.selection[0]);
    if (selIndex === -1) {
      console.error("it's supposed to find");
    }
    return selIndex;
  }

  private static cloneEmployee(e: Employee): any | Employee {
    let employee = {};
    for (let prop in e) {
      employee[prop] = e[prop];
    }
    return employee;
  }

  private toggleDetail(field) {
    if (field === this.headerDetail) {
      this.headerDetail = null;
    } else {
      this.headerDetail = field;
    }
  }

  private isInDetail(field): boolean {
    return (field === this.headerDetail);
  }

  loadData(event: LazyLoadEvent) {
    if (event.first == 0) {
      this.employeeService.load(null).subscribe(res => {
        this.employees = res.employees;
        this.pageTokens = [res.nextPageToken];
        if(this.employees.length==this.rowsNumb){
          this.totalRecords = this.rowsNumb*2;
        }
      });
    }else{
      let page = (event.first/this.rowsNumb)-1;
      this.employeeService.load(this.pageTokens[page]).subscribe(res => {
        this.employees = res.employees;
        this.pageTokens[page+1] = res.nextPageToken;
        this.pageTokens.splice(0,this.pageTokens.length-(page+2));
        if(this.pageTokens[page+1]!==null){
          this.totalRecords = this.rowsNumb*2+(page+1)*this.rowsNumb;
        }
      });
    }
  }

}