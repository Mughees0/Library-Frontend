import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { Role, UserReq, UserRes, UserState } from '../../types'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { getDecodedTokenFromStorage } from '../../utils/token'

const initialState: UserState = {
  isLoading: false,
  error: '',
  msg: '',
  token: '',
  data: {
    id: '',
    username: '',
    role: Role.USER
  }
}

export const userSignup = createAsyncThunk('user/signup', async (object: UserReq) => {
  const res = await axios.post('https://library-backend-gtgw.onrender.com/api/v1/user/signup', {
    username: object.username,
    password: object.password,
    role: object.role
  })
  const user: UserRes = await res.data
  console.log(user)

  return {
    user
  }
})

export const userSignin = createAsyncThunk('user/signin', async (object: UserReq) => {
  const res = await axios.post('https://library-backend-gtgw.onrender.com/api/v1/user/signin', {
    username: object.username,
    password: object.password,
    role: object.role
  })
  const token: string = await res.data
  console.log(token)

  return {
    token
  }
})

// export const fetchBooks = createAsyncThunk('books/fetch', async () => {
//   const res = await fetch(`http://localhost:8080/api/v1/book/all`)
//   const books: [] = await res.json()
//   console.log(books)

//   return {
//     books,
//     error: null
//   }
// })

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    loadUserFromStorage: (state) => {
      const user = getDecodedTokenFromStorage()
      if (user) {
        state.data = user
      }
    }
  },
  extraReducers: (builder) => {
    // fetching data
    builder.addCase(userSignup.fulfilled, (state, action) => {
      state.data = action.payload.user
    })
    builder.addCase(userSignin.fulfilled, (state, action) => {
      const token = action.payload.token
      const decodedUser = jwtDecode(token) as UserRes
      localStorage.setItem('token', token)

      const user: UserRes = {
        username: decodedUser.username,
        id: decodedUser.id,
        role: decodedUser.role
      }
      state.token = action.payload.token
      localStorage.setItem('token', action.payload.token)
      state.data = user
    })
  }
})

export default userSlice.reducer
