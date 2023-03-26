import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import UserLibrary from './pages/userLibrary'
import Admin from './pages/Admin'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col text-center">
        <div className="  bg-yellow-100">
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<UserLibrary />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
