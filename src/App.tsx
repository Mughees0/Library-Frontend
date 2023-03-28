import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import UserLibrary from './pages/userLibrary'
import Admin from './pages/Admin'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { useGoogleData } from './hooks/useGoogleData'

export const ADMIN_WHITELIST = ['abdul.mughees009@gmail.com']

function App() {
  const [user, token] = useGoogleData()

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-400 text-center">
        <Routes>
          <Route path="/" element={<UserLibrary />} />
          <Route path="/login" element={<Login />} />
          {ADMIN_WHITELIST.includes(user.email) ? (
            <Route path="/admin" element={<Admin />} />
          ) : (
            <Route
              path="/admin"
              element={
                <>
                  <Navbar />
                  <div className="flex h-screen w-screen justify-center items-center">
                    <h1>NOT LOGGED IN AS ADMIN</h1>
                  </div>
                </>
              }
            />
          )}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
