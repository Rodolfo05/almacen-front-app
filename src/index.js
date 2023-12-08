import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { AlmacenApp } from './components/AlmacenApp';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HistorialVentas } from './components/ventas/historial_ventas/HistorialVentas';
import { NuevaVenta } from './components/ventas/NuevaVenta';
import { InicioApp } from './components/InicioApp';
import { ListadoProductos } from './components/productos/ListadoProductos';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>

<AlmacenApp/>



  </BrowserRouter>

);
