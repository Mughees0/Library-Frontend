import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { User, Response } from '../types'
import { useNavigate } from 'react-router-dom'

const useGoogleLogin = () => {
  const navigate = useNavigate()

  function handleCallbackResponse(response: Response) {
    const userObject: User = jwt_decode(response.credential)
    if (response.credential) {
      localStorage.setItem('token', response.credential)
      if (userObject.email === 'abdul.mughees009@gmail.com') {
        navigate('/')
      } else {
        navigate('/')
      }
    }
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: '1096442355869-9ukv8bd315n3sa8lm8jast2tr33ukig7.apps.googleusercontent.com',
      callback: handleCallbackResponse
    })

    window.google.accounts.id.renderButton(document.querySelector('#signIn'), {
      theme: 'outline',
      size: 'large'
    })

    window.google.accounts.id.prompt()
  })
}

export default useGoogleLogin
