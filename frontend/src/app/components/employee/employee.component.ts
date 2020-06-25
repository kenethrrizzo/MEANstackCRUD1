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
  constructor(public employeeService: EmployeeService) {} //inyectamos el servicio de employee que creamos

  ngOnInit(): void {
    this.getEmployees(); //llamamos al método GET en el onInit() para que se inicie cuando recargue la página
  }

  // Declaramos las variables que usamos en el HTML para el Reactive Forms
  formEmployee = new FormGroup({
    _id: new FormControl(),
    name: new FormControl(),
    position: new FormControl(),
    office: new FormControl(),
    salary: new FormControl(),
  });

  // Función para agregar un empleado a la base de datos
  addEmployee(formEmployee) {
    let id = this.formEmployee.get('_id').value; //declaración de una variable interna que guarde el _id que esté en el formgroup
    if (id == null) {
      //empieza una condicional que valida si el _id está vacío o no, si está vacío usamos el método POST para agregar un nuevo empleado.
      this.employeeService.postEmployee(formEmployee.value).subscribe((res) => {
        //el subscribe es para escuchar la respuesta que envía el servidor
        formEmployee.reset(); // pasamos como parámetro el formgroup.value porque nos devuelve un objeto con los campos de la database
        this.getEmployees(); // llamamos al método get para que la lista de empleados se actualice
      });
    } else {
      //si el id no está vacío entonces modificamos un documento existente de la database con el método PUT
      this.employeeService.putEmployee(formEmployee.value).subscribe((res) => {
        formEmployee.reset(); //el formgroup.reset() sirve para que los campos del formgroup se vaceen
        this.getEmployees();
      });
    }
  }

  getEmployees() {
    //Método para obtener los datos desde la database
    this.employeeService.getEmployees().subscribe((res) => {
      //Usamos el método GET para extraer los datos de la database
      this.employeeService.employees = res as Employee[]; //la respuesta que nos envía el servidor es un arreglo de todos los documentos que tiene
    }); //guardamos esa respuesta en el arreglo de empleados que definimos en el servicio creado
  }

  //Método para editar un empleado
  editEmployee(employee: Employee) {
    //En realidad este método solo le da el valor de la variable employee que es el que seleccionamos en la tabla
    this.employeeService.selectedEmployee = employee; //a selectedEmployee que declaramos en nuestro servicio Employee
    this.formEmployee.get('_id').setValue(employee._id); //A continuación asignamos en el valor de los formcontrol del formgroup
    this.formEmployee.get('name').setValue(employee.name); //el valor del employee que seleccionamos
    this.formEmployee.get('position').setValue(employee.position); //lo hacemos para que aquellos valores aparezcan ya escritos en los <input>
    this.formEmployee.get('office').setValue(employee.office);
    this.formEmployee.get('salary').setValue(employee.salary);
    console.log(this.formEmployee.value); //console.log solo para verificar los valores
  }

  //Método para eliminar un usuario
  deleteEmployee(_id: string) {
    //como parámetro enviamos el _id del employee que seleccionamos
    this.employeeService.removeEmployee(_id).subscribe((res) => {
      console.log(res);
      this.getEmployees(); //llamamos al método GET para que se actualice la tabla en pantalla
    });
  }
}
