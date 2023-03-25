import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGoogleData from '../hooks/useGoogleLogin'
import { fetchUser } from '../redux/slices/userSlice'
import { AppDispatch, RootState } from '../store'

const Login = () => {
  const user = useSelector((state: RootState) => state.userData.data)
  const dispatch = useDispatch<AppDispatch>()
  const google = useGoogleData()
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUser())
    const items = localStorage.getItem('token')
    if (items) {
      setToken(items)
    }
  }, [token])

  return (
    <>
      {!token ? (
        <div className="bg-yellow flex justify-center items-center h-screen w-screen">
          <button id="signIn"></button>
        </div>
      ) : (
        <>{navigate('/')}</>
      )}
    </>
  )
}

export default Login
