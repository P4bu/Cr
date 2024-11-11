import React, { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc, Timestamp } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const EditRestaurant = () => {

  const [nombre_restaurant, setNombreRestaurant] = useState('')
  const [fecha_creacion, setFechaCreacion] = useState('')
  const [activo, setActivo] = useState(null) 

  const navigate = useNavigate()
  const {id} = useParams()

  const update = async (e) => {
    e.preventDefault()
    const fechaUTC = fecha_creacion ? new Date(fecha_creacion + 'T00:00:00Z') : null
    const fechaTimestamp = fechaUTC ? Timestamp.fromDate(fechaUTC) : null
    const restaurant = doc(db, 'restaurants', id)
    const data = {
      nombre_restaurant: nombre_restaurant, 
      fecha_creacion: fechaTimestamp, 
      activo: activo
    }
    await updateDoc(restaurant, data)
    navigate('/')
  }

  const getRestaurantById = async (id) => {
    const restaurant = await getDoc(doc(db, 'restaurants', id))
    if(restaurant.exists()){
      //console.log(restaurant.data())
      const data = restaurant.data()
      setNombreRestaurant(data.nombre_restaurant)

      if(data.fecha_creacion instanceof Timestamp) {
        const localDate = data.fecha_creacion.toDate()
        const localISOString = localDate.toDateString().split('T')[0]
        setFechaCreacion(localISOString)
      } else {
        setFechaCreacion('')
      }
      setActivo(data.activo)
    } else{
      //console.log('no existe el producto')
    }
  }

  useEffect( () => {
    getRestaurantById(id)
  }, [])

  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Añadir Restaurante</h1>
          <form onSubmit={update}>
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
              <label className='form-label'>Fecha de Creación</label>
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
    </>
  )
}

export default EditRestaurant