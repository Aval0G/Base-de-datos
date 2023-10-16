class Base {
  constructor (nombre, minutos) {
    this.minutos = minutos;
    this.nombre = nombre;
    this.siguiente = null;
    this.anterior = null;
  }

  info () {
    return `Base ${this.nombre} Duracion desde la base anterior ${this.minutos} minutos\n`;
  }
}

class Tiempo {
  constructor (horas) {
    this.horas = horas;
    this.minutos = 0;
  }

  agregarMinutos (minutos) {
    const horasAMin = this.horas * 60;
    const suma = horasAMin + this.minutos + minutos;
    this.horas = Math.floor(suma / 60);
    this.minutos = suma % 60;
  }

  toString () {
    if (this.minutos < 10) {
      return `${this.horas}:0${this.minutos}`;
    } else {
      return `${this.horas}:${this.minutos}`;
    }
  }
}

class Ruta {
  constructor () {
    this.primero = null;
  }

  agregar (nuevo) {
    if (this.primero == null) {
      this.primero = nuevo;
      nuevo.siguiente = nuevo;
      nuevo.anterior = nuevo;
    } else {
      let aux = this.primero;
      while (aux.siguiente != this.primero) {
        aux = aux.siguiente;
      }
      aux.siguiente = nuevo;
      nuevo.anterior = aux;
      nuevo.siguiente = this.primero;
      this.primero.anterior = nuevo;
    }
  }

  buscar (nodo) {
    let aux = this.primero;
    if (aux == null) {
      return null;
    } else {
      while (aux.siguiente != this.primero) {
        if (aux.nombre == nodo) {
          return aux;
        } else {
          aux = aux.siguiente;
        }
      }
      return aux;
    }
  }

  eliminar (nodo) {
    const eliminar = this.buscar(nodo);
    eliminar.siguiente.anterior = eliminar.anterior;
    eliminar.anterior.siguiente = eliminar.siguiente;
    eliminar.anterior = null;
    eliminar.siguiente = null;
    return eliminar;
  }

  listar () {
    let lista = '';
    let aux = this.primero;
    while (aux.siguiente != this.primero) {
      lista += aux.info();
      aux = aux.siguiente;
    }
    lista += aux.info();
    return lista;
  }

  listarInverso () {
    let lista = '';
    let aux = this.primero.anterior;
    while (aux != this.primero) {
      lista += aux.info();
      aux = aux.anterior;
    }
    lista += aux.info();
    return lista;
  }

  crearRuta (baseInicio, horaInicio, horaFin) {
    let aux = this.buscar(baseInicio);
    let ruta = '';
    const tiempo = new Tiempo(horaInicio);
    const fin = new Tiempo(horaFin);
    while (tiempo.horas < fin.horas) {
      ruta += `${aux.info()} ${tiempo.toString()}\n`;
      tiempo.agregarMinutos(aux.siguiente.minutos);
      aux = aux.siguiente;
    }
    return ruta;
  }
}

const rutas = new Ruta();
const UdeC = new Base('UdeC', 30);
rutas.agregar(UdeC);
const Estadio = new Base('Estadio', 20);
rutas.agregar(Estadio);
const Monumento = new Base('Monumento', 15);
rutas.agregar(Monumento);
const jardinVilla = new Base('Jardin Villa', 45);
rutas.agregar(jardinVilla);
const soriana = new Base('Soriana', 10);
rutas.agregar(soriana);
const Dif = new Base('Dif', 5);
rutas.agregar(Dif);

console.log(rutas.listar());
console.log(rutas.listarInverso());
rutas.eliminar('Soriana');
const reyColiman = new Base('Rey coliman', 35);
rutas.agregar(reyColiman);
console.log(rutas.crearRuta('UdeC', 1, 3));
console.log(rutas.crearRuta('Rey coliman', 4, 12));
