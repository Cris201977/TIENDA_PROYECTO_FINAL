import { mostrarProductos, obtener} from "./funciones.js";

fetch("productos.json")
    .then(response => response.json())
    .then(data => mostrarProductos(data.productos));



