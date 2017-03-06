/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmployeeServiceMock } from '../mock/employee.service.mock';
import { EmployeeService } from '../shared/employee.service';

describe('EmployeeService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeServiceMock]
    });
  });

  it('should ...', inject([EmployeeServiceMock], (service: EmployeeService) => {
    expect(service).toBeTruthy();
  }));
});
