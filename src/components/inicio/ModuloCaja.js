import React from 'react'
import img from '../../images/productsIcon.png'

export const ModuloCaja = ({titulo = "No Disponible", url = ""}) => {

  const redirecciona = () => {
    console.log("first")
    window.location.href="/"+url;
  }

  return (
    <div onClick={redirecciona} className="card moduloCaja text-center">
    <div className="card-body">
      <h5 className="card-title">{titulo}</h5>
      <img className='imgModuloCaja' src={img}></img>
    </div>
  </div>
  )
}
