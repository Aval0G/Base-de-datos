import readlineSync from 'readline-sync';

export function readString (msg) {
  const value = readlineSync.question(msg);
  return value;
}

export function readDate (msg) {
  const value = readlineSync.question(msg + '(dd/mm/aaaa): ');
  const dateParts = value.split('/');
  return new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
}
