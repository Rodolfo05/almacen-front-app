import React from 'react'
import { BrowserRouter as Router, Switch, Route, Routes, NavLink } from "react-router-dom";
import { InicioApp } from './InicioApp';
import { ListadoProductos } from './productos/ListadoProductos';
import { NuevaVenta } from './ventas/NuevaVenta';

export const Navbar = () => {
    return (
        <Router>
            <>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link">
                                        Inicio
                                    </NavLink>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Ventas
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="/realizarVentas">Realizar Venta</a></li>
                                        <li><a className="dropdown-item" href="#">Historial de Ventas</a></li>
                                    </ul>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Productos
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="/productos">Mantenedor de Productos</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link disabled">Disabled</a>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </>

            <Routes>

                <Route path="/ventas" element={
                    <h1>Ventas</h1>
                } />

                <Route path="/realizarVentas" element={
                    <NuevaVenta/>
                } />

                <Route path="/pokes" element={
                    <h1>asas</h1>
                } />

                <Route path="/" exact element={
                    <InicioApp />
                } />

                <Route path="/team_builder" exact element={
                    <h1>aaa</h1>
                } />

                <Route path="/productos" exact element={

                    <ListadoProductos />

                } />



            </Routes>



        </Router>
    )
}
