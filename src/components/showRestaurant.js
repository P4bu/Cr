import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs,getDoc, deleteDoc  } from 'firebase/firestore' 
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const ShowRestaurant = () => {

    // 1. configurar hooks
    const [restaurants, setRestaurants] = useState( [] )

    // 2. referenciar a la base de datos
    const restaurantsCollection =  collection(db, "restaurants")
    // 3. funcion para mostrar todos los doc
    const getRestaurants = async() => {
       const data = await getDocs(restaurantsCollection)
       // console.log(data.docs)
       setRestaurants(
        data.docs.map( (doc) => ( {...doc.data(), id:doc.id}))
       )
       console.log(restaurants) 
    }
    // 4. funcion para eliminar doc
    const deleteRestaurant = async (id) => {
       const restaurantDoc = doc(db, "restaurants", id)
       await deleteDoc(restaurantDoc)
       getRestaurants()
    }
    // 5. funcion para sweetAlert
    // 6. usamos useEffect
    useEffect( () => {
        getRestaurants()
    }, [])
    // 7. devolvemos la lista de nuesto componente


  return (
    <>
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <div className='d-grid gap-2'>
                    <Link to="/CreateRestaurant" className='btn btn-secondary mt-2 mb-2'>Create</Link>
                </div>

                <table className='table table-light table-hover'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Fecha de Creacion</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { restaurants.map( (restaurant) => {
                            <tr key={restaurant.id}>
                                <td>{restaurant.nombre_restaurant}</td>
                                <td>{restaurant.fecha_creacion}</td>
                                <td>{restaurant.activo}</td>
                                <td>
                                    <link to={`/CreateRestaurant/${restaurant.id}`} className='btn btn-light'><i className="fa-thin fa-comment-pen"></i></link>
                                    <button onClick={() => deleteRestaurant(restaurant.id)} className='btn btn-danger'><i className="fa-solid fa-comment-xmark"></i></button>
                                </td>
                            </tr>
                        }) }
                    </tbody>
                </table>

            </div>    
        </div>
    </div>
    </>
  )
}

export default ShowRestaurant