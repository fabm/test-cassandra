import { NgModule, Injector } from "@angular/core";

import { routing } from "app/app.routing";
import { HomeComponent } from "app/home/home.component";
import { EmployeeService } from "app/shared/employee.service";
import { EmployeeServiceMock } from "app/mock/employee.service.mock";
import { EmployeeServiceImp } from "app/shared/employee.serviceimp";

@NgModule({
    imports: [routing],
    declarations: [HomeComponent]
})
export class HomeModule {
    static USE_MOCKS: true;

    static getEmployeeServiceInstance(injector: Injector): EmployeeService {
        if (HomeModule.USE_MOCKS) {
            return injector.get(EmployeeServiceMock);
        } else {
            return injector.get(EmployeeServiceImp);
        }
    }
}