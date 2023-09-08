const veces = [0, 0, 0, 0, 0, 0];

class Dado {
  tirar () {
    const resultado = Math.floor(Math.random() * (6) + 1);
    return resultado;
  }
}

const dado = new Dado();

function calcularMostrar () {
  for (let i = 0; i <= 99; i++) { // calcula 100 veces
    const result = dado.tirar();
    if (result === 1) veces[0]++;
    else if (result === 2) veces[1]++;
    else if (result === 3) veces[2]++;
    else if (result === 4) veces[3]++;
    else if (result === 5) veces[4]++;
    else if (result === 6) veces[5]++;
  }
  for (let i = 0; i < veces.length; i++) { // reasigna el valor de cada elemento del array para su impresion
    veces[i] = `El número ${i + 1} salió ${veces[i]} veces`;
  }
}

calcularMostrar();
console.log(veces);
