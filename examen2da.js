class Nodo {
  constructor (numero) {
    this.numero = numero;
    this.siguiente = null;
  }

  info () {
    return this.numero + ' ';
  }
}
/* Crear la función agregarOrdenadoD(nuevo) que
recibe un nodo nuevo y almacenaré ese nodo ordenando de manera
descendente en una lista simple */

class ListaSimple {
  constructor () {
    this.primero = null;
  }

  agregarOrdernadoD (nuevo) {
    if (this.primero == null) {
      this.primero = nuevo;
    } else if (nuevo.numero > this.primero.numero) {
      nuevo.siguiente = this.primero;
      this.primero = nuevo;
    } else {
      let aux = this.primero;
      while (aux.siguiente != null && aux.siguiente.numero > nuevo.numero) {
        aux = aux.siguiente;
      }
      nuevo.siguiente = aux.siguiente;
      aux.siguiente = nuevo;
    }
  }

  listar () {
    let numeros = '';
    let aux = this.primero;
    while (aux != null) {
      numeros += aux.info();
      aux = aux.siguiente;
    }
    return numeros;
  }
}

const examen = new ListaSimple();
examen.agregarOrdernadoD(new Nodo(15));
examen.agregarOrdernadoD(new Nodo(8));
examen.agregarOrdernadoD(new Nodo(10));
examen.agregarOrdernadoD(new Nodo(100));
examen.agregarOrdernadoD(new Nodo(50));
examen.agregarOrdernadoD(new Nodo(40));
examen.agregarOrdernadoD(new Nodo(80));
examen.agregarOrdernadoD(new Nodo(500));
console.log(examen.listar());
