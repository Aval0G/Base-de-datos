import { readString } from './keyboard.mjs';
import { Menu, opcionesArbolBinario } from './menu_de_prueba.mjs';

class Nodo {
  constructor (caracter) {
    this.caracter = caracter;
    this.siguiente = null;
    this.anterior = null;
    this.hiIzq = null;
    this.hiDer = null;
  }
}

class ExpresionAritmetica {
  constructor () {
    this.arbol = null;
  }

  construirArbolDesdeInorder (inorder) {
    const pilaNodos = [];
    const pilaOperadores = [];
    for (const caracter of inorder) {
      if (this.esDigito(caracter)) {
        pilaNodos.push(new Nodo(caracter));
      } else if (this.esOperador(caracter)) {
        while (pilaOperadores.length > 0 && this.precedencia(pilaOperadores[pilaOperadores.length - 1]) >= this.precedencia(caracter)) {
          const nodo = new Nodo(pilaOperadores.pop());
          nodo.hiDer = pilaNodos.pop();
          nodo.hiIzq = pilaNodos.pop();
          pilaNodos.push(nodo);
        }
        pilaOperadores.push(caracter);
      } else if (caracter === '(') {
        pilaOperadores.push(caracter);
      } else if (caracter === ')') {
        while (pilaOperadores[pilaOperadores.length - 1] !== '(') {
          const nodo = new Nodo(pilaOperadores.pop());
          nodo.hiDer = pilaNodos.pop();
          nodo.hiIzq = pilaNodos.pop();
          pilaNodos.push(nodo);
        }
        pilaOperadores.pop();
      }
    }
    while (pilaOperadores.length > 0) {
      const nodo = new Nodo(pilaOperadores.pop());
      nodo.hiDer = pilaNodos.pop();
      nodo.hiIzq = pilaNodos.pop();
      pilaNodos.push(nodo);
    }
    this.arbol = pilaNodos.pop();
  }

  construirArbolDesdePreorder (preorder) {
    const pila = [];
    for (let i = preorder.length - 1; i >= 0; i--) {
      const caracter = preorder[i];
      if (this.esDigito(caracter)) {
        pila.push(new Nodo(caracter));
      } else if (this.esOperador(caracter)) {
        const nodo = new Nodo(caracter);
        nodo.hiDer = pila.pop();
        nodo.hiIzq = pila.pop();
        pila.push(nodo);
      }
    }
    this.arbol = pila.pop();
  }

  construirArbolDesdePostorder (postorder) {
    const pila = [];
    for (const caracter of postorder) {
      if (this.esDigito(caracter)) {
        pila.push(new Nodo(caracter));
      } else if (this.esOperador(caracter)) {
        const nodo = new Nodo(caracter);
        nodo.hiDer = pila.pop();
        nodo.hiIzq = pila.pop();
        pila.push(nodo);
      }
    }
    this.arbol = pila.pop();
  }

  resolver () {
    return this.resolverArbol(this.arbol);
  }

  resolverArbol (nodo) {
    if (nodo !== null) {
      if (this.esDigito(nodo.caracter)) {
        return parseInt(nodo.caracter);
      } else {
        const izq = this.resolverArbol(nodo.hiIzq);
        const der = this.resolverArbol(nodo.hiDer);

        switch (nodo.caracter) {
          case '+':
            return izq + der;
          case '-':
            return izq - der;
          case '*':
            return izq * der;
          case '/':
            return izq / der;
        }
      }
    }
  }

  esOperador (caracter) {
    return ['+', '-', '*', '/'].includes(caracter);
  }

  esDigito (caracter) {
    return /^\d+$/.test(caracter);
  }

  precedencia (operador) {
    switch (operador) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
        return 2;
      default:
        return 0;
    }
  }

  recorridoPreorder (nodo) {
    let resultado = '';
    if (nodo !== null) {
      resultado += nodo.caracter;
      resultado += this.recorridoPreorder(nodo.hiIzq);
      resultado += this.recorridoPreorder(nodo.hiDer);
    }
    return resultado;
  }

  recorridoPostorder (nodo) {
    let resultado = '';
    if (nodo !== null) {
      resultado += this.recorridoPostorder(nodo.hiIzq);
      resultado += this.recorridoPostorder(nodo.hiDer);
      resultado += nodo.caracter + ' ';
    }
    return resultado.trim();
  }

  obtenerPreorderDesdeInorder (inorder) {
    this.construirArbolDesdeInorder(inorder);
    return this.recorridoPreorder(this.arbol);
  }

  obtenerPostorderDesdeInorder (inorder) {
    this.construirArbolDesdeInorder(inorder);
    return this.recorridoPostorder(this.arbol);
  }
}

/*
// Ejemplo de uso con Inorder
const expresionInorder = '5+3*4';
const expresionInorder2 = '5+3*4/2';
const expresionInorder3 = '5+3*4/2-1';
const expresionInorder4 = '5+3*4/2-1+2';
const arbolExpresionInorder = new ExpresionAritmetica();

console.log('Expresión en Inorder:', expresionInorder);
console.log('Expresion convertida en PostOrder', arbolExpresionInorder.obtenerPostorderDesdeInorder(expresionInorder));
console.log('Expresion convertida en Preorder', arbolExpresionInorder.obtenerPreorderDesdeInorder(expresionInorder));
console.log('Resultado:', arbolExpresionInorder.resolver());
console.log('Expresión en Inorder 2:', expresionInorder2);
console.log('Expresion convertida en PostOrder', arbolExpresionInorder.obtenerPostorderDesdeInorder(expresionInorder2));
console.log('Expresion convertida en Preorder', arbolExpresionInorder.obtenerPreorderDesdeInorder(expresionInorder2));
console.log('Resultado:', arbolExpresionInorder.resolver());
console.log('Expresión en Inorder 3:', expresionInorder3);
console.log('Expresion convertida en PostOrder', arbolExpresionInorder.obtenerPostorderDesdeInorder(expresionInorder3));
console.log('Expresion convertida en Preorder', arbolExpresionInorder.obtenerPreorderDesdeInorder(expresionInorder3));
console.log('Resultado:', arbolExpresionInorder.resolver());
console.log('Expresión en Inorder 4:', expresionInorder4);
console.log('Expresion convertida en PostOrder', arbolExpresionInorder.obtenerPostorderDesdeInorder(expresionInorder4));
console.log('Expresion convertida en Preorder', arbolExpresionInorder.obtenerPreorderDesdeInorder(expresionInorder4));
console.log('Resultado:', arbolExpresionInorder.resolver());

// Ejemplo de uso con Preorder
const expresionPreorder = '+5*34';
const arbolExpresionPreorder = new ExpresionAritmetica();
arbolExpresionPreorder.construirArbolDesdePreorder(expresionPreorder);

console.log('\nExpresión en Preorder:', expresionPreorder);
console.log('Resultado:', arbolExpresionPreorder.resolver());

// Ejemplo de uso con Postorder
const expresionPostorder = '534*+';
const arbolExpresionPostorder = new ExpresionAritmetica();
arbolExpresionPostorder.construirArbolDesdePostorder(expresionPostorder);

console.log('\nExpresión en Postorder:', expresionPostorder);
console.log('Resultado:', arbolExpresionPostorder.resolver());
*/

// Inicio del menu

class App {
  constructor () {
    this.arbol = new ExpresionAritmetica();
    this.expresion = '';
  }

  start () {
    const menu = new Menu(opcionesArbolBinario);
    let selected = 0;
    console.log('Seleccione una opcion para calcular la expresion');
    do {
      selected = menu.getselected();
      this.doSelected(selected);
    } while (selected !== '4');
  }

  doSelected (selected) {
    switch (selected) {
      case '1':
        this.InorderArbolBinario();
        break;
      case '2':
        this.ResolverPreorder();
        break;
      case '3':
        this.ResolverPostorder();
        break;
      case '4':
        console.log('Adios');
        break;
      default:
        console.log('Opcion invalida');
        break;
    }
  }

  InorderArbolBinario () {
    console.clear();
    console.log('[      Inorder a Arbol Binario      ]');
    this.expresion = (readString('Ingrese la expresion en Inorder: '));
    if (this.expresion !== '') {
    console.log('Expresion convertida en PostOrder', this.arbol.obtenerPostorderDesdeInorder(this.expresion));
    console.log('Expresion convertida en Preorder', this.arbol.obtenerPreorderDesdeInorder(this.expresion));
    console.log('Resultado:', this.arbol.resolver());
    readString('Presione enter para continuar');
    } else {
    console.log('No ingreso ninguna expresion');
    readString('Presione enter para continuar');
    }
  }

  ResolverPreorder () {
    console.clear();
    console.log('[      Resolver Preorder      ]');
    this.expresion = readString('Ingrese la expresion en Preorder: ');
    if (this.expresion !== '') {
    this.arbol.construirArbolDesdePreorder(this.expresion);
    console.log('Resultado:', this.arbol.resolver());
    readString('Presione enter para continuar');
    } else {
    console.log('No ingreso ninguna expresion');
    readString('Presione enter para continuar');
    }
  }

  ResolverPostorder () {
    console.clear();
    console.log('Resolver Postorder');
    this.expresion = readString('Ingrese la expresion en Postorder: ');
    if (this.expresion !== '') {
    this.arbol.construirArbolDesdePostorder(this.expresion);
    console.log('Resultado:', this.arbol.resolver());
    readString('Presione enter para continuar');
    } else {
    console.log('No ingreso ninguna expresion');
    readString('Presione enter para continuar');
    }
  }
}

const expresionAritmeticaApp = new App();
expresionAritmeticaApp.start();
