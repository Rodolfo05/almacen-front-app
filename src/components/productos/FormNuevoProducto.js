import React, { useState } from 'react'

export const FormNuevoProducto = ({ handleSubmit, datosProducto, formAction }) => {

  const [valorForm, setValorForm] = useState(datosProducto ? datosProducto : {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValorForm({ ...valorForm, [name]: value });
  }

  const _handleSubmit = (e) => {
    e.preventDefault();

    handleSubmit({ ...valorForm });
  }

  return (
    <form id={formAction} onSubmit={_handleSubmit}>

      <div className="mb-3">
        <label className="form-label">Nombre: </label>
        <input name='nombre' type="text" className="form-control" id="txtNombre" key="txtNombre" value={valorForm.nombre} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción: </label>
        <input name='descripcion' type="text" className="form-control" id="txtDescripcion" key="txtDescripcion" value={valorForm.descripcion} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Precio: </label>
        <input name='precio' type="text" className="form-control" id="txtPrecio" key="txtPrecio " value={valorForm.precio} onChange={handleChange} />
      </div>

    </form>
  )
}
