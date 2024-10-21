import Carrito from './carrito.js';
let carrito = null;

// Simulación de una colección de productos que proviene de una fuente externa
function cargaProductos(coleccionProductos) {
    carrito = new Carrito(coleccionProductos);

    // Actualizar la interfaz gráfica
    function actualizarCarrito() {
        const tbody = document.getElementById('productos-body');
        tbody.innerText = ''; // Limpiar la tabla antes de actualizarla

        carrito.productos.forEach(producto => {
            const fila = document.createElement('tr');

            // Crear celdas para cada columna
            const nombreCelda = document.createElement('td');
            nombreCelda.innerText = producto.nombre;

            const cantidadCelda = document.createElement('td');
            const minusButton = document.createElement('button');
            minusButton.classList.add('minus');
            minusButton.dataset.ref = producto.ref;  
            minusButton.innerText = '-';

            const plusButton = document.createElement('button');
            plusButton.classList.add('plus');
            plusButton.dataset.ref = producto.ref;  
            plusButton.innerText = '+';

            const inputCantidad = document.createElement('input');
            inputCantidad.type = 'number';
            inputCantidad.id = `quantity-${producto.ref}`;  
            inputCantidad.value = producto.cantidad;
            inputCantidad.min = 0; 

            // Agregar los botones y el input a la celda de cantidad
            cantidadCelda.appendChild(minusButton);
            cantidadCelda.appendChild(inputCantidad);
            cantidadCelda.appendChild(plusButton);

            const precioCelda = document.createElement('td');
            precioCelda.innerText = `${producto.precio}€`;

            const totalCelda = document.createElement('td');
            totalCelda.id = `total-${producto.ref}`;  
            totalCelda.innerText = `${carrito.calcularTotalPorProducto(producto.ref)}€`;

            // Añadir celdas a la fila
            fila.appendChild(nombreCelda);
            fila.appendChild(cantidadCelda);
            fila.appendChild(precioCelda);
            fila.appendChild(totalCelda);

            // Añadir la fila a la tabla
            tbody.appendChild(fila);

            // Evento para escribir manualmente la cantidad
            inputCantidad.addEventListener('input', (event) => {
                const nuevaCantidad = parseInt(event.target.value) || 0;  // Validacion para que sea un número
                carrito.actualizarUnidades(producto.ref, nuevaCantidad);
                actualizarCarrito();  // Actualizar la interfaz después del cambio
            });
        });

        // Actualizar el total del carrito
        document.getElementById("final_total").innerText = `${carrito.calcularTotalCarrito()}€`;

        // Actualizar el desglose de productos en la sección "Total"
        const totalSection = document.getElementById('final_total');
        totalSection.innerText = ''; // Limpiar la sección antes de actualizarla

        carrito.productos.forEach(producto => {
            if (producto.cantidad > 0) {
                const totalFila = document.createElement('p');
                totalFila.innerText = `${producto.nombre} x${producto.cantidad} - ${carrito.calcularTotalPorProducto(producto.ref)}€`;
                totalSection.appendChild(totalFila);
            }
        });

        // Actualizar el gran total del carrito
        const granTotal = document.createElement('p');
        granTotal.innerText = `TOTAL: ${carrito.calcularTotalCarrito()}€`;
        totalSection.appendChild(granTotal);
    }

    // Añadir eventos a los botones para incrementar y decrementar cantidades
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('plus')) {
            const productRef = event.target.dataset.ref;
            const producto = carrito.productos.find(p => p.ref === productRef);
            carrito.actualizarUnidades(productRef, producto.cantidad + 1);
            actualizarCarrito();
        }

        if (event.target.classList.contains('minus')) {
            const productRef = event.target.dataset.ref;
            const producto = carrito.productos.find(p => p.ref === productRef);
            if (producto.cantidad > 0) {
                carrito.actualizarUnidades(productRef, producto.cantidad - 1);
                actualizarCarrito();
            }
        }
    });

    // Inicializar la interfaz gráfica con los productos
    actualizarCarrito();
}

///////////////////////
// Inicializar la interfaz gráfica al cargar la página
// Si ya tienes un carrito inicializado, aquí se llamaría la función actualizarCarrito para mostrar productos
// Llamada a la API
fetch("https://jsonblob.com/api/1296842232228077568")
   .then(response => response.json())
    // .catch(error => console.log(error))
    // .finally(console.log("Se ha llamado a un servidor"))
   .then(coleccionProductos => {
    cargaProductos(coleccionProductos);
    });

