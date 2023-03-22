import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/loginPage/Login'
import MainPage from './components/mainPage/MainPage'
import ReturnBook from './components/returnBook/ReturnBook'
import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { addData, UserData } from './features/login/loginDataSlice'
import GoogleData from './hook/useGoogleData'

export interface loginProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

function App() {
  const [toggle, setToggle] = useState(true)
  const person = useSelector((state: RootState) => state.userData.data)
  console.log(toggle)

  return <div className="App">{toggle ? <Login setToggle={setToggle} /> : <MainPage />}</div>
}

export default App
