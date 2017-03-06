import { Observable } from 'rxjs/Observable';
import { Employee } from 'app/shared/employee.model'
import { EmployeePage } from 'app/shared/employeePage.model'
import { EmployeeErrors } from 'app/shared/employee.errors'

export abstract class EmployeeService {
    abstract load(pageToken?:string): Observable<EmployeePage>;
    abstract insert(employee:Employee): Observable<any>;
    abstract update(employee:Employee): Observable<any>;
    abstract delete(id:number): Observable<any>;

    validateEmployee(employee:Employee):EmployeeErrors{
        let salaryResult = null;
        let nameResult = null;
        let ageResult = null;
        let hasErrors = false;
        if(employee.salary <= 0){
            salaryResult = 'Salary must be bigger then 0';
            hasErrors = true;
        }
        if(employee.name.length <3){
            nameResult = 'Name must have at least 3 characters';
            hasErrors = true;
        }
        if(employee.age<=0){
            ageResult = 'Age must be bigger than 0';
            hasErrors = true;
        }
        return {
            hasErrors:hasErrors,
            salary:salaryResult,
            name:nameResult,
            age:ageResult,
        };
    }
}