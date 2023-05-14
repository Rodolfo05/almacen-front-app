import axios from "axios";

const baseURL = "http://localhost:3000";

export async function getProductos() {
    try {

        const respuesta = await axios({
            url: `${baseURL}/productos`,
            method: 'GET'
        })

        return respuesta;

    } catch (error) {
        console.log("Error al cargar los productos " + error);
    }
}

export async function crearNuevoProducto(productoData) {
    try {

        const formData = new FormData();
        formData.append('nombre', productoData.nombre);
        formData.append('descripcion', productoData.descripcion);
        formData.append('precio', productoData.precio);

        const respuesta = await axios({
            url: `${baseURL}/productos`,
            method: 'POST',
            data: productoData
        })

        return respuesta;

    } catch (e) {
        console.log(e)
    }
}

export async function actualizarProducto(productoData){
    try {

        const formData = new FormData;
        formData.append('nombre', productoData.nombre);
        formData.append('descripcion', productoData.descripcion);
        formData.append('precio', productoData.precio);

        const respuesta = await axios({
            url: `${baseURL}/producto/${productoData.id}`,
            method: 'PUT',
            data: productoData
        })

        return respuesta;

    } catch (error) {
        
    }
}

export async function eliminaProductoBD(idProducto) {
    try {

        const respuesta = await axios({
            url: `${baseURL}/productoDel/${idProducto}`,
            method: 'PUT'
        })

        return respuesta;

    } catch (e) {
        console.log("Error al eliminar producto: " + e);
    }
}

export async function getProductoPorID(idProducto) {

    try {

        const respuesta = await axios({
            url: `${baseURL}/productos/${idProducto}`,
            method: 'GET'
        })

        if(respuesta.data == "" || respuesta.data == null){
            return "0";
        }

        return respuesta;

    } catch (error) {
        console.log("Error al cargar el producto " + error);
    }
}

export async function buscaProductos(texto) {
    try {

        const respuesta = await axios({
            url: `${baseURL}/searchProductos/${texto}`,
            method: 'GET'
        })

        return respuesta;

    } catch (error) {
        console.log("Error al cargar los productos " + error);
    }
}