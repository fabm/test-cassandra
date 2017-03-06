import { Injector } from '@angular/core';
import { EmployeeService } from 'app/shared/employee.service';
import { EmployeeServiceImp } from 'app/shared/employee.serviceimp';
import { EmployeeServiceMock } from 'app/mock/employee.service.mock';
export class ProvidersManagment {

    private static useMocks = false;

    public static selectCarService(injector: Injector): EmployeeService {
        if (ProvidersManagment.useMocks) {
            return injector.get(EmployeeServiceMock);
        } else {
            return injector.get(EmployeeServiceImp);
        }
    };

}
