import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
// import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useGoogleData } from '../hooks/useGoogleData'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import useGoogleLogin from '../hooks/useGoogleLogin'
import { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { Decoded } from '../types'

const Nav = () => {
  const navigate = useNavigate()
  const google = useGoogleLogin()
  const [user, token] = useGoogleData()

  const mytoken = localStorage.getItem('token')
  let decoded: Decoded

  if (mytoken) {
    decoded = jwtDecode(mytoken)
    console.log(decoded.role)
  } else {
    decoded = jwtDecode(
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtdWdoZWVzMSIsInJvbGUiOiJVU0VSIiwidXNlcl9pZCI6IjlhOWNjYTUxLWE3MDAtNDA5ZS1hY2I4LTZjZDgxMmJkZThiMCIsImV4cCI6MTY4MzczNjg4OSwiaWF0IjoxNjgzNzAwODg5LCJ1c2VybmFtZSI6Im11Z2hlZXMxIn0.rKcl6rPecmoLC_Yh9sPTghzVYV8sHtyouGJjXcEkBDA'
    )
    console.log(decoded.role)
  }

  return (
    <>
      <nav className="bg-gray-600 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <img src={logo} className="h-8 mr-3" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">Mr. Books</span>
          </a>
          <div className="flex items-center md:order-2">
            {!token ? (
              <Link to="/login">Login</Link>
            ) : (
              <div className="px-3 flex gap-3 w-full justify-between text-white">
                <button
                  type="button"
                  className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom">
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 rounded-full" src={user.picture} alt="user photo" />
                </button>
              </div>
            )}

            <div
              className="z-50 hidden my-4 text-white text-base list-none bg-gray-700 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown">
              <div className="px-4 py-3">
                <span className="block text-sm pb-1 ">{user.name}</span>
                <span className="block text-sm  text-gray-200 truncate dark:text-gray-400">
                  {user.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    to="#"
                    onClick={() => {
                      localStorage.clear()
                      navigate('/')
                      location.reload()
                    }}
                    className="block px-4 py-2 text-sm  hover:bg-gray-600 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-200 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-2">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-600  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent  md:p-0 
                  md:hover:text-yellow-400 md:dark:text-blue-500"
                  aria-current="page">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/library"
                  className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-400 md:p-0  ">
                  Library
                </Link>
              </li>
              {decoded.role == 'ADMIN' || user.email === 'abdul.mughees009@gmail.com' ? (
                <li>
                  <Link
                    className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-400 md:p-0  "
                    to="/admin">
                    Admin
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* <Navbar fluid={true} className="bg-slate-700">
        <Navbar.Brand href="/">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="mr. Books Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold">Mr. Books</span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            className="bg-slate-700"
            arrowIcon={false}
            inline={true}
            label={<Avatar alt="User settings" img={user.picture} rounded={true} />}>
            <Dropdown.Header>
              <span className="block text-white text-sm">{user.name}</span>
              <span className="block text-white truncate text-sm font-medium">{user.email}</span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item
              className="text-white"
              onClick={() => {
                localStorage.clear()
                navigate('/')
                location.reload()
              }}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link className="text-white" href="/">
            Home
          </Navbar.Link>
          <Navbar.Link className="text-white" href="/library">
            Library
          </Navbar.Link>
          {user.email === 'abdul.mughees009@gmail.com' ? (
            <Navbar.Link className="text-white" href="/admin">
              Admin
            </Navbar.Link>
          ) : (
            <></>
          )}
        </Navbar.Collapse>
      </Navbar> */}
    </>
  )
}

export default Nav
