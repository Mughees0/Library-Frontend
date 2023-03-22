/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { addData, UserData } from '../../features/login/loginDataSlice'
import MainPage from '../mainPage/MainPage'
import useGoogleData from '../../hook/useGoogleData'

export interface loginProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const Login = ({ setToggle }: loginProps) => {
  const person = useSelector((state: RootState) => state.userData.data)
  const dispatch = useDispatch()
  const data = useGoogleData()
  console.log('the person data', person)
  dispatch(addData(data))
  if (person.exp > 0) {
    setToggle(false)
  } else {
    setToggle(true)
  }

  return (
    <Fragment>
      <div className="container mx-auto flex items-center h-screen justify-center bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-sky-500">
        <button id="signIn"></button>
      </div>
    </Fragment>
  )
}

export default Login
