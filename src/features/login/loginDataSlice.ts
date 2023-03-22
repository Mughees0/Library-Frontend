import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type UserData = {
  aud: string
  azp: string
  email: string
  email_verified: boolean
  exp: number
  family_name: string
  given_name: string
  hd: string
  iat: number
  iss: string
  jti: string
  name: string
  nbf: number
  picture: string
  sub: string
}

export type UserDataState = {
  data: UserData
}

const initialState: UserDataState = {
  data: {
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
  }
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload
    }
  }
})

export const { addData } = userDataSlice.actions

export default userDataSlice.reducer
