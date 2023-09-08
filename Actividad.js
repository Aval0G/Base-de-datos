class Producto {
  constructor (codigo, nombre, precio, cantidad) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
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
    this.productos = [];
  }

  checarCodigo (codigo) {
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos[i].codigo === codigo) {
        return true;
      }
    }
    return false;
  }

  buscarIndex (codigo) {
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos[i].codigo === codigo) {
        return i;
      }
    }
    return null;
  }

  agregar (producto) {
    if (!this.checarCodigo(producto.codigo)) {
      this.productos.push(producto);
      return true;
    } else {
      return false;
    }
  }

  listar () {
    let html = '';
    for (let i = 0; i < this.productos.length; i++) {
      html += this.productos[i].infoHtml();
    }
    return html;
  }

  listarInverso () {
    let html = '';
    for (let i = this.productos.length - 1; i >= 0; i--) {
      html += this.productos[i].infoHtml();
    }
    return html;
  }

  buscarProducto (codigo) {
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos[i].codigo === codigo) {
        return this.productos[i];
      }
    }
    return null;
  }

  eliminar (codigo) {
    if (this.checarCodigo(codigo)) {
      const aux = this.buscarProducto(codigo);
      const index = this.buscarIndex(codigo);
      for (let i = index; i < this.productos.length; i++) {
        this.productos[i] = this.productos[i + 1];
      }
      this.productos[this.productos.length - 1] = aux;
      this.productos.pop();
      return true;
    } else {
      return false;
    }
  }

  modificar (nombre, precio, cantidad, codigo) {
    if (this.checarCodigo(codigo)) {
      const i = this.buscarIndex(codigo);
      this.productos[i].nombre = nombre;
      this.productos[i].precio = precio;
      this.productos[i].cantidad = cantidad;
      return true;
    } else {
      return false;
    }
  }
}

const inventario = new Inventario();

const btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', () => {
  const nombre = document.getElementById('Nombre').value;
  const precio = document.getElementById('Precio').value;
  const cantidad = document.getElementById('Cantidad').value;
  const codigo = document.getElementById('Codigo').value;
  const producto = new Producto(codigo, nombre, precio, cantidad);
  if (inventario.agregar(producto)) {
    document.getElementById('detalles').innerHTML = producto.infoHtml();
  } else {
    document.getElementById('detalles').innerHTML = '<h2>El producto ya existe</h2>';
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
  const eliminar = inventario.eliminar(codigo);
  if (eliminar === true) { document.getElementById('detalles').innerHTML = '<h2>Producto Elimnado</h2>'; } else { document.getElementById('detalles').innerHTML = '<h2>El producto no existe</h2>'; }
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
  if (modificacion === true) { document.getElementById('detalles').innerHTML = '<h2>Producto modificado</h2>' + inventario.buscarProducto(codigo).infoHtml(); } else { document.getElementById('detalles').innerHTML = '<h2>El producto no existe</h2>'; }
});

const btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click', () => {
  const codigo = document.getElementById('Codigo').value;
  const producto = inventario.buscarProducto(codigo);
  if (producto != null) { document.getElementById('detalles').innerHTML = producto.infoHtml(); } else { document.getElementById('detalles').innerHTML = '<h2>El producto no existe</h2>'; }
});
