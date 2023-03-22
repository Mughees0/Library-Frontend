import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { UserData } from '../features/login/loginDataSlice'

export interface Response {
  clientId: string
  client_id: string
  credential: string
  select_by: string
}

const useGoogleData = (): UserData => {
  const [data, setData] = useState({
    aud: '',
    azp: '',
    email: '',
    email_verified: false,
    exp: 0,
    family_name: '',
    given_name: '',
    hd: '',
    iat: 0,
    iss: '',
    jti: '',
    name: '',
    nbf: 0,
    picture: '',
    sub: ''
  })
  console.log(data)

  function handleCallbackResponse(response: Response) {
    const userObject: UserData = jwt_decode(response.credential)
    setData(userObject)
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
  }, [])
  return data
}

export default useGoogleData
