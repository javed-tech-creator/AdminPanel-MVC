import {Routes,Route} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import Dashboard from './components/Dashboard'
import DashboardProtected from './components/authentication/DashboardProtected'

function App() {

  return (
    <>
  <Routes>
    <Route path='/' element={<SignupPage/>} />
    <Route path='/login' element={<LoginPage/>} />
    <Route path='/dashboard' element={<DashboardProtected><Dashboard/></DashboardProtected> } />
  </Routes>
    </>
  )
}

export default App
