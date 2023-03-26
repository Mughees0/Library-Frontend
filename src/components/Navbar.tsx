import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearUser, fetchUser } from '../redux/slices/userSlice'
import { AppDispatch, RootState } from '../store'
import logo from '../assets/logo.jpg'

const Navbar = () => {
  const user = useSelector((state: RootState) => state.userData.data)
  const dispatch = useDispatch<AppDispatch>()
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUser())
    const items = localStorage.getItem('token')
    if (items) {
      setToken(items)
    }
  }, [user, token])

  return (
    <nav className="h-12 outline">
      <ul className="flex justify-between items-center ">
        <li className="flex items-center justify-between w-32">
          <img className="h-12 pl-4" src={logo} /> e-Books
        </li>
        <li>
          <a href="/"></a>
        </li>
        <li className="pr-6">
          {!token ? (
            <a href="/login">Login</a>
          ) : (
            <div className="flex w-[6.5rem] justify-between">
              <img className="h-8 rounded-full" src={user[0].picture} alt="Profile Picture" />
              <button
                id="signOut"
                onClick={() => {
                  dispatch(clearUser())
                  localStorage.clear()
                  navigate('/login')
                }}>
                Sign Out
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
