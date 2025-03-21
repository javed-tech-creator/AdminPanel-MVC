import './App.css'
import Cart from './components/Cart'
import MainPage from './components/MainPage'
import {Routes,Route, Router} from 'react-router-dom'
import ProfilePage from './components/ProfilePage'

function App() {

  return (
    
    <Routes>
      <Route path="/" element={<MainPage/>} />  
      <Route path="/cart" element={<Cart/>} /> 
      <Route path="/profile" element={<ProfilePage/>} /> 
      </Routes>

   
  
  )
}

export default App
