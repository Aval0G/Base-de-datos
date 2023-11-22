import { readString } from './keyboard.mjs';

/**
 * Clase para mostrar un menu en consola
 * @param {string[]} options - Opciones a mostrar en el menu
 * @description La clase tiene un metodo para mostrar el menu y otro para obtener la opcion seleccionada
 */
export class Menu {
  _options = [];

  constructor (options) {
    this._options = options;
  }

  /**
   * Funcion que muestra el menu en consola
   * @returns No retorna nada
   */
  show () {
    console.log('[      MENU      ]');
    this._options.forEach((options, index) => {
      console.log(` [${index + 1}] ${options}`);
    });
  }

  /**
   * Funcion que retorna la opcion seleccionada por el usuario
   * @returns {string} Retorna la opcion seleccionada
   */
  getselected () {
    console.clear();
    this.show();
    const selected = readString('Opcion a seleccionar:');
    return selected;
  }
}

/**
 * Opciones del menu para el arbol binario
 * @type {string[]}
 */

export const opcionesArbolBinario = [
  'Inorder a Arbol Binario',
  'Sumar expresion en Preorder',
  'Sumar expresion en Postorder',
  'Salir'
];
