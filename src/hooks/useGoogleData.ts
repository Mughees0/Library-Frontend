import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { User } from '../types'

export const useGoogleData = (): [user: User, token: string] => {
  const [user, setUser] = useState<User>({
    iss: '',
    nbf: 0,
    aud: '',
    sub: '',
    email: '',
    email_verified: true,
    azp: '',
    name: '',
    picture: '',
    given_name: '',
    family_name: '',
    iat: 0,
    exp: 0,
    jti: '',
    id: 0
  })
  const [token, setToken] = useState('')
  const items = localStorage.getItem('token')
  const response: string = localStorage.getItem('token')

  useEffect(() => {
    if (items) {
      setUser(jwtDecode(response))
      setToken(items)
    }
  }, [token])
  return [user, token]
}
export default useGoogleData
