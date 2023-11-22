import readlineSync from 'readline-sync';

/**
 * Funcion para leer un string desde consola
 * @param {*} msg 
 * @returns {string} Retorna el string leido
 */
export function readString (msg) {
  const value = readlineSync.question(msg);
  return value;
}

/**
 * Funcion para leer una fecha desde consola
 * @param {*} msg 
 * @returns {Date} Retorna la fecha leida
 */
export function readDate (msg) {
  const value = readlineSync.question(msg + '(dd/mm/aaaa): ');
  const dateParts = value.split('/');
  return new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
}
