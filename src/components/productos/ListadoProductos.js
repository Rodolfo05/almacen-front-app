import React, { useEffect, useState } from 'react';
import { NavLink, Route, Router, Routes } from 'react-router-dom';
import { crearNuevoProducto, getProductos, eliminaProductoBD, getProductoPorID, actualizarProducto, buscaProductos } from '../../services/productosService';
import { FormNuevoProducto, NuevoProducto } from './FormNuevoProducto';
import { Modal } from 'react-bootstrap';

export const ListadoProductos = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [productos, setProductos] = useState([]);

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [producto, setProducto] = useState({
        id: 0,
        nombre: '',
        descripcion: '',
        precio: 0
    });


    async function cargaProductos() {
        const resp = await getProductos();

        if (resp.status === 200) {
            const respuesta = resp.data;
            setProductos(respuesta);
            setIsLoading(false);
        }
    }

    async function buscarProductos(texto) {

        if(texto != ""){
            if(texto.length > 1){
                const resp = await buscaProductos(texto);
    
                if (resp.status === 200) {
                    const respuesta = resp.data;
                    setProductos(respuesta);
                    setIsLoading(false);
                }
            }else{
                cargaProductos();
            }
        }
    }

    async function cargaProductoPorID(idProducto) {

        const resp = await getProductoPorID(idProducto);

        if (resp !== "0") {
            if (resp.status === 200) {
                const respuesta = resp.data;

                console.log(respuesta)

                let id = respuesta[0].ID;
                let nombre = respuesta[0].NOMBRE;
                let descripcion = respuesta[0].DESCRIPCION;
                let precio = respuesta[0].PRECIO;

                const prod = {
                    id,
                    nombre,
                    descripcion,
                    precio
                }

                setProducto(prod);

                console.log("nom " + respuesta[0].NOMBRE)
            }
        } else {
            console.log("no existe el producto con el id especificado");
        }


    }

    async function eliminaProducto(idProducto) {

        const resp = await eliminaProductoBD(idProducto);
        cargaProductos();

    }

    useEffect(() => {
        cargaProductos();
    }, []);


    const handleShow = () => {
        setShow(true);
    };

    const handleShowEdit = async (idProducto) => {
        await cargaProductoPorID(idProducto);
        setShowEdit(true);
    };

    const handleClose = () => {
        setShow(false);
        setShowEdit(false);
    };

    const handleCloseEdit = () => {
        setShowEdit(false);
    };


    const handleSubmit = async (data) => {
        await crearNuevoProducto(data);
        cargaProductos();
        console.log(data);
        handleClose();
    }

    const handleSubmitEdit = async (data) => {
        console.log("va a editar")
        await actualizarProducto(data);
        cargaProductos();
        handleClose();
    }

    const cargaDataModal = (data) => {
        setProducto(data);
    }


    const changeInputSearch = async (e) =>  {
        
        let textoIngresado = e.target.value;

        if(textoIngresado.length > 2){
            await buscarProductos("quix");
        }

    }

    return (
        <div className='container'>

            <h1>Mantenedor de Productos</h1>

            <br />

            <div className='row'>

                <div className='col col-md-4'>
                    <input name='searchProd' type="text" className="form-control" id="searchProd" key="searchProd" onChange={e => buscarProductos(e.target.value)} placeholder='Buscar producto...' />
                </div>

                <div className='col col-md-3'>
                    <button className='btn btn-success' onClick={handleShow}>Nuevo</button>
                </div>

            </div>

            <br />

            <table className="table table-hover">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NOMBRE</th>
                        <th scope="col">DESCRIPCIÓN</th>
                        <th scope="col">PRECIO</th>
                        <th scope="col">ACCIONES</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        !isLoading && productos.length > 0 &&
                        productos.map(({ ID, NOMBRE, DESCRIPCION, PRECIO }) => {
                            return (
                                <tr key={ID}>
                                    <th scope="row">{ID}</th>
                                    <td>{NOMBRE}</td>
                                    <td>{DESCRIPCION}</td>
                                    <td>{PRECIO}</td>
                                    <td>
                                        <button className='btn btn-danger me-3' onClick={() => eliminaProducto(ID)}>X</button>
                                        <button className='btn btn-warning' onClick={() => handleShowEdit(ID)}>E</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bodyModal'>
                    <FormNuevoProducto formAction="FormNuevoProducto" handleSubmit={handleSubmit} />
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" form="FormNuevoProducto" className='btn btn-success'>Guardar</button>
                    <button
                        className='btn btn-danger'
                        onClick={() => setShow(false)}
                    >
                        Cancelar
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bodyModal'>
                    <FormNuevoProducto formAction="FormEditProducto" handleSubmit={handleSubmitEdit} datosProducto={producto} />

                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" onClick={handleCloseEdit} className='btn btn-warning' form="FormEditProducto">Editar</button>

                    <button
                        className='btn btn-danger'
                        onClick={() => setShowEdit(false)}
                    >
                        Cancelar
                    </button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
