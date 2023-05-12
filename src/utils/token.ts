import jwt_decode from 'jwt-decode'

import { isDecodedUser } from '../typeGuards'
import { UserRes } from '../types'

export function getDecodedTokenFromStorage() {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const decodedUser: UserRes = jwt_decode(token)
    if (!isDecodedUser(decodedUser)) return null

    const user: UserRes = {
      username: decodedUser.username,
      id: decodedUser.user_id,
      role: decodedUser.role
    }

    return user
  } catch (error) {
    return null
  }
}

export function getTokenFromStorage() {
  const token = localStorage.getItem('token')
  if (!token) return null

  return token
}
