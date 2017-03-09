import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpModule, XHRBackend, BrowserXhr,
  ResponseOptions, XSRFStrategy, JsonpModule, Http
} from '@angular/http';


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
import { AppComponent } from "app/app.component";
import { HomeComponent } from "app/home/home.component";
import { routing } from "app/app.routing";
import { EmployeeService } from "app/shared/employee.service";
import { EmployeeServiceImp } from "app/shared/employee.serviceimp";
import { EmployeeServiceMock } from "app/mock/employee.service.mock";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
    FieldsetModule,
    SplitButtonModule,
    SpinnerModule,
    routing
  ],
  providers: [{
    provide: EmployeeService,
    useFactory: (injector) => {
      return injector.get(EmployeeServiceMock);
    },
    deps: [Injector]
  }, EmployeeServiceImp, EmployeeServiceMock],
  bootstrap: [AppComponent]
})
export class AppModule {
}