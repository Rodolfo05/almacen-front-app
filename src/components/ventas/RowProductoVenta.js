import React from 'react'

export const RowProductoVenta = ({ idProd, productoNombre, precio, cantidad, dataProd, index }) => {

  return (
    <tr>
      <td>{index}</td>
      <td>{productoNombre}</td>
      <td>{precio}</td>
      <td>{cantidad}</td>
      <td>{cantidad*precio}</td>
    </tr>
  )
}
