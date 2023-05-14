import React from 'react'
import { ModuloCaja } from './inicio/ModuloCaja'

export const InicioApp = () => {
  return (
    <div>
      InicioApp

      <div className='container'>
    


        <div className='row d-flex justify-content-center'>
          <div className='col-md-2'>
            <ModuloCaja titulo={"Realizar Venta"} url={"realizarVentas"} />
          </div>
          <div className='col-md-2'>
          <ModuloCaja titulo={"Mantenedor de Productos"} url={"productos"}/>
          </div>
          <div className='col-md-2'>
          <ModuloCaja/>
          </div>
          <div className='col-md-2'>
          <ModuloCaja/>
          </div>
        </div>

        <div className='row d-flex justify-content-center'>
          <div className='col-md-2'>
            <ModuloCaja />
          </div>
          <div className='col-md-2'>
          <ModuloCaja/>
          </div>
          <div className='col-md-2'>
          <ModuloCaja/>
          </div>
          <div className='col-md-2'>
          <ModuloCaja/>
          </div>
        </div>

      </div>
    </div>

  )
}
