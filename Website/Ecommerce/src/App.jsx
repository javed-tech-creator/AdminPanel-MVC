import './App.css'
import Cart from './components/Cart'
import MainPage from './components/MainPage'
import {Routes,Route, Router} from 'react-router-dom'
import ProfilePage from './components/ProfilePage'
import DelihveryAddress from './components/DelihveryAddress'
import PaymentSuccess from './components/PaymentSuccess'
import {ToastContainer, toast} from "react-toastify";

function App() {

  return (
    <>
     <ToastContainer position="top-left"/>

    <Routes>
      <Route path="/" element={<MainPage/>} />  
      <Route path="/cart" element={<Cart/>} /> 
      <Route path="/profile" element={<ProfilePage/>} /> 
      <Route path='/address' element={<DelihveryAddress/>}/>
      <Route path='/payment/varification' element={<PaymentSuccess/>}/>
      </Routes>

      </>
  
  )
}

export default App
