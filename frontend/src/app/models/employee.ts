export class Employee {

  constructor(_id = '', name = '', position = '', office = '', salary = 0) {
    this._id = _id;
    this.name = name;
    this.position = position;
    this.office = office;
    this.salary = salary;
}

  _id: string;
  name: string;
  position: string;
  office: string;
  salary: number;

  //Solo creamos el modelo de employee acorde al que creamos en la base de datos y los inicializamos con un constructor
}
