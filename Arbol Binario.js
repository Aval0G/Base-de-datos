import { readString } from './keyboard.mjs';
import { Menu, opcionesArbolBinario } from './menu_de_prueba.mjs';

/**
 * Clase que representa un nodo de un arbol binario
 * @param {string} caracter - Caracter que puede ser un signo de operacion o un digito
 * @param {Nodo} hiIzq - Hijo izquierdo de un nodo
 * @param {Nodo} hiDer - Hijo derecho de un nodo
 * @description La clase tiene un caracter siempre, pero puede tener uno o dos hijos
*/
class Nodo {
  constructor (caracter) {
    this.caracter = caracter;
    this.hiIzq = null;
    this.hiDer = null;
  }
}

/**
 * Clase que representa el arbol
 * @param {Nodo} arbol - Raiz del arbol
 * @description La clase tiene el arbol y todos los metodos para construirlo y resolverlo
 */
class ArbolBinario {
  constructor () {
    this.arbol = null;
  }

  /**
   * Funcion para construir el arbol desde inorder
   * @param {string} inorder - Expresion en Inorder
   * @description La funcion recorre la expresion caracter por caracter y va construyendo el arbol con una pila de nodos y una pila de operadores
  */
  construirArbolDesdeInorder (inorder) {
    /**
     * Pila para guardar los nodos
     */
    const pilaNodos = [];
    /**
     * Pila para guardar los operadores
     */
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

  /**
   * Funcion para construir el arbol desde preorder
   * @param {string} preorder - Expresion en Preorder
   * @description La funcion recorre la expresion caracter por caracter y va construyendo el arbol con una pila de nodos
   */
  construirArbolDesdePreorder (preorder) {
    /**
     * Pila donde se guarda el arbol
     */
    const pila = [];
    for (let i = preorder.length - 1; i >= 0; i--) {
      const caracter = preorder[i];
      if (this.esDigito(caracter)) {
        pila.push(new Nodo(caracter));
      } else if (this.esOperador(caracter)) {
        const nodo = new Nodo(caracter);
        nodo.hiIzq = pila.pop();
        nodo.hiDer = pila.pop();
        pila.push(nodo);
      }
    }
    this.arbol = pila.pop();
  }

  dibujarArbol (nodo, nivel = 0) {
    if (nodo === null) {
      return;
    }
    this.dibujarArbol(nodo.hiDer, nivel + 1);
    console.log(' '.repeat(nivel * 4) + nodo.caracter);
    this.dibujarArbol(nodo.hiIzq, nivel + 1);
  }

  /**
   * Funcion para construir el arbol desde postorder
   * @param {string} postorder - Expresion en Postorder
   * @description La funcion recorre la expresion caracter por caracter y va construyendo el arbol con una pila de nodos
  */
  construirArbolDesdePostorder (postorder) {
    /**
     * Pila donde se guarda el arbol
     */
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

  /**
   * Funcion que llama a la funcion recursiva para resolver el Arbol
   * @returns {number} - Resultado de la expresion
   */
  resolver () {
    return this.resolverArbol(this.arbol);
  }

  /**
   * Funcion recursiva que resuelve el arbol
   * @param {Nodo} nodo - Nodo del arbol
   * @returns {number} - Resultado de la expresion
   */
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

  /**
   * Funcion que determina si un caracter es un operador
   * @param {*} caracter caracter a evaluar
   * @returns {boolean} - true si es un operador, false si no lo es
   */
  esOperador (caracter) {
    return ['+', '-', '*', '/'].includes(caracter);
  }

  /**
   * Funcion que determina si un caracter es un digito
   * @param {*} caracter caracter a evaluar
   * @returns {boolean} - true si es un digito, false si no lo es
   */
  esDigito (caracter) {
    return /^\d+$/.test(caracter);
  }

  /**
   * Funcion que determina la importancia de un operador
   * @param {string} operador operador a evaluar
   * @returns {number} 1 si es + o -, 2 si es * o /, 0 si no es un operador
   */
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

  /**
   * Funcion para generar el recorrido Preorder
   * @param {*} nodo donde se empieza el recorrido
   * @returns {string} el recorrido Preorder del arbol
   */
  recorridoPreorder (nodo) {
    /**
     * Variable para guardar el recorrido
     */
    let resultado = '';
    if (nodo !== null) {
      resultado += nodo.caracter;
      resultado += this.recorridoPreorder(nodo.hiIzq);
      resultado += this.recorridoPreorder(nodo.hiDer);
    }
    return resultado;
  }

  /**
   * Funcion para generar el recorrido Postorder
   * @param {*} nodo donde empiezza el recorrido
   * @returns {string} el recorrido Postorder del arbol
   */
  recorridoPostorder (nodo) {
    /**
     * Variable para guardar el recorrido
     */
    let resultado = '';
    if (nodo !== null) {
      resultado += this.recorridoPostorder(nodo.hiIzq);
      resultado += this.recorridoPostorder(nodo.hiDer);
      resultado += nodo.caracter;
    }
    return resultado;
  }

  /**
   * Funcion para obtener el recorrido Preorder desde Inorder
   * @param {string} inorder - Expresion en Inorder
   * @returns {string} el recorrido Preorder del arbol
  */
  obtenerPreorderDesdeInorder (inorder) {
    this.construirArbolDesdeInorder(inorder);
    return this.recorridoPreorder(this.arbol);
  }

  /**
   * Funcion para obtener el recorrido Postorder desde Inorder
   * @param {*} inorder Expresion en Inorder
   * @returns {string} el recorrido Postorder del arbol
   */
  obtenerPostorderDesdeInorder (inorder) {
    this.construirArbolDesdeInorder(inorder);
    return this.recorridoPostorder(this.arbol);
  }
}

// Inicio del menu

/**
 * Clase que representa el menu
 * @param {arbol} arbol - Arbol que se va a usar, se genera vacio
 * @param {string} expresion - Expresion que se va a usar, se genera vacia
 * @param {Menu} menu - Menu que se va a usar, se genera con las opciones del arbol binario en automatico
 * @description La clase tiene un arreglo de opciones y la opcion seleccionada
 */
class App {
  constructor () {
    this.arbol = new ArbolBinario();
    this.expresion = '';
  }

  /**
   * Funcion para iniciar el menu
   * @description La funcion crea el menu y lo muestra, ademas de llamar a la funcion que selecciona los casos
   */
  start () {
    const menu = new Menu(opcionesArbolBinario);
    let selected = 0;
    console.log('Seleccione una opcion para calcular la expresion');
    do {
      selected = menu.getselected();
      this.doSelected(selected);
    } while (selected !== '4');
  }

  /**
   * Funcion para seleccionar la opcion del menu
   * @param {string} selected opcion seleccionada
   * @description La funcion llama a la funcion que se selecciono
   */
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

  /**
   * Funcion para resolver una expresion en Inorder
   * @description La funcion pide una expresion en Inorder y la resuelve asi mismo da su expresion en Preorder y Postorder
   */
  InorderArbolBinario () {
    console.clear();
    console.log('[      Inorder a Arbol Binario      ]');
    this.expresion = (readString('Ingrese la expresion en Inorder: '));
    if (this.expresion !== '') {
      this.arbol.construirArbolDesdeInorder(this.expresion);
      this.arbol.dibujarArbol(this.arbol.arbol);
      console.log('Expresion convertida en Preorder', this.arbol.obtenerPreorderDesdeInorder(this.expresion));
      console.log('Expresion convertida en PostOrder', this.arbol.obtenerPostorderDesdeInorder(this.expresion));
      console.log('Resultado:', this.arbol.resolver());
      readString('Presione enter para continuar');
    } else {
      console.log('No ingreso ninguna expresion');
      readString('Presione enter para continuar');
    }
  }

  /**
   * Funcion para resolver una expresion en Preorder
   * @description La funcion pide una expresion en Preorder y la resuelve
   */
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

  /**
   * Funcion para resolver una expresion en Postorder
   * @description La funcion pide una expresion en Postorder y la resuelve
   */
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

/**
 * Creacion de la aplicacion
 */
const ArbolBinarioApp = new App();
/**
 * Inicio de la aplicacion
 */
ArbolBinarioApp.start();
