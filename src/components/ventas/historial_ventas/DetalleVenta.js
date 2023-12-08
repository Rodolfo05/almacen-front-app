import React, { useEffect } from 'react'
import { useState } from 'react'

export const DetalleVenta = ({idVenta}) => {



   

//     const obtenerIDVenta = () => {
//         const urlParams = new URLSearchParams();
//         console.log(this.props);
//         setIdVenta(urlParams);
//     }

//    useEffect(() => {
//     obtenerIDVenta();
//    }, [])
   console.log(idVenta);

  return (
    <>
    <div>DetalleVenta</div>
    <h1>{idVenta}</h1>
    </>
  )
}
