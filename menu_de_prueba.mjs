import { readString } from './keyboard.mjs';

export class Menu {
  _options = [];

  constructor (options) {
    this._options = options;
  }

  show () {
    console.log('[      MENU      ]');
    this._options.forEach((options, index) => {
      console.log(` [${index + 1}] ${options}`);
    });
  }

  getselected () {
    console.clear();
    this.show();
    const selected = readString('Opcion a seleccionar:');
    return selected;
  }
}

export const opcionesArbolBinario = [
  'Inorder a Arbol Binario',
  'Sumar expresion en Preorder',
  'Sumar expresion en Postorder',
  'Salir'
];
