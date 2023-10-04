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
    this.ultimo = null;
  }

  /* agregar (nuevo) {
    if (this.primero == null) {
      this.primero = nuevo;
    } else {
      let aux = this.primero;
      while (aux.siguiente != null) {
        aux = aux.siguiente;
      }
      aux.siguiente = nuevo;
    }
  } */

  agregar (nuevo) {
    if (this.primero == null) {
      this.primero = nuevo;
    } else {
      this._agregar(nuevo, this.primero);
    }
  }

  _agregar (nuevo, nodox) {
    if (nodox.siguiente == null) {
      nodox.siguiente = nuevo;
    } else {
      this._agregar(nuevo, nodox.siguiente);
    }
  }

  agregarInicio (nuevo) {
    if (this.primero == null) {
      this.primero = nuevo;
    } else {
      nuevo.siguiente = this.primero;
      this.primero = nuevo;
    }
  }

  extraerInicio () {
    const aux = this.primero;
    this.primero = this.primero.siguiente;
    aux.siguiente = null;
    return aux;
  }

  extraerUltimo () {
    if (this.primero == null) {
      return null;
    } else {
      return this._extraerUltimo(this.primero);
    }
  }

  _extraerUltimo (nodox) {
    if (nodox.siguiente == null) {
      return null;
    } else if (nodox.siguiente.siguiente == null) {
      const ultimoNodo = nodox.siguiente;
      nodox.siguiente = null;
      return ultimoNodo;
    } else {
      return this._extraerUltimo(nodox.siguiente);
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

const miGrupo = new Grupo();
let nuevo = new Estudiante('Ana', 1);
miGrupo.agregar(nuevo);
nuevo = new Estudiante('Bertha', 2);
miGrupo.agregar(nuevo);
nuevo = new Estudiante('Carlos', 3);
console.log(miGrupo.listar());
miGrupo.agregarInicio(nuevo);
console.log(miGrupo.extraerInicio());
console.log(miGrupo.extraerUltimo());
console.log(miGrupo.listar());
