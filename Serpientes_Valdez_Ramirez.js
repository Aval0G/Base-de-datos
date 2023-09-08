class Dado {
  lanzar () {
    return Math.floor(Math.random() * 6) + 1;
  }
}

class Tablero {
  constructor () {
    this.tablero = [];
    this.fill();
  }

  fill () {
    for (let i = 0; i <= 105; i++) {
      this.tablero[i] = i;
    }
    this.tablero[23] = 9; // serpientes
    this.tablero[10] = 1;
    this.tablero[50] = 37;
    this.tablero[60] = 45;
    this.tablero[96] = 18;
    this.tablero[36] = 20;
    this.tablero[42] = 7;
    this.tablero[85] = 62;
    this.tablero[70] = 50;
    this.tablero[2] = 65; // escaleras
    this.tablero[16] = 31;
    this.tablero[24] = 47;
    this.tablero[38] = 64;
    this.tablero[49] = 52;
    this.tablero[78] = 86;
    this.tablero[6] = 28;
    this.tablero[65] = 70;
    this.tablero[87] = 95;
  }

  checarCasilla (num) {
    return this.tablero[num];
  }
}

class Jugador {
  constructor (numJugador) {
    this.posicion = 0;
    this.numJugador = numJugador;
  }

  lanzarDado (dado) {
    return dado.lanzar();
  }

  avanzar (avance) {
    this.posicion += avance;
  }

  nuevaPosicion (tablero) {
    this.posicion = tablero.checarCasilla(this.posicion);
  }
}
const dado = new Dado();
const tablero = new Tablero();
const Jugador1 = new Jugador(1);
const Jugador2 = new Jugador(2);

do {
  const avance1 = Jugador1.lanzarDado(dado);
  const avance2 = Jugador2.lanzarDado(dado);
  Jugador1.avanzar(avance1);
  Jugador2.avanzar(avance2);
  Jugador1.nuevaPosicion(tablero);
  Jugador2.nuevaPosicion(tablero);
} while (Jugador1.posicion <= 100 && Jugador2.posicion <= 100);

if (Jugador1.posicion >= 100) console.log('Gano el jugador 1');
else if (Jugador2.posicion >= 100) console.log('Gano el jugador 2');

// Valdez Gutierrez Aldo Eduardo
// Ramirez Preciado Cesar Emmanuel
