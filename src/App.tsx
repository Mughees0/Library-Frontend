import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import UserLibrary from './pages/userLibrary'
import Admin from './pages/Admin'
import Footer from './components/Footer'
import Navbar from './components/Nav'
import { useGoogleData } from './hooks/useGoogleData'
import Home from './pages/Home'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import useGoogleLogin from '../hooks/useGoogleLogin'
import { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { Decoded } from './types'
import BookDetails from './pages/BookDetails'
import UserProfile from './pages/UserProfile'
import BookCopies from './pages/BookCopies'

export const ADMIN_WHITELIST = ['abdul.mughees009@gmail.com']

function App() {
  const [user, token] = useGoogleData()
  const mytoken = localStorage.getItem('token')
  let decoded: Decoded

  if (mytoken) {
    decoded = jwtDecode(mytoken)
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<UserLibrary />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
          {decoded?.role == 'USER' || decoded?.role == 'ADMIN' ? (
            <Route path="/user/:userId" element={<UserProfile />} />
          ) : (
            <></>
          )}
          {decoded?.role == 'ADMIN' || user?.email == 'abdul.mughees009@gmail.com' ? (
            <Route>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/copies" element={<BookCopies />} />
            </Route>
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
