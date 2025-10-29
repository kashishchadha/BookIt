
import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card'
import {BrowserRouter,Route,Routes} from  "react-router"
import MainPage from './pages/MainPage'
import MainLayout from './components/MainLayout'
import Details from './pages/Details'

function App() {

  return (
    <div className='p-0 m-0'>
    <BrowserRouter>
    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/details" element={<Details/>}/>
    
    </Route>
             

   </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
