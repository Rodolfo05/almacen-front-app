import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Router } from 'react-router-dom'

import { traeVentas } from '../../../services/ventasService';
import { DetalleVenta } from './DetalleVenta';

export const HistorialVentas = () => {

    const [ventas, setVentas] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const navigateToContacts = () => {

        navigate('/detalleVenta');
    };


    async function cargaVentas() {
        const resp = await traeVentas();

        if (resp.status === 200) {
            const respuesta = resp.data;
            setVentas(respuesta);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        cargaVentas();
    }, []);


    return (
        <div>
            HistorialVentas
            <br />

            <table className="table table-hover">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">F. Emisión</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Total</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        !isLoading && ventas.length > 0 &&
                        ventas.map((venta) => {
                            return (
                                <div>
                                    <tr key={venta.ID}>
                                        <th scope="row">{venta.ID}</th>
                                        <td>{venta.FECHA_EMISION}</td>
                                        <td>{venta.CLIENTE}</td>
                                        <td>{venta.TOTAL}</td>
                                        <td>
                                            <button onClick={navigateToContacts}>Detalle</button>
                                        </td>
                                    </tr>


                                </div>
                            )
                        })
                    }

                </tbody>
            </table>
          
                <Routes>
                    <Route path="/detalleVenta" element={<DetalleVenta idVenta={"venta.ID"} />} />
                </Routes>
       
        </div>

    )
}

