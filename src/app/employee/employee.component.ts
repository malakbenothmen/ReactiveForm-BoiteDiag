
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from '../Model/employeeModel';
import { EmployeeService } from '../employee.service';
import * as alertify from 'alertifyjs'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BoiteFormComponent } from '../boite-form/boite-form.component';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private dialog: MatDialog, private employeeService: EmployeeService) { }

  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  employeedata!: Employee[];
  finaldata:any;
  notificationCount =0;


  ngOnInit(): void {
    this.LoadEmployee();
  }

  displayColums: string[] = ["id", "name", "phoneNumber", "address", "status", "action"]

  OpenBoite(id: any) {
    const _Boite = this.dialog.open(BoiteFormComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    _Boite.afterClosed().subscribe(r => {
      this.LoadEmployee();
    });
  }

  LoadEmployee() {
    this.employeeService.GetallEmployee().subscribe(response => {
      this.employeedata = response;
      this.finaldata=new MatTableDataSource<Employee>(this.employeedata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
      this.notificationCount = response.length ;
    });
  }

  EditEmployee(id: any) {
    this.OpenBoite(id);
  }
  RemoveEmployee(id: any) {
    alertify.confirm("Remove employee", "do you want remove this employee?", () => {
      this.employeeService.RemoveEmployeebycode(id).subscribe(r => {
        this.LoadEmployee();
      });
    }, function () {

    })


  }
}
