import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from "./pages/Signup";
import { Toaster } from 'react-hot-toast'
import Drawing from './pages/Drawing'
import Notes from './pages/Notes'
import Services from "./pages/Services";
import Estimate from './pages/Estimate'
import EmailVerify from './pages/EmailVerify'
import PasswordReset from './pages/PasswordReset'
import UploadDoc from './admin/UploadDoc'
import { useSelector } from 'react-redux'
import PageNotFound from './pages/PageNotFound'
import PackageItemUpload from './admin/PackageItemUpload'
function App() {
  const userData = useSelector((state) => state.user)
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/upload-doc' element={import.meta.env.VITE_EMAIL_ID === userData.email ? <UploadDoc /> : <PageNotFound />} />
        <Route path='/upload-package-item' element={import.meta.env.VITE_EMAIL_ID === userData.email ? <PackageItemUpload /> : <PageNotFound />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='services' element={<Services />} />
        <Route path='/drawing' element={<Drawing />} />
        <Route path='/estimate' element={<Estimate />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<PasswordReset />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App