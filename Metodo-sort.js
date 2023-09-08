const vec1 = [];

for (let i = 0; i < 15; i++) {
  vec1[i] = Math.floor((Math.random() * 30) + 1);
}

console.log(vec1);

function metodoBurbuja (vec) {
  let aux = 0;
  let comparaciones = 0;
  for (let i = 1; i < vec.length; i++) {
    for (let j = 0; j < vec.length - 1; j++) {
      comparaciones++;
      if (vec[j] > vec[j + 1]) {
        aux = vec[j];
        vec[j] = vec[j + 1];
        vec[j + 1] = aux;
      }
    }
  }
  return comparaciones;
}

console.log('Hubo un total de ' + metodoBurbuja(vec1) + ' comparaciones');
console.log(vec1);
