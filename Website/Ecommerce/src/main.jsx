import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import CartItemsStore from './store/Cart-data-store.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <CartItemsStore>
     <App />
     </CartItemsStore>
     </BrowserRouter>
  
)
