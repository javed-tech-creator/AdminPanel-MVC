import './App.css'
import Cart from './components/Cart'
import MainPage from './components/MainPage'
import {Routes,Route, Router} from 'react-router-dom'
import ProfilePage from './components/ProfilePage'
import DelihveryAddress from './components/DelihveryAddress'

function App() {

  return (
    
    <Routes>
      <Route path="/" element={<MainPage/>} />  
      <Route path="/cart" element={<Cart/>} /> 
      <Route path="/profile" element={<ProfilePage/>} /> 
      <Route path='/address' element={<DelihveryAddress/>}/>
      </Routes>

   
  
  )
}

export default App
