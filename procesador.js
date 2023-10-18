class Proceso {
  constructor (ciclos) {
    this.ciclos = ciclos;
    this.siguiente = null;
    this.anterior = null;
  }
}

class ListaCircular {
  constructor () {
    this.primero = null;
  }

  agregar (nuevo) {
    if (this.primero == null) {
      this.primero = nuevo;
      nuevo.siguiente = nuevo;
      nuevo.anterior = nuevo;
    } else {
      nuevo.siguiente = this.primero;
      nuevo.anterior = this.primero.anterior;
      this.primero.anterior = nuevo;
      nuevo.anterior.siguiente = nuevo;
    }
  }

  extrerInicio () {
    const aux = this.primero;
    if (this.primero == null) return null;
    if (this.primero == this.primero.siguiente) {
      aux.siguiente = null;
      aux.anterior = null;
      this.primero = null;
    } else {
      aux.anterior.siguiente = aux.siguiente;
      aux.siguiente.anterior = aux.anterior;
      this.primero = this.primero.siguiente;
      aux.anterior = null;
      aux.siguiente = null;
      return aux;
    }
  }

  avanzar () {
    this.primero = this.primero.siguiente;
  }
}

const misProcesos = new ListaCircular();
for (let i = 1; i <= 300; i++) {
  let info = i + '; ';
  const random = Math.floor(Math.random() * 100 + 1);
  if (random <= 12) {
    const ciclos = Math.floor(Math.random() * 11 + 4);
    info += 'Nuevo' + ciclos;
    const nuevo = new Proceso(ciclos);
    misProcesos.agregar(nuevo);
  }
  if (misProcesos.primero != null) {
    misProcesos.primero.ciclos--;
    info += 'restan' + misProcesos.primero.ciclos;
    if (misProcesos.primero.ciclos == 0) {
      misProcesos.extrerInicio();
    } else {
      misProcesos.avanzar();
    }
    console.log(info);
  }
}
