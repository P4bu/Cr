import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, Timestamp } from 'firebase/firestore' 
import { db } from '../firebaseConfig/firebase' 

const CreateRestaurant = () => {
  // 1. Configuración de Hooks
  const [nombre_restaurant, setNombreRestaurant] = useState('')
  const [fecha_creacion, setFechaCreacion] = useState('')
  const [activo, setActivo] = useState(null) 
  const navigate = useNavigate()

  const restaurantCollection = collection(db, 'restaurants')

  const store = async (e) => {
    e.preventDefault()

    
    if (!nombre_restaurant || !fecha_creacion || activo === undefined) {
      alert("Por favor, complete todos los campos.")
      return
    }

    
    const timestamp = fecha_creacion ? Timestamp.fromDate(new Date(fecha_creacion)) : null

    try {
      
      await addDoc(restaurantCollection, {
        nombre_restaurant: nombre_restaurant,
        fecha_creacion: timestamp, 
        activo: activo, 
      })

      
      setNombreRestaurant('')
      setFechaCreacion('')
      setActivo(false)

      
      navigate('/')
    } catch (error) {
      console.error("Error al guardar el restaurante:", error)
      alert("Hubo un problema al guardar el restaurante. Inténtalo de nuevo.")
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Añadir Restaurante</h1>
          <form onSubmit={store}>
            <div className='mb-3'>
              <label className='form-label'>Nombre Restaurante</label>
              <input
                value={nombre_restaurant}
                onChange={(e) => setNombreRestaurant(e.target.value)} 
                type="text"
                className='form-control'
              />
            </div>  
            <div className='mb-3'>
              <label className='form-label'>Fecha Creación</label>
              <input
                value={fecha_creacion}
                onChange={(e) => setFechaCreacion(e.target.value)}
                type="date"
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Estado</label>
              <select
                value={activo}
                onChange={(e) => setActivo(e.target.value === 'true')}
                className='form-control'
              >
                <option value="">Seleccione una opción</option>
                <option value={true}>Activo</option>
                <option value={false}>Cerrado</option>
              </select>
            </div>    
            <button type='submit' className='btn btn-primary'>Guardar</button>
          </form>   
        </div>
      </div>
    </div> 
  )
}

export default CreateRestaurant
