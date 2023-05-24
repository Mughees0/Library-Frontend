import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Author, AuthorState } from '../../types'
import api from '../../api'
import { UUID } from 'crypto'

const initialState: AuthorState = {
  isLoading: false,
  error: null,
  msg: '',
  auhtors: [],
  author: {
    id: 0,
    authorName: '',
    email: '',
    phone: ''
  }
}

export const fetchAuthor = createAsyncThunk('author/fetch', async () => {
  try {
    const res = await api.get(`/author/all`)
    const authors: Author[] = await res.data
    return {
      authors
    }
  } catch (error) {
    console.log('Error:> ', error.message)
    throw error
  }
})

export const updateAuthor = createAsyncThunk('author/update', async (updatedObject: Author) => {
  try {
    const res = await api.put(`/author/update/${updatedObject.id}`, {
      authorName: updatedObject.authorName,
      email: updatedObject.email,
      phone: updatedObject.phone
    })
    const author: Author = await res.data
    console.log(author)
    return {
      author
    }
  } catch (error) {
    console.log('Error:> ', error.message)
    throw error
  }
})
export const addAuthor = createAsyncThunk('author/add', async (addedObject: Author) => {
  try {
    const res = await api.post(`/author/add`, {
      authorName: addedObject.authorName,
      email: addedObject.email,
      phone: addedObject.phone
    })
    const author: Author = await res.data
    console.log(author)
    return {
      author
    }
  } catch (error) {
    console.log('Error:> ', error.message)
    throw error
  }
})

export const deleteAuthor = createAsyncThunk('author/delete', async (id: UUID) => {
  try {
    const res = await api.delete(`/author/delete/${id}`)
    const msg: string = await res.data
    console.log(msg)
    return {
      msg
    }
  } catch (error) {
    console.log('Error:> ', error.message)
    throw error
  }
})

export const userDataSlice = createSlice({
  name: 'bookData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetching data
    builder.addCase(fetchAuthor.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAuthor.rejected, (state) => {
      state.isLoading = false
      state.error = 'something went wrong'
    })
    builder.addCase(fetchAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      state.auhtors = action.payload.authors
    })
    // updating data
    builder.addCase(updateAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      state.author = action.payload.author
    })

    // updating data
    builder.addCase(addAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      state.author = action.payload.author
    })
    // deleting data
    builder.addCase(deleteAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      state.msg = action.payload.msg
    })
  }
})

export default userDataSlice.reducer
