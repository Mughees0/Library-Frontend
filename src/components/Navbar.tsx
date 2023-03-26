import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearUser, fetchUser } from '../redux/slices/userSlice'
import { AppDispatch, RootState } from '../store'
import logo from '../assets/logo.png'

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
    <>
      <nav className="h-16  bg-black">
        <ul className="flex h-full justify-between items-center text-white ">
          <li className="flex items-center justify-between text-white hover:underline">
            <img className="h-12 ml-4" src={logo} />
            Book Byte
          </li>
          <div className="flex h-16 items-center">
            <li className="hover:bg-custom-greenish h-full flex items-center w-20 justify-center">
              <a href="/">Home</a>
            </li>
            {user[0].email === 'abdul.mughees009@gmail.com' ? (
              <li className="hover:bg-custom-greenish h-full flex items-center w-20 justify-center">
                <a href="/admin">Admin</a>
              </li>
            ) : (
              <></>
            )}
            <li className=" hover:bg-custom-greenish h-full flex items-center mr-3">
              {!token ? (
                <a className="mx-4 " href="/login">
                  Login
                </a>
              ) : (
                <div className="px-3 flex gap-3 w-full justify-between text-white">
                  <img className="h-8 rounded-full" src={user[0].picture} alt="Profile Picture" />
                  <button
                    id="signOut"
                    onClick={() => {
                      dispatch(clearUser())
                      localStorage.clear()
                      navigate('/')
                      location.reload()
                    }}>
                    Sign Out
                  </button>
                </div>
              )}
            </li>
          </div>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
