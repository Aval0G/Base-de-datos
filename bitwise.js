let num = 4;

/*
Mostrar el valor del bit 2
Indicar el valor de los bits 3 y 4 (0 a 3)
Indicar como están bits 5,6,7 (0 a 7)
Hacer un corrimiento a la izquierda de 3 bits y mostrar el resultado
Tomar el numero anterior y truncar a 1 byte.
*/

function dec2bin (num) {
  return (num >>> 0).toString(2);
}

console.log(num | 1);
