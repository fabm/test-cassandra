import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "app/shared/employee.service";

@Component({
  selector: 'app-vscroll',
  templateUrl: './vscroll.component.html',
  styleUrls: ['./vscroll.component.css']
})
export class VscrollComponent implements OnInit {

  constructor(private es:EmployeeService) { }

  ngOnInit() {
  }

}
