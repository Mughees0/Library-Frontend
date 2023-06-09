import { redirect, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import useGoogleData from '../hooks/useGoogleData'
import useGoogleLogin from '../hooks/useGoogleLogin'
import { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { userSignin, userSignup } from '../redux/slices/userSlice'
import { Role } from '../types'
import LoginForm from '../components/LoginForm'

const Login = () => {
  const google = useGoogleLogin()
  const [user, ourToken] = useGoogleData()
  const navigate = useNavigate()
  const [roles, setRoles] = useState<Role>(Role.USER)
  const [usernameText, setUsernameText] = useState('')
  const [passwordText, setPasswordText] = useState('')

  const { data, token } = useSelector((state: RootState) => state.userData)

  const dispatch = useDispatch<AppDispatch>()

  function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(userSignup({ username: usernameText, password: passwordText, role: roles }))
  }
  function handleSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(userSignin({ username: usernameText, password: passwordText, role: roles }))
  }

  return (
    <>
      {!token && !ourToken ? (
        <div className=" flex flex-col justify-center items-center h-screen ">
          <LoginForm
            handleSignUp={handleSignup}
            handleSignIn={handleSignin}
            usernameText={usernameText}
            setUsernameText={setUsernameText}
            passwordText={passwordText}
            setPasswordText={setPasswordText}
            setRoles={setRoles}
          />
          {/* <div id="signIn"></div> */}
        </div>
      ) : (
        <>
          {navigate('/')}
          {navigate(0)}
        </>
      )}
    </>
  )
}

export default Login
