import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpModule, XHRBackend, BrowserXhr,
  ResponseOptions, XSRFStrategy, JsonpModule, Http
} from '@angular/http';

import { AppComponent } from './app.component';

import { MessagesModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { TreeModule } from "primeng/primeng";
import { MenuModule } from 'primeng/primeng';
import { RouterModule } from '@angular/router';
import { FieldsetModule } from 'primeng/primeng';
import { SplitButtonModule } from 'primeng/primeng';
import { SpinnerModule } from 'primeng/primeng';
import { ProvidersManagment } from './providers.management'
import { EmployeeService } from './shared/employee.service'
import { EmployeeServiceImp } from './shared/employee.serviceimp'
import { EmployeeServiceMock } from './mock/employee.service.mock'

let providersManagment = new ProvidersManagment();

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonModule,
    MessagesModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    JsonpModule,
    TreeModule,
    MenuModule,
    RouterModule.forRoot([]),
    FieldsetModule,
    SplitButtonModule,
    SpinnerModule
  ],
  providers: [{
    provide: EmployeeService,
    useFactory: ProvidersManagment.selectCarService,
    deps: [Injector]
  },EmployeeServiceImp, EmployeeServiceMock],
  bootstrap: [AppComponent]
})
export class AppModule {
}