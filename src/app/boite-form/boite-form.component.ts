import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import * as alertify from 'alertifyjs'
@Component({
  selector: 'app-boite-form',
  templateUrl: './boite-form.component.html',
  styleUrls: ['./boite-form.component.css']
})
export class BoiteFormComponent implements OnInit {
  editdata: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.employeeService.GetEmployeebycode(this.data.id).subscribe(response => {
        this.editdata = response;
        this.employeeform.setValue({
          id: this.editdata.id, name: this.editdata.name, phoneNumber : this.editdata.phoneNumber,
        address: this.editdata.address, status: this.editdata.status
        });
      });
    }
  }

  employeeform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control('', Validators.required),
    phoneNumber : this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    status: this.builder.control(true),
  });

  SaveEmployee() {
    if (this.employeeform.valid) {
      const Editid = this.employeeform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.employeeService.UpdateEmployee(Editid, this.employeeform.getRawValue()).subscribe(response => {
          this.closeBoite();
          alertify.success("Updated successfully.")
        });
      } else {
        this.employeeService.CreateEmployee(this.employeeform.value).subscribe(response => {
          this.closeBoite();
          alertify.success("saved successfully.")
        });
      }
    }
  }

  closeBoite() {
    this.dialog.closeAll();
  }


}
