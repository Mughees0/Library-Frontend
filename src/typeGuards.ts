import { Decoded } from './types'

export function isDecodedUser(obj: unknown): obj is Decoded {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'username' in obj &&
    'role' in obj &&
    'user_id' in obj
  )
}
