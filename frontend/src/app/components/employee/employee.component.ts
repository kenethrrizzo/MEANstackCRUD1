import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  formEmployee = new FormGroup({
    _id: new FormControl(),
    name: new FormControl(),
    position: new FormControl(),
    office: new FormControl(),
    salary: new FormControl(),
  });

  addEmployee(formEmployee) {
    let id = this.formEmployee.get('_id').value;
    if (id == null) {
      this.employeeService.postEmployee(formEmployee.value).subscribe((res) => {
        formEmployee.reset();
        this.getEmployees();
      });
    } else {
      this.employeeService.putEmployee(formEmployee.value).subscribe((res) => {
        formEmployee.reset();
        this.getEmployees();
      });
    }
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
    this.formEmployee.get('_id').setValue(employee._id);
    this.formEmployee.get('name').setValue(employee.name);
    this.formEmployee.get('position').setValue(employee.position);
    this.formEmployee.get('office').setValue(employee.office);
    this.formEmployee.get('salary').setValue(employee.salary);
    console.log(this.formEmployee.value);
  }

  deleteEmployee(_id: string) {
    this.employeeService.removeEmployee(_id).subscribe((res) => {
      console.log(res);
      this.getEmployees();
    });
  }
}
