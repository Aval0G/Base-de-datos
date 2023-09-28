class Estudiante {
  constructor (nombre, cuenta) {
    this.nombre = nombre;
    this.cuenta = cuenta;
    this.siguiente = null;
  }

  info () {
    return ` El alummno se llama ${this.nombre} con numero de cuenta ${this.cuenta}`;
  }

  infoHtml () {

  }
}

class Grupo {
  constructor () {
    this.primero = null;
  }

  agregar (nuevo) {
    if (this.primero == null) {
      this.primero = nuevo;
    } else {
      let aux = this.primero;
      while (aux.siguiente != null) {
        aux = aux.siguiente;
      }
      aux.siguiente = nuevo;
    }
  }

  listar () {
    let datos = '';
    let aux = this.primero;
    while (aux != null) {
      datos += aux.info();
      aux = aux.siguiente;
    }
    return datos;
  }
}

let miGrupo = new Grupo();
let nuevo = new Estudiante('Ana', 1);
miGrupo.agregar(nuevo);
nuevo = new Estudiante('Bertha', 2);
miGrupo.agregar(nuevo);
nuevo = new Estudiante('Carlos', 3);
miGrupo.agregar(nuevo);
console.log(miGrupo.listar());
