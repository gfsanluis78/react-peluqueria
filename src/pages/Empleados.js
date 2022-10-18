import React,{useState, useEffect} from 'react'
import axios from 'axios';
import {GetAllEmpleados} from "../Components/Consultas/Empleados/getAllEmpleados"

const baseUrl='http://localhost:3001/'


function empleados() {


  return (
    <div className='empleados'>
      <GetAllEmpleados/>
    </div>
  )
}

export default empleados
