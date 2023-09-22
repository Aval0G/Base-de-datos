agregar(producto) {
    if (!this.checarCodigo(producto.codigo)) {
      let i = 0;
      while (i < this.productos.length && producto.codigo >= this.productos[i].codigo) {
        i++;
      }
      this.productos.push(producto);
      for (let j = this.productos.length - 1; j > i; j--) {
        this.productos[j] = this.productos[j - 1];
      }
      this.productos[i] = producto;
      return true;
    } else {
      return false;
    }
  }

  agregar(producto) {
    if (!this.checarCodigo(producto.codigo)) {
      if (this.productos.length === 0) {
        this.productos.push(producto);
      } else {
        for (let i = 0; i < this.productos.length; i++) {
          if (producto.codigo < this.productos[i].codigo) {
            for (let j = this.productos.length; j > i; j--) {
              this.productos[j] = this.productos[j - 1];
            }
            this.productos[i] = producto;
            return true;
          } else if (i === this.productos.length - 1) {
            this.productos.push(producto);
            return true;
          }
        }
      } return true;
    } else {
      return false;
    }
  }

  agregar(producto) {
    if (!this.checarCodigo(producto.codigo)) {
      if (this.productos.length === 0) {
        this.productos.push(producto);
      } else {
        let pos = 0;
        do {
          if (producto.codigo < this.productos[pos].codigo) {
            for (let i = this.productos.length - 1; i >= pos; i--) {
              this.productos[i + 1] = this.productos[i];
            }
            this.productos[pos] = producto;
            return true;
          } else {
            pos++;
          }
        } while (pos < this.productos.length);
        this.productos.push(producto);
      }
      return true;
    } else {
      return false;
    }
  }