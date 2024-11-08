import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ShowRestaurant from './components/ShowRestaurant';
import CreateRestaurant from './components/CreateRestaurant';
import EditRestaurant from './components/EditRestaurant';


function App() {
  return (
    <div className="App">
      <h1>Hola Restaurants!</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <ShowRestaurant/>}></Route>
          <Route path='/CreateRestaurant' element={ <CreateRestaurant/>}>Crear</Route>
          <Route path='/EditRestaurant/:id' element={ <EditRestaurant/>}>Editar</Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
