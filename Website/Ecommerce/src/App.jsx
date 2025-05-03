import './App.css'
import Cart from './components/Cart'
import MainPage from './components/MainPage'
import {Routes,Route, Router} from 'react-router-dom'
import ProfilePage from './components/ProfilePage'
import DelihveryAddress from './components/DelihveryAddress'
import PaymentSuccess from './components/PaymentSuccess'
import {ToastContainer, toast} from "react-toastify";
import { useContext } from 'react'
import { cartData } from './store/Cart-data-store'

function App() {
const {authUser} = useContext(cartData)
  return (
    <>
     <ToastContainer position="top-left"/>

    <Routes>
      <Route path="/" element={<MainPage/>} />  
      <Route path="/cart" element={authUser ? <Cart/> : <MainPage/>} /> 
      <Route path="/profile" element={authUser ? <ProfilePage/>: <MainPage/>} /> 
      <Route path='/address' element={authUser ? <DelihveryAddress/>: <MainPage/>}/>
      <Route path='/payment/varification' element={authUser ?<PaymentSuccess/>: <MainPage/>}/>
      </Routes>

      </>
  
  )
}

export default App
