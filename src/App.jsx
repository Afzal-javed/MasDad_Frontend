import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from "./pages/Signup";
import { Toaster } from 'react-hot-toast'
import UploadDoc from './pages/UploadDoc'
import Drawing from './pages/Drawing'
import Notes from './pages/Notes'
import Services from "./pages/Services";
import Estimate from './pages/Estimate'
function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='upload-doc' element={<UploadDoc />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='services' element={<Services />} />
        <Route path='/drawing' element={<Drawing />} />
        <Route path='/estimate' element={<Estimate />} />
      </Routes>
    </div>
  )
}

export default App