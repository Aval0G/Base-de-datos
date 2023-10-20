class Alumno { // Crea objeto alumno
  constructor (nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
    this.siguiente = null;
  }
}

class ListaAlumnos {
  constructor () {
    this.primero = null;
    this.ultimo = null;
  }

  agregar (nuevo) {
    if (this.primero == null) {
      this.primero = nuevo;
      this.ultimo = nuevo;
    } else {
      this.ultimo.siguiente = nuevo;
      this.ultimo = nuevo;
    }
  }
}

const ListaH = new ListaAlumnos();
const alumno1 = new Alumno('Aldo', 20);
const alumno2 = new Alumno('Juan', 21);
const alumno3 = new Alumno('Pedro', 22);
const alumno4 = new Alumno('Maria', 23);
ListaH.agregar(alumno1);
ListaH.agregar(alumno2);
ListaH.agregar(alumno3);
ListaH.agregar(alumno4);
