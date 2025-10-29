
import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import MainLayout from './components/MainLayout'
import Details from './pages/Details'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirm'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <div className='p-0 m-0'>
    <BrowserRouter>
    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/details/:id" element={<Details/>}/>
  <Route path="/checkout" element={<Checkout/>}/>
  <Route path="/confirmation" element={<ProtectedRoute><Confirmation/></ProtectedRoute>}/>
    
    
    </Route>
             

   </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
