import { useEffect } from 'react'
import { Response } from '../types'
import { useNavigate } from 'react-router-dom'

declare global {
  interface Window {
    google: any
  }
}
const useGoogleLogin = () => {
  const navigate = useNavigate()

  function handleCallbackResponse(response: Response) {
    if (response.credential) {
      localStorage.setItem('token', response.credential)
    }
    navigate('/')
    location.reload()
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: '1096442355869-9ukv8bd315n3sa8lm8jast2tr33ukig7.apps.googleusercontent.com',
      callback: handleCallbackResponse
    })

    window.google.accounts.id.renderButton(document.querySelector('#signIn'), {
      // type: 'icon',
      // shape: 'circle',
      theme: 'outline',
      text: 'signin',
      size: 'medium'
    })

    // window.google.accounts.id.prompt()
  })
}

export default useGoogleLogin
