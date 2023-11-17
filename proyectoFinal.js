class Nodo {
  constructor (caracter) {
    this.caracter = caracter;
    this.siguiente = null;
    this.anterior = null;
    this.hiIzq = null;
    this.hiDer = null;
  }
}

class ArbolBinario {
  constructor () {
    this.raiz = null;
  }

  agregar (caracter) {
    let actual = this.raiz;
    while (actual.siguiente !== null) {
      actual = actual.siguiente;
    }
    actual.siguiente = caracter;
    caracter.anterior = actual;
  }

  extraer (caracter) {
    const actual = this.buscarDato(caracter);
    actual.anterior.siguiente = actual.siguiente;
    actual.siguiente.anterior = actual.anterior;
    actual.siguiente = null;
    actual.anterior = null;
  }

  compararSignoMD (dato) {
    if (dato === '/' || dato === '*') {
      dato.hiIzq = dato.anterior;
      dato.hiDer = dato.siguiente;
      this.extraer(dato.anterior);
      this.extraer(dato.siguiente);
    }
  }

  compararSignoSR (dato) {
    if (dato === '+' || dato === '-') {
      dato.hiIzq = dato.anterior;
      dato.hiDer = dato.siguiente;
      this.extraer(dato.anterior);
      this.extraer(dato.siguiente);
    }
  }

  buscarDato (dato) {
    let actual = this.raiz;
    while (actual !== null) {
      if (actual.caracter === dato) {
        return actual;
      }
      actual = actual.siguiente;
    }
    return null;
  }

  inOrder () {

  }

  preOrder () {

  }

  postOrder () {

  }
}

let arbolProyecto = new ArbolBinario();
arbolProyecto.agregar(new Nodo('8'));
arbolProyecto.agregar(new Nodo('+'));
arbolProyecto.agregar(new Nodo('2'));
arbolProyecto.agregar(new Nodo('*'));
arbolProyecto.agregar(new Nodo('5'));
arbolProyecto.agregar(new Nodo('/'));
arbolProyecto.agregar(new Nodo('2'));
arbolProyecto.imprimir();
