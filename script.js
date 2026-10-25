let catalogoPrecios = { 
    "001": 2500.00, 
    "002": 350.00 
};

/**
 * Enrutador interno SPA (Cambio de pestañas/módulos)
 * @param {string} targetId - ID de la sección a la que se desea navegar
 */
function navigate(targetId) {
    document.querySelectorAll('.section').forEach(view => view.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(tab => tab.classList.remove('active'));
    
    document.getElementById(targetId).classList.add('active');
    document.getElementById('nav-' + targetId).classList.add('active');
}

/**
 * Lógica: Módulo de Productos (RF2)
 */
function registrarProducto(event) {
    event.preventDefault();
    const nombre = document.getElementById('p-nombre').value;
    const precio = parseFloat(document.getElementById('p-precio').value);
    const stock = parseInt(document.getElementById('p-stock').value);
    
    const tabla = document.getElementById('tabla-productos');
    const totalFilas = tabla.rows.length + 1;
    const nuevoCodigo = totalFilas < 10 ? "00" + totalFilas : "0" + totalFilas;
    
    // Guardar en el mapa dinámico de memoria
    catalogoPrecios[nuevoCodigo] = precio;

    // Determinar estilo de alerta visual según stock disponible
    const badgeClass = stock <= 10 ? "badge badge-alert" : "badge";

    const nuevaFila = `<tr>
        <td>${nuevoCodigo}</td>
        <td>${nombre}</td>
        <td>$${precio.toFixed(2)}</td>
        <td><span class="${badgeClass}">${stock} unidades</span></td>
    </tr>`;
    
    tabla.innerHTML += nuevaFila;
    
    // Sincronizar dinámicamente el selector del módulo de ventas
    const selectorVenta = document.getElementById('v-producto');
    selectorVenta.innerHTML += `<option value="${precio}">${nombre} ($${precio.toFixed(2)})</option>`;
    
    // Actualizar los contadores visuales del Dashboard principal
    document.getElementById('dash-stock').innerText = totalFilas + " Ítems";
    
    alert('Producto incorporado al prototipo con éxito.');
    event.target.reset();
}

/**
 * Lógica: Módulo de Clientes (RF3)
 */
function registrarCliente(event) {
    event.preventDefault();
    const nombre = document.getElementById('c-nombre').value;
    const telefono = document.getElementById('c-telefono').value;
    const email = document.getElementById('c-email').value;
    
    const tabla = document.getElementById('tabla-clientes');
    const totalFilas = tabla.rows.length + 1;
    const nuevoId = "C-1" + (totalFilas < 10 ? "0" + totalFilas : totalFilas);
    
    const nuevaFila = `<tr>
        <td>${nuevoId}</td>
        <td>${nombre}</td>
        <td>${telefono}</td>
        <td>${email}</td>
    </tr>`;
    
    tabla.innerHTML += nuevaFila;
    
    // Sincronizar el selector de la pestaña de facturas
    const selectorCliente = document.getElementById('v-cliente');
    selectorCliente.innerHTML += `<option>${nombre}</option>`;
    
    // Actualizar los contadores visuales del Dashboard principal
    document.getElementById('dash-clientes').innerText = totalFilas + " Registros";
    
    alert('Ficha de cliente dada de alta de forma reactiva.');
    event.target.reset();
}

/**
 * Lógica: Cálculos Automatizados en Ventas (RF4)
 */
function calcularTotales() {
    const precioSeleccionado = parseFloat(document.getElementById('v-producto').value);
    const cantidad = parseInt(document.getElementById('v-cantidad').value) || 1;
    const totalCalculado = precioSeleccionado * cantidad;
    
    document.getElementById('v-total').innerText = '$' + totalCalculado.toFixed(2);
}

/**
 * Lógica: Generación de Factura Simulada (RF5)
 */
function emitirFactura() {
    const cliente = document.getElementById('v-cliente').value;
    const total = document.getElementById('v-total').innerText;
    const tabla = document.getElementById('tabla-ventas');
    
    const totalFilas = tabla.rows.length + 1;
    const nuevoFolio = "F-000" + totalFilas;
    
    const nuevaFila = `<tr>
        <td>${nuevoFolio}</td>
        <td>${cliente}</td>
        <td>${total}</td>
        <td><span class="badge" style="background: #e8f8f5; color: #27ae60;">Completado</span></td>
    </tr>`;
    
    tabla.innerHTML += nuevaFila;
    alert('¡Transacción computada e inyectada al historial visible!');
}