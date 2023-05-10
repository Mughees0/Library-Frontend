import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { Book, Role, UserReq, UserRes, UserState } from '../../types'
import axios from 'axios'

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
  const res = await axios.post('http://localhost:8080/api/v1/user/signup', {
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
  const res = await axios.post('http://localhost:8080/api/v1/user/signin', {
    username: object.username,
    password: object.password,
    role: object.role
  })
  const user: string = await res.data
  console.log(user)

  return {
    user
  }
})

export const fetchBooks = createAsyncThunk('books/fetch', async () => {
  const res = await fetch(`http://localhost:8080/api/v1/book/all`)
  const books: Book[] = await res.json()
  console.log(books)

  return {
    books,
    error: null
  }
})

export const updateBook = createAsyncThunk('books/update', async (updatedObject: Book) => {
  return {
    updatedObject
  }
})

export const addBook = createAsyncThunk('books/add', async (addedObject: Book) => {
  return {
    addedObject
  }
})

export const filterBookByName = createAsyncThunk('books/filterName', async (name: string) => {
  return {
    name
  }
})
export const filterBookByAuthor = createAsyncThunk('books/filterAuthor', async (name: string) => {
  return {
    name
  }
})

export const deleteBook = createAsyncThunk('books/delete', async (id: number) => {
  return {
    id
  }
})

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetching data
    builder.addCase(userSignup.fulfilled, (state, action) => {
      state.data = action.payload.user
    })
    builder.addCase(userSignin.fulfilled, (state, action) => {
      state.token = action.payload.user
      localStorage.setItem('token', state.token)
    })
  }
})

export default userSlice.reducer
