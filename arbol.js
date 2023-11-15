// Crear el metodo buscar(numero), debe devolver el nodo o null
class Nodo {
  constructor (numero) {
    this.numero = numero;
    this.hizq = null;
    this.hder = null;
  }
}
class ArbolBinario {
  constructor () {
    this.raiz = null;
  }

  agregar (nuevo) {
    if (this.raiz == null) { this.raiz = nuevo; } else { this._recAgregar(nuevo, this.raiz); }
  }

  _recAgregar (nuevo, raizx) {
    if (nuevo.numero < raizx.numero) {
      if (raizx.hizq == null) { raizx.hizq = nuevo; } else { this._recAgregar(nuevo, raizx.hizq); }
    } else
      if (raizx.hder == null) { raizx.hder = nuevo; } else { this._recAgregar(nuevo, raizx.hder); }
  }

  busquedaBinaria (numero) {
    if (this.raiz == null) return null;
    else if (this.raiz.hizq < numero) return this._recBusquedaBinaria(numero, this.raiz.hizq);
    else if (this.raiz.hder > numero) return this._recBusquedaBinaria(numero, this.raiz.hder);
    else if (this.raiz.numero == numero) return this.raiz;
    else {
      return null;
    }
  }

  _recBusquedaBinaria (numero, raizx) {
    if (raizx == null) return null;
    else if (raizx.numero == numero) return raizx;
    else if (raizx.numero < numero) return this._recBusquedaBinaria(numero, raizx.hizq);
    else if (raizx.numero > numero) return this._recBusquedaBinaria(numero, raizx.hder);
    else if (raizx.numero == numero) return raizx;
    else {
      return null;
    }
  }

  Preorden () {
    this._recPreorden(this.raiz);
  }

  _recPreorden (raizx) {
    if (raizx == null) return null;
    else {
      console.log(raizx.numero);
      this._recPreorden(raizx.hizq);
      this._recPreorden(raizx.hder);
      console.log(raizx.numero);
    }
  }
}

const arbol = new ArbolBinario();
arbol.agregar(new Nodo(2));
arbol.agregar(new Nodo(3));
arbol.agregar(new Nodo(1));
arbol.agregar(new Nodo(4));
arbol.agregar(new Nodo(5));
arbol.agregar(new Nodo(6));
arbol.agregar(new Nodo(20));
arbol.agregar(new Nodo(90));
console.log(arbol.busquedaBinaria(90));
console.log(arbol.busquedaBinaria(20));
console.log(arbol.Preorden());

// error: Disabling module "network" (reason: Invalid network interface "wlan0")
