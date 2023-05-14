import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getProductos } from '../../services/productosService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RowProductoVenta } from './RowProductoVenta';
import { guardaVenta } from '../../services/ventasService';
import swal from 'sweetalert';


let productosDetalle = [];
let objCabVenta;

export const NuevaVenta = () => {
  let options = [];
  // let options = [
  //   // { value: 'chocolate', label: 'Chocolate' },
  //   // { value: 'strawberry', label: 'Strawberry' },
  //   // { value: 'vanilla', label: 'Vanilla' }
  // ]

  const [productos, setProductos] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const [productoDetalle, setProductoDetalle] = useState(null)

  const [cantidadDetalle, setCantidadDetalle] = useState(0);


  const [venta, setVenta] = useState([null]);

  async function cargaProductos() {

    const resp = await getProductos();

    if (resp.status === 200) {

      const respuesta = resp.data;
      setProductos(respuesta);

    }
  }

  async function procesaSelectProductos() {

    const firstOptionSelect = {
      value: "-1",
      label: "Seleccione producto"
    }

    if (productos != null) {

      productos.forEach(element => {

        const objProductos =
        {
          value: element.ID + "/=/=/" + element.NOMBRE + "/=/=/" + element.PRECIO,
          label: element.NOMBRE + " $" + element.PRECIO
        }
          ;

        options.push(objProductos);

      });
    }
  }

  async function realizaVenta(datosVenta) {
    console.log("entro realizaVenta" + datosVenta)
    const resp = await guardaVenta(datosVenta);

    if (resp.status === 200 || resp.status === 204) {

      const respuesta = resp.data;
      mostrarAlerta2("Venta realizada", "Se ha realizado la venta existosamente.", "success", 'Aceptar');
    }
  }

  useEffect(() => {

    cargaProductos();
  }, []);


  useEffect(() => {

    procesaSelectProductos();
  }, [productos, options]);

  useEffect(() => {
    cambiaVenta(venta);
  }, [objCabVenta])

  useEffect(() => {
    if (venta != null && venta != undefined && venta != '') {
      realizaVenta(venta);
    }
  }, [venta])




  const handleChange = (e) => {

    let valueSelect = e.value;


    if (valueSelect != "-1") {
      let datosProd = valueSelect.split("/=/=/");
      let idProd = datosProd[0];
      let nombreProd = datosProd[1];
      let precioProd = datosProd[2];


      let objProd = {
        "id": idProd,
        "nombre": nombreProd,
        "precio": precioProd
      }

      setProductoDetalle(objProd);

    }


    if (valueSelect != "" && document.getElementById("txtCantidad").value != "") {
      document.getElementById("btnAddDetalle").classList.remove('buttonBlocked');
    } else {
      document.getElementById("btnAddDetalle").classList.add('buttonBlocked');
    }

  }

  const handleChangeCantidad = (e) => {

    const { name, value } = e.target;

    setProductoDetalle({ ...productoDetalle, cantidad: value });

    if (value != "" && document.querySelector('#cmbProds').innerText != "Select...") {
      document.getElementById("btnAddDetalle").classList.remove('buttonBlocked');
    } else {
      document.getElementById("btnAddDetalle").classList.add('buttonBlocked');
    }
  }

  const cambiaVenta = (ventaData) => {
    setVenta(ventaData);
  }


  const sumaCantDetalle = () => {

    document.getElementById("tbProductosDetalle").style.display = "";

    setCantidadDetalle(cantidadDetalle + 1);

    productosDetalle.push(productoDetalle);

  }

  const generaVenta = () => {

    if(!validaForm()){
      console.log("valida falso");
      return false;
    }else{
      console.log("valida true");
    }

    let objDetVenta = [];

    let producto = "";
    let precio = "";
    let cantidad = 0;
    console.log("sigue ejecutando genra")

    var tablaDetalle = document.getElementById("tbProductosDetalle");

    for (var i = 0, row; row = tablaDetalle.rows[i]; i++) {

      for (var j = 0, col; col = row.cells[j]; j++) {

        if (i > 0) {
          switch (j) {
            case 0:
              console.log("N°: " + col.innerText);
              break;
            case 1:
              console.log("Pord°: " + col.innerText);
              producto = col.innerText;
              break;
            case 2:
              console.log("prec°: " + col.innerText);
              precio = col.innerText;
              break;
            case 3:
              console.log("cant: " + col.innerText);
              cantidad = col.innerText;
              break;
            case 4:
              console.log("total: " + col.innerText);
              break;

            default:
              console.log("NoN");
              break;
          }
        }




      }

      if (i > 0) {
        let objDetalle = {
          producto,
          precio,
          cantidad
        }

        objDetVenta.push(objDetalle);
      }

    }

    objCabVenta = {
      "fecha_emision": document.getElementById("dtpickerFechEmi").value,
      "cliente": document.getElementById("txtCliente").value,
      "detalle": objDetVenta
    }

    console.log({ objCabVenta });
    console.log(objCabVenta);
    console.log(JSON.stringify(objCabVenta));

    setVenta(objCabVenta);



  }

  const validaForm = () => {

    let fechaEmision = document.getElementById("dtpickerFechEmi").value;
    let cliente = document.getElementById("txtCliente").value;
    let cantDetalles =  document.getElementById('tbodyProductosDetalle').rows.length;

    let errores = "";

    if(fechaEmision == ""){
      errores += '- Debe indicar una fecha de emisión \n';
    }

    if(cliente == ""){
      errores += '- Complete el campo cliente \n';
    }

    if(cantDetalles == 0){
      errores += '- Debe agregar al menos un detalle \n';
    }

    if(errores !== ""){
      mostrarAlerta("Error", errores, "error", 'Aceptar');
      return false;
    }else{
      return true;
    }

  }


  const mostrarAlerta = (title, text, icon, button) => {

    swal({
      title,
      text,
      icon,
      button,
    });

  }

  const mostrarAlerta2 = (title, text, icon, button) => {
    swal({
      title, //: "Mi titulo",
      text, //: "qwea",
      icon, //: "error",
      button,//buttons, //: ["No", "Si"]
      timer: "2000"
    }).then(respuesta => {
      if(respuesta){
        swal({
          text: "AAAsi",
          icon: "success",
          timer: "4000"
        })
      }
    })
  }


  return (
    <div className='container'>

      <h1>Realizar Venta</h1>
      <hr />
      <br />

      <div className="card">

        <div className="card-header cardVentaCabecera">
          Venta
        </div>

        <div className="card-body">
          <form>

            <div className="mb-3">
              <label className="form-label">Fecha: </label>
              <DatePicker id='dtpickerFechEmi' selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Cliente: </label>
              <input name='txtCliente' type="text" className="form-control" id="txtCliente" key="txtCliente" />
            </div>

          </form>
        </div>

        <div className="card-header cardVentaCabecera" style={{ backgroundColor: "#6A806D" }}>
          Detalle
        </div>

        <div className="card-body">





          <div className='container'>

            <div className='row'>
              <div className='col-md-5'>
                <p className="card-text ">Producto:</p>
              </div>

            </div>


            <div className='row mt-1'>
              <div className='col-md-5'>
                <Select id='cmbProds' defaultValue={"aa"} className='selectProductos' options={options} onChange={handleChange} />
              </div>

              <div className='col-md-2'>
                <div className="input-group mb-3">
                  <span className="input-group-text">Cantidad</span>
                  <input id='txtCantidad' type="text" className="form-control" onChange={handleChangeCantidad} aria-label="Dollar amount (with dot and two decimal places)" />
                </div>
              </div>

              <div className='col-md-5'>
                <button id='btnAddDetalle' className='btn btn-success buttonBlocked' onClick={sumaCantDetalle} >Agregar detalle</button>
              </div>



            </div>

          </div>

        </div>

        <br />

        <table id='tbProductosDetalle' className='table table-striped table-hover' style={{ display: "none" }}>
          <thead className="table-dark">
            <tr>
              <th>N°</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody id='tbodyProductosDetalle'>
            {
              productosDetalle.map(({ id, nombre, precio, cantidad }, index) => (
                <RowProductoVenta key={id} idProd={id} productoNombre={nombre} precio={precio} index={index + 1} cantidad={cantidad} />
              )

              )
            }
          </tbody>
        </table>


      </div>

      <br />

      <div className='row justify-content-center'>
        <div className='col-md-2'>
          <button className='btn btn-success' onClick={generaVenta}>Generar Venta</button>
        </div>
      </div>


    </div>


  )
}
