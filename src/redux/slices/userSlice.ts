import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Book, BookState, User, UserState } from '../../types'

const initialState: UserState = {
  isLoading: false,
  error: null,
  msg: '',
  data: [
    {
      iss: '',
      nbf: 0,
      aud: '',
      sub: '',
      email: '',
      email_verified: false,
      azp: '',
      name: '',
      picture: '',
      given_name: '',
      family_name: '',
      iat: 0,
      exp: 0,
      jti: '',
      id: 0
    }
  ]
}

export const fetchUser = createAsyncThunk('user/fetch', async () => {
  const res = await fetch(`http://localhost:8080/User`)
  const user: User[] = await res.json()
  return {
    user,
    error: null
  }
})

export const clearUser = createAsyncThunk('user/clear', async () => {
  const res = await fetch('http://localhost:8080/User/' + 0, {
    method: 'PUT',
    body: JSON.stringify({
      iss: '',
      nbf: 0,
      aud: '',
      sub: '',
      email: '',
      email_verified: false,
      azp: '',
      name: '',
      picture: '',
      given_name: '',
      family_name: '',
      iat: 0,
      exp: 0,
      jti: ''
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const msg: User[] = await res.json()
  // console.log(msg);

  return {
    msg
  }
})

export const updateUser = createAsyncThunk('user/update', async (object: User) => {
  const res = await fetch('http://localhost:8080/User/' + 0, {
    method: 'PUT',
    body: JSON.stringify({
      iss: object.iss,
      nbf: object.nbf,
      aud: object.aud,
      sub: object.sub,
      email: object.email,
      email_verified: object.email_verified,
      azp: object.azp,
      name: object.name,
      picture: object.picture,
      given_name: object.given_name,
      family_name: object.family_name,
      iat: object.iat,
      exp: object.exp,
      jti: object.jti
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const msg = await res.json()
  return {
    msg: 'Updated'
  }
})

export const userDataSlice = createSlice({
  name: 'bookData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetching data
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUser.rejected, (state) => {
      state.isLoading = false
      state.error = 'something went wrong'
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload.user
    })
    // updating data
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(clearUser.fulfilled, (state, action) => {
      state.isLoading = false
    })
  }
})
export const {} = userDataSlice.actions
export default userDataSlice.reducer
