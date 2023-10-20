/* class Nodo {
  constructor (dato) {
    this.dato = dato;
    this.siguiente = null;
    this.anterior = null;
  }

  info () {
    return this.dato + ' ';
  }
}

class ListaDoble {
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
      nuevo.anterior = this.ultimo;
      this.ultimo = nuevo;
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

  listarInverso () {
    let datos = '';
    let aux = this.ultimo;
    while (aux != null) {
      datos += aux.info();
      aux = aux.anterior;
    }
    return datos;
  }
}

const lista = new ListaDoble();
lista.agregar(new Nodo(1));
lista.agregar(new Nodo(2));
lista.agregar(new Nodo(3));
lista.agregar(new Nodo(4));
lista.agregar(new Nodo(19));
lista.agregar(new Nodo(20));
lista.agregar(new Nodo(70));

const inicio = lista.primero;
console.log(lista.listar());
let t = inicio;
t = t.siguiente.siguiente.siguiente;
t.siguiente.siguiente.dato = 49;
console.log(lista.listar());
t.siguiente.siguiente.anterior = inicio.siguiente.siguiente;
t.anterior.siguiente = t.siguiente.siguiente;
console.log(lista.listar());
console.log(lista.listarInverso()); */

// RESULTADO 1 2 3 49 70

/* class Nodo {
  constructor (dato) {
    this.dato = dato;
    this.siguiente = null;
  }
}

class ListaSimple {
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
    if (this.primero == null) {
      return '';
    } else {
      return this._recListar(this.primero);
    }
  }

  _recListar (nodo) {
    if (nodo.siguiente == null) {
      return nodo.dato;
    } else {
      return nodo.dato + ' ' + this._recListar(nodo.siguiente);
    }
  }
}

const lista = new ListaSimple();
lista.agregar(new Nodo('A'));
lista.agregar(new Nodo('C'));
lista.agregar(new Nodo('G'));
lista.agregar(new Nodo('Z'));
lista.agregar(new Nodo('Y'));
lista.agregar(new Nodo('X'));
lista.agregar(new Nodo('W'));
lista.agregar(new Nodo('O'));
lista.agregar(new Nodo('P'));
lista.agregar(new Nodo('M'));
lista.agregar(new Nodo('Z'));
console.log(lista.listar());

const inicio = lista.primero;
let t = inicio;
for (let i = 0; i < 4; i++)
  t = t.siguiente.siguiente;
t.siguiente = null;

console.log(lista.listar()); */

// RESULTADO A C G Z Y X W O P

/* class Nodo {
  constructor (dato) {
    this.dato = dato;
    this.siguiente = null;
    this.anterior = null;
  }

  info () {
    return this.dato + ' ';
  }
}

class ListaDoble {
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
      nuevo.anterior = this.ultimo;
      this.ultimo = nuevo;
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

  listarInverso () {
    let datos = '';
    let aux = this.ultimo;
    while (aux != null) {
      datos += aux.info();
      aux = aux.anterior;
    }
    return datos;
  }
}

const lista = new ListaDoble();
lista.agregar(new Nodo('A'));
lista.agregar(new Nodo('C'));
lista.agregar(new Nodo('G'));
lista.agregar(new Nodo('Z'));
lista.agregar(new Nodo('Y'));
lista.agregar(new Nodo('X'));
lista.agregar(new Nodo('W'));
lista.agregar(new Nodo('O'));
lista.agregar(new Nodo('P'));
lista.agregar(new Nodo('M'));
lista.agregar(new Nodo('Z'));
console.log(lista.listar());
const inicio = lista.primero;
let t = inicio;
const n = new Nodo('B');

//RESULTADO
t = t.siguiente.siguiente.siguiente.siguiente.siguiente.siguiente.siguiente;
n.siguiente = t.siguiente;
n.anterior = t;
t.siguiente.anterior = n;
t.siguiente = n;
console.log(lista.listar());
console.log(lista.listarInverso()); */

class Nodo {
  constructor (dato) {
    this.dato = dato;
    this.siguiente = null;
  }

  info () {
    return this.dato + ' ';
  }
}

class ListaSimple {
  constructor () {
    this.primero = null;
  }

  agregarOrdenadoDescenciente (nuevo) {
    if (this.primero == null) {
      this.primero = nuevo;
    } else if (nuevo.dato > this.primero.dato) {
      nuevo.siguiente = this.primero;
      this.primero = nuevo;
    } else {
      let aux = this.primero;
      while (aux.siguiente != null && aux.siguiente.dato > nuevo.dato) {
        aux = aux.siguiente;
      }
      nuevo.siguiente = aux.siguiente;
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

const lista = new ListaSimple();
lista.agregarOrdenadoDescenciente(new Nodo(1));
lista.agregarOrdenadoDescenciente(new Nodo(10));
lista.agregarOrdenadoDescenciente(new Nodo(5));
lista.agregarOrdenadoDescenciente(new Nodo(51));
lista.agregarOrdenadoDescenciente(new Nodo(15));
lista.agregarOrdenadoDescenciente(new Nodo(20));
lista.agregarOrdenadoDescenciente(new Nodo(70));
console.log(lista.listar());
