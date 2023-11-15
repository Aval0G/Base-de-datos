class Nodo { // clase para los nodos en los cuales tendra el valor que se ocupa
  constructor (numero) {
    this.valor = '';
    this.hizq = null;
    this.hder = null;
  }
}

class ArbolBinario {
  constructor () {
    this.raiz = null;
  }
}

const ArbolBinario1 = new ArbolBinario();
const Nodo1 = new Nodo(2);

console.log(ArbolBinario1);
console.log(Nodo1);
