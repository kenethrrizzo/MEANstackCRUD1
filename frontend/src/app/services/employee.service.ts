import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  selectedEmployee: Employee = new Employee; //variable selectedEmployee para guardar el estado actual de nuestro form en el método PUT
  employees: Employee[]; //arreglo de tipo Employee que definimos en models
  readonly URL_API = 'http://localhost:3000/api/employees'; //URL de nuestra API rest creada en la carpeta server

  //Necesitamos import HttpClienModule en app.module.ts para que nos funcione
  constructor(private http: HttpClient) {} //Inyectamos el HttpCliente para poder consumir APIS

  //Método GET
  getEmployees() {
    return this.http.get(this.URL_API);
  }
  //Método POST
  //Mandamos un empleado como parámetro porque lo vamos a añadir a la database
  postEmployee(employee: Employee) {
    return this.http.post(this.URL_API, employee);
  }
  //Método PUT
  //También mandamos un empleado como parámetro para buscar el empleado por medio del _id y luego modificarlo
  putEmployee(employee: Employee) {
    return this.http.put(this.URL_API + `/${employee._id}`, employee);
  }
  //Método DELETE
  //En el método delete solo necesitamos el _id porque este es único y así podemos eliminarlo mediante la url
  removeEmployee(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
