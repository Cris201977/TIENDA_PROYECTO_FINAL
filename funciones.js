export { mostrarProductos, mostrarDetalles, obtener, mostrarCarrito }

const contenedorDetalle = document.getElementById("contenedorDetalle")
const contenedor = document.getElementById("contenedor")
document.querySelector(".home").addEventListener("click", () => { window.location = "./index.html" })
document.querySelector(".enlaceCarrito").addEventListener("click", () => { window.location = "./carrito.html" })
let carrito = []

const mostrarProductos = function (listaProductos) {
    listaProductos.forEach((prod) => {
        const producto = document.createElement("article")
        producto.classList.add("producto")
        producto.addEventListener("click", () => {
            guardar(prod, "prod")
            window.location = "./detalle.html"
           })
        const nombre = document.createElement("h2")
        const precio = document.createElement("p")
        const figura = document.createElement("figure")
        const imagen = document.createElement("img")
        imagen.src = prod.imagen
        figura.appendChild(imagen)
        nombre.innerHTML = prod.nombre
        precio.innerHTML = "$"+prod.precio
        producto.append(nombre, precio, figura)
        contenedor.appendChild(producto)
    });
}

const mostrarDetalles = function (prod) {
    const detalle = document.createElement("article")
    detalle.classList.add("detalle")
    const nombre = document.createElement("h2")
    const precio = document.createElement("h4")
    const descripcion = document.createElement("p")
    const imagen = document.createElement("img")
    const figure = document.createElement("figure")
    const btnComprar = document.createElement("button")
    btnComprar.innerHTML = "Agregar al carrito"
    btnComprar.addEventListener("click", () => {
        agregarCarrito(prod)
        alert("¡"+prod.nombre +" se ha añadido a tu carrito!")
    })
    nombre.innerHTML = prod.nombre
    precio.innerHTML = "$" +prod.precio
    descripcion.innerHTML = prod.descripcion
    imagen.src = prod.imagen
    figure.appendChild(imagen)
    detalle.append(nombre, precio, descripcion, figure, btnComprar)
    contenedorDetalle.appendChild(detalle)
}

const agregarCarrito = function (prod){
    carrito.splice(0, carrito.length)
    obtener("Carrito").forEach(elemento => { carrito.push(elemento) })
    if (carrito[0] == []) { carrito.shift() }
    carrito.push(prod)
    guardar(carrito, "Carrito")
}

const obtener = function (clave) {
    const pr = window.localStorage.getItem(clave)
    if (pr) {
        let ps = JSON.parse(pr)
        return ps
    } else return []
}
const guardar = function (producto, clave) {
    const carritoConvertido = JSON.stringify(producto)
    return window.localStorage.setItem(clave, carritoConvertido)
}

const mostrarCarrito = function (carrito) {
    console.log(carrito)
    const total = document.querySelector(".total")
    const contenedorCarrito = document.querySelector(".contenedorCarrito")
    const btnFinalizarCompra = document.createElement("button")
    btnFinalizarCompra.addEventListener("click", () => {finalizarCompra()})
    btnFinalizarCompra.innerHTML = "Finalizar compra"
    obtener("Carrito").forEach(pr => {
    const carro = document.createElement("section")
    carro.classList.add("carrito")
    const ticket = document.createElement("article")
    const nom = document.createElement("h4")
    const pre = document.createElement("h5")
    const btnEliminar = document.createElement("button")
    btnEliminar.addEventListener("click", () => {eliminarProducto(pr)})
    btnEliminar.innerHTML = "x"
    nom.innerHTML = pr.nombre
    pre.innerHTML = "$" +pr.precio
    ticket.append(nom, pre)
    total.innerHTML = "Total.......$" +devolverTotal()
    carro.append(ticket, btnEliminar)
    contenedorCarrito.append(carro, btnFinalizarCompra)
})
}

const finalizarCompra = function(){
    const contenedorCarrito = document.querySelector(".contenedorCarrito")
    const opcionFinalizar = confirm("¿Desea realizar la compra?")
    console.log(opcionFinalizar)
    if (opcionFinalizar ==true) {
        localStorage.clear()
        contenedorCarrito.innerHTML = "<h1>¡Gracias por su compra!</h1>"
    }
}

const eliminarProducto = function(pr){
    const opcionEliminar = confirm("¿Desea eliminar este producto de su compra?")
    if (opcionEliminar==true) {
        obtener("Carrito").forEach(elemento => { carrito.push(elemento) })
        carrito.splice(carrito.indexOf(pr, 0), 1)
        console.log(carrito)
        guardar(carrito, "Carrito")
        window.location = "./carrito.html"
    }
}
const devolverTotal = function () {
    let suma = 0;
    obtener("Carrito").forEach(elemento => {
        suma += parseInt(elemento.precio)
    })
    return suma
}


