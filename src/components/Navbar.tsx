import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearUser, fetchUser } from '../redux/slices/userSlice'
import { AppDispatch, RootState } from '../store'
import logo from '../assets/logo.png'
import jwtDecode from 'jwt-decode'
import { Response, User } from '../types'
import useGoogleData from '../hooks/useGoogleData'

const Navbar = () => {
  const navigate = useNavigate()
  const [user, token] = useGoogleData()

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
            {user.email === 'abdul.mughees009@gmail.com' ? (
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
                  <img className="h-8 rounded-full" src={user.picture} alt="Profile Picture" />
                  <button
                    id="signOut"
                    onClick={() => {
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
