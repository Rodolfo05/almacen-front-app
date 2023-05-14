import axios from "axios";

const baseURL = "http://localhost:3000";

export async function guardaVenta(ventaData) {
    try {

        // const formData = new FormData();
        // formData.append('nombre', productoData.nombre);
        // formData.append('descripcion', productoData.descripcion);
        // formData.append('precio', productoData.precio);

        const respuesta = await axios({
            url: `${baseURL}/ventas`,
            method: 'POST',
            data: ventaData
        })

        return respuesta;

    } catch (e) {
        console.log(e)
    }
}
