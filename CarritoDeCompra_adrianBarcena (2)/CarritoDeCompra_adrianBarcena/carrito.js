class Carrito {
    constructor(coleccionProductos) {
        this.productos = coleccionProductos.products.map(producto => ({
            ref: producto.SKU,
            nombre: producto.title,
            precio: producto.price,
            cantidad: 0
        }));
    }

    // Obtener información de un producto a partir de su ref
    obtenerInformacion(ref) {
        return this.productos.find(producto => producto.ref === ref);
    }

    // Actualizar la cantidad de un producto en el carrito usando el ref 
    actualizarUnidades(ref, nuevaCantidad) {
        this.productos = this.productos.map(producto => {
            if (producto.ref === ref) {
                return { ...producto, cantidad: nuevaCantidad };
            }
            return producto;
        });
    }

    // Calcular el total por cada producto
    calcularTotalPorProducto(ref) {
        const producto = this.obtenerInformacion(ref);
        return (producto.cantidad * producto.precio).toFixed(2);
    }

    // Calcular el total del carrito
    calcularTotalCarrito() {
        return this.productos.reduce((total, producto) => total + (producto.cantidad * producto.precio), 0).toFixed(2);
    }
}

//tofixed javascript-> PARA EL TOTAL
export default Carrito;