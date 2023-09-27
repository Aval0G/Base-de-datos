const matriz = [];
function matriz5x5 () { // del 1 al 25
  let contador = 1;
  for (let i = 0; i < 5; i++) {
    matriz[i] = [];
    for (let j = 0; j < 5; j++) {
      matriz[i][j] = contador;
      contador++;
    }
  }
  return matriz;
}
console.log(matriz5x5());

console.log('Diagonal');
for (let i = 1; i <= 4; i++) {
  for (let j = 4; j > 0; j -= i) {
    console.log(matriz[i][j]);
  }
}
