import React from 'react'
import { InicioApp } from './InicioApp'
import { Navbar } from './Navbar'
import { Route, Routes } from 'react-router-dom'
import { HistorialVentas } from './ventas/historial_ventas/HistorialVentas'
import { NuevaVenta } from './ventas/NuevaVenta'
import { ListadoProductos } from './productos/ListadoProductos'

export const AlmacenApp = () => {
  return (
    <>

    <h1>Almacen App</h1>
    
      <div>
        <Navbar />
      </div>


      <Routes>

      <Route path="/" element={<InicioApp />}></Route>

      <Route path="/ventas" element={
          <h1>Ventas</h1>
        } />

<Route path="/historialVentas/*" element={<HistorialVentas/>}></Route>


        <Route path="/realizarVentas" element={
          <NuevaVenta />
        } />

        <Route path="/pokes" element={
          <h1>asas</h1>
        } />

     

        <Route path="/team_builder" element={
          <h1>aaa</h1>
        } />


<Route path="/productos/*" element={<ListadoProductos />}></Route>

      </Routes>



    </>
  )
}
