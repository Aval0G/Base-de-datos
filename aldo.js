class Producto {
  constructor (codigo, nombre, precio, cantidad) {
    this.codigo = Number(codigo);
    this.nombre = nombre;
    this.precio = Number(precio);
    this.cantidad = Number(cantidad);
    this.siguiente = null;
  }

  info () {
    return `El producto ${this.nombre} tiene un precio de ${this.precio} y hay ${this.cantidad} en stock`;
  }

  infoHtml () {
    return `<div class="producto">
                  <h2>${this.nombre}</h2>
                  <p>Precio: ${this.precio}</p>
                  <p>Stock: ${this.cantidad}</p>
                  <p>Codigo: ${this.codigo}</p>
                </div>`;
  }
}

class Inventario {
  constructor () {
    this.primero = null;
    this.ultimo = null;
  }

  buscar (codigo, factor) {
    let actual = this.primero;
    let anterior = null;
    while (actual != null) {
      if (actual.codigo == codigo) {
        if (factor == 1) return actual;
        else return anterior;
      }
      anterior = actual;
      actual = actual.siguiente;
    }
  }

  agregar (nuevo) {
    if (this.primero == null) {
      this.primero = nuevo;
      this.ultimo = nuevo;
    } else {
      this.ultimo.siguiente = nuevo;
      this.ultimo = nuevo;
    }
  }

  eliminar (codigo) {
    let eliminar = this.buscar(codigo, 1);
    const guardado = eliminar;
    const anterior = this.buscar(codigo, 2);
    anterior.siguiente = eliminar.siguiente;
    eliminar = null;
    return guardado;
  }

  modificar (nombre, precio, cantidad, codigo) {
    const modificar = this.buscar(codigo, 1);
    if (modificar != null) {
      modificar.nombre = nombre;
      modificar.precio = precio;
      modificar.cantidad = cantidad;
      return true;
    } else {
      return false;
    }
  }

  insertarPosicion (producto, posicion) {
    if (posicion == 1) {
      producto.siguiente = this.primero;
      this.primero = producto;
      return true;
    }
    let actual = this.primero;
    let i = 1;
    while (actual != null) {
      if (posicion == i + 1) {
        producto.siguiente = actual.siguiente;
        actual.siguiente = producto;
        return true;
      }
      i++;
      actual = actual.siguiente;
    }
  }

  listar () {
    let html = '';
    let actual = this.primero;
    while (actual != null) {
      html += actual.infoHtml();
      actual = actual.siguiente;
    }
    return html;
  }

  listarInverso () {
    return this._listarInverso(this.primero);
  }

  _listarInverso (nodo) {
    if (nodo != null) {
      const html = '' + this._listarInverso(nodo.siguiente);
      return html + nodo.infoHtml();
    } else {
      return '';
    }
  }
}

const inventario = new Inventario();

function precargar () {
  inventario.agregar(new Producto(1, 'Papas', 10, 100));
  inventario.agregar(new Producto(2, 'Manzanas', 20, 200));
  inventario.agregar(new Producto(3, 'Peras', 30, 300));
  inventario.agregar(new Producto(4, 'Naranjas', 40, 400));
  inventario.agregar(new Producto(5, 'Sandias', 50, 500));
  inventario.agregar(new Producto(6, 'Melones', 60, 600));
  inventario.agregar(new Producto(7, 'Platanos', 70, 700));
}

precargar();

const btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', () => {
  const nombre = document.getElementById('Nombre').value;
  const precio = document.getElementById('Precio').value;
  const cantidad = document.getElementById('Cantidad').value;
  const codigo = document.getElementById('Codigo').value;
  const producto = new Producto(codigo, nombre, precio, cantidad);
  const comprobar = inventario.buscar(codigo, 1);
  if (comprobar != null) {
    document.getElementById('detalles').innerHTML = '<h2>El producto con ese codigo ya existe</h2>';
  } else {
    inventario.agregar(producto);
    document.getElementById('detalles').innerHTML = producto.infoHtml();
  }
});

const btnClean = document.getElementById('btnClean');
btnClean.addEventListener('click', () => {
  document.getElementById('Nombre').value = '';
  document.getElementById('Precio').value = '';
  document.getElementById('Cantidad').value = '';
  document.getElementById('Codigo').value = '';
  document.getElementById('detalles').innerHTML = '';
});

const btnDelete = document.getElementById('btnDelete');
btnDelete.addEventListener('click', () => {
  const codigo = document.getElementById('Codigo').value;
  if (inventario.eliminar(codigo) != null) document.getElementById('detalles').innerHTML = '<h2>Producto Eliminado</h2>';
  else { document.getElementById('detalles').innerHTML = '<h2>El producto no existe</h2>'; }
});

const btnList = document.getElementById('btnList');
btnList.addEventListener('click', () => {
  document.getElementById('detalles').innerHTML = inventario.listar();
});

const btnListInver = document.getElementById('btnListInver');
btnListInver.addEventListener('click', () => {
  document.getElementById('detalles').innerHTML = inventario.listarInverso();
});

const btnModify = document.getElementById('btnModify');
btnModify.addEventListener('click', () => {
  const nombre = document.getElementById('Nombre').value;
  const precio = document.getElementById('Precio').value;
  const cantidad = document.getElementById('Cantidad').value;
  const codigo = document.getElementById('Codigo').value;
  const modificacion = inventario.modificar(nombre, precio, cantidad, codigo);
  if (modificacion) document.getElementById('detalles').innerHTML = '<h2>Producto modificado</h2>' + inventario.buscar(codigo, 1).infoHtml();
  else { document.getElementById('detalles').innerHTML = '<h2>El producto no existe</h2>'; }
});

const btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click', () => {
  const codigo = document.getElementById('Codigo').value;
  const producto = inventario.buscar(codigo, 1);
  if (producto != null) document.getElementById('detalles').innerHTML = producto.infoHtml();
  else { document.getElementById('detalles').innerHTML = '<h2>El producto no existe</h2>'; }
});

const btnInsert = document.getElementById('btnInsert');
btnInsert.addEventListener('click', () => {
  const nombre = document.getElementById('Nombre').value;
  const precio = document.getElementById('Precio').value;
  const cantidad = document.getElementById('Cantidad').value;
  const codigo = document.getElementById('Codigo').value;
  const posicion = document.getElementById('Posicion').value;
  const producto = new Producto(codigo, nombre, precio, cantidad);
  const comprobar = inventario.buscar(codigo, 1);
  if (comprobar != null) {
    document.getElementById('detalles').innerHTML = '<h2>El producto con ese codigo ya existe</h2>';
  } else {
    const insertar = inventario.insertarPosicion(producto, posicion);
    if (insertar) document.getElementById('detalles').innerHTML = producto.infoHtml();
    else document.getElementById('detalles').innerHTML = '<h2>Esa posicion no  existe</h2>';
  }
});
