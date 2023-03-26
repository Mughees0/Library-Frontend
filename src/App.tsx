import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import UserLibrary from './pages/userLibrary'
import Admin from './pages/Admin'
import Footer from './components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'
import { fetchUser } from './redux/slices/userSlice'
import { useEffect } from 'react'
import Navbar from './components/Navbar'

function App() {
  const user = useSelector((state: RootState) => state.userData.data)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-400 text-center">
        <Routes>
          <Route path="/" element={<UserLibrary />} />
          <Route path="/login" element={<Login />} />
          {user[0].email === 'abdul.mughees009@gmail.com' ? (
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
