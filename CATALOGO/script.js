let carrito = [];
let mostrador = document.getElementById("mostrador");
let seleccion = document.getElementById("seleccion");
let imgSeleccionada = document.getElementById("img");
let modeloSeleccionado = document.getElementById("modelo");
let descripSeleccionada = document.getElementById("descripcion");
let precioSeleccionado = document.getElementById("precio");
let tallaSeleccionada = document.getElementById("talla");
let listaCarrito = document.getElementById("lista-carrito");
let totalCarrito = document.getElementById("total");
let carritoElement = document.getElementById("carrito");
let mensajeModal = document.getElementById("mensaje-modal");
let mensajeTexto = document.getElementById("mensaje-texto");
let modalIcono = document.getElementById("modal-icono");

function cargar(item) {
    quitarBordes();
    mostrador.style.width = "60%";
    seleccion.style.width = "40%";
    seleccion.style.opacity = "1";
    item.style.border = "2px solid rgb(218, 64, 136)";
    imgSeleccionada.src = item.getElementsByTagName("img")[0].src;
    modeloSeleccionado.innerHTML = item.getElementsByTagName("p")[0].innerHTML;
    descripSeleccionada.innerHTML = "Descripción del modelo";
    precioSeleccionado.innerHTML = item.getElementsByTagName("span")[0].innerHTML;
}

function cerrar() {
    mostrador.style.width = "100%";
    seleccion.style.width = "0%";
    seleccion.style.opacity = "0";
    quitarBordes();
}

function quitarBordes() {
    var items = document.getElementsByClassName("item");
    for (let i = 0; i < items.length; i++) {
        items[i].style.border = "none";
    }
}

function agregarAlCarrito() {
    let producto = {
        img: imgSeleccionada.src,
        modelo: modeloSeleccionado.innerHTML,
        descripcion: descripSeleccionada.innerHTML,
        precio: parseFloat(precioSeleccionado.innerHTML.replace('$', '')),
        talla: tallaSeleccionada.value
    };
    carrito.push(producto);
    actualizarCarrito();
    mostrarModal("Tu producto se agregó al carrito", "check");
}

function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
    carrito.forEach((producto, index) => {
        let li = document.createElement('li');
        li.innerHTML = `${producto.modelo} - Talla: ${producto.talla} - Precio: $${producto.precio}`;
        listaCarrito.appendChild(li);
        total += producto.precio;
    });
    totalCarrito.innerHTML = total.toFixed(2);
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    mostrarModal("El carrito ha sido vaciado", "trash");
}

function procesarCompra() {
    if (carrito.length === 0) {
        mostrarModal("El carrito está vacío", "warning");
    } else {
        carrito = [];
        actualizarCarrito();
        mostrarModal("Compra procesada con éxito", "check");
    }
}

function toggleCarrito() {
    if (carritoElement.style.display === "none" || carritoElement.style.display === "") {
        carritoElement.style.display = "block";
    } else {
        carritoElement.style.display = "none";
    }
}

function mostrarModal(mensaje, tipo) {
    mensajeTexto.innerHTML = mensaje;
    modalIcono.innerHTML = "";
    let icono;
    if (tipo === "check") {
        icono = "✔️";
    } else if (tipo === "trash") {
        icono = "🗑️";
    } else {
        icono = "⚠️";
    }
    modalIcono.innerHTML = icono;
    mensajeModal.style.display = "flex";
    setTimeout(() => {
        mensajeModal.style.display = "none";
    }, 2000);
}
