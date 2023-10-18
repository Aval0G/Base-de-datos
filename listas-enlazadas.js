class Nodo {
  constructor (dato) {
    this.dato = dato;
    this.siguiente = null;
    this.anterior = null;
  }
}

class LinkedList {
  constructor () {
    this.primero = null;
  }

  agregar (nuevo) {
    if (this.primero == null) { this.primero = nuevo; } else {
      let aux = this.primero;
      while (aux.siguiente != null) { aux = aux.siguiente; }
      aux.siguiente = nuevo;
      nuevo.anterior = aux;
    }
  }

  listar () {
    if (this.primero == null) { return ''; } else { return this._recListar(this.primero); }
  }

  _recListar (nodo) {
    if (nodo.siguiente == null) { return nodo.dato; } else { return nodo.dato + ' ' + this._recListar(nodo.siguiente); }
  }

  buscarDato (dato) {
    let actual = this.primero;
    while (actual != null) {
      if (actual.dato === dato) {
        return actual;
      }
      actual = actual.siguiente;
    }
  }

  agregarInicio (nodo) {
    if (this.primero == null) this.primero = nodo;
    else {
      nodo.siguiente = this.primero;
      this.primero.anterior = nodo;
      this.primero = nodo;
    }
  }

  agregarAntes (dato, nuevo) {
    let actual = this.buscarDato(dato);
    nuevo.siguiente = actual;
    actual.anterior.siguiente = nuevo;
    nuevo.anterior = actual.anterior.anterior;
    actual.anterior = nuevo;
    actual = nuevo;
  }

  agregarDespues (dato, nuevo) {
    const actual = this.buscarDato(dato);
    nuevo.siguiente = actual.siguiente;
    actual.siguiente.anterior = nuevo;
    nuevo.anterior = actual;
    actual.siguiente = nuevo;
  }

  extraer (dato) {
    const actual = this.buscarDato(dato);
    actual.anterior.siguiente = actual.siguiente;
    actual.siguiente.anterior = actual.anterior;
    actual.siguiente = null;
    actual.anterior = null;
  }

  listaInvertida () {
    return this._listaInvertida(this.primero);
  }

  _listaInvertida (nodo) {
    if (nodo != null) {
      const lista = '' + this._listaInvertida(nodo.siguiente);
      return lista + ' ' + nodo.dato;
    } else {
      return '';
    }
  }
}

const grupo = new LinkedList();
let nuevo = new Nodo('F');
grupo.agregar(nuevo);
nuevo = new Nodo('J');
grupo.agregar(nuevo);
nuevo = new Nodo('K');
grupo.agregar(nuevo);
nuevo = new Nodo('M');
grupo.agregar(nuevo);
nuevo = new Nodo('Q');
grupo.agregar(nuevo);
nuevo = new Nodo('T');
grupo.agregar(nuevo);
nuevo = new Nodo('M');
grupo.agregar(nuevo);
console.log(grupo.buscarDato('M'));
nuevo = new Nodo('Z');
grupo.agregarInicio(nuevo);
nuevo = new Nodo('X');
grupo.agregarAntes('K', nuevo);
nuevo = new Nodo('Z');
grupo.extraer('M');
grupo.agregarDespues('T', nuevo);
console.log(grupo.listaInvertida());
console.log(grupo.listar());
