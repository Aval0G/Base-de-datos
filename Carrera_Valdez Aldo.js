class Avanzar {
  avance () {
    const resultado = Math.floor(Math.random() * (20) + 1);
    return resultado;
  }
}

class Tortuga {
  constructor () {
    this.posicion = 0;
  }

  movimiento (probabilidad) {
    if (probabilidad <= 9) { // Paso rapido 45%
      this.posicion += 3;
    } else if (probabilidad <= 14) { // Resbalon 25%
      this.posicion -= 6;
    } else if (probabilidad <= 20) { // Paso lento 30%
      this.posicion += 1;
    }
  }
}

class Liebre {
  constructor () {
    this.posicion = 0;
  }

  movimiento (probabilidad) {
    if (probabilidad <= 4) { // Dormir 20%
      this.posicion += 0;
    } else if (probabilidad <= 8) { // Salto grande 20%
      this.posicion += 9;
    } else if (probabilidad <= 10) { // Resbalon grande 10%
      this.posicion -= 12;
    } else if (probabilidad <= 17) { // Salto pequeño 35%
      this.posicion += 1;
    } else if (probabilidad <= 20) { // Resbalon pequeño 15%
      this.posicion -= 2;
    }
  }
}

const tortuga = new Tortuga();
const liebre = new Liebre();
const probabilidad = new Avanzar();
do {
  liebre.movimiento(probabilidad.avance());
  tortuga.movimiento(probabilidad.avance());
  console.log('La tortuga esta en la posicion ' + tortuga.posicion);
  console.log('La liebre esta en la posicion ' + liebre.posicion);
} while (tortuga.posicion < 100 && liebre.posicion < 100);

if (tortuga.posicion >= 100 && liebre.posicion >= 100) {
  console.log('Empate');
} else if (tortuga.posicion >= 100) {
  console.log('Gano la tortuga');
} else if (liebre.posicion >= 100) {
  console.log('Gano la liebre');
}
