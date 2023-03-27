import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Author, AuthorState } from '../../types'

const initialState: AuthorState = {
  isLoading: false,
  error: null,
  msg: '',
  data: []
}

export const fetchAuthor = createAsyncThunk('author/fetch', async () => {
  const res = await fetch(`http://localhost:5173/db.json`)
  const authors: Author[] = await res.json()
  return {
    authors,
    error: null
  }
})

export const updateAuthor = createAsyncThunk('author/update', async (object: Author) => {
  return {
    object
  }
})
export const addAuthor = createAsyncThunk('author/add', async (object: Author) => {
  return {
    object
  }
})

export const deleteAuthor = createAsyncThunk('author/delete', async (id: number) => {
  return {
    id
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
      state.data = action.payload.authors.Author
    })
    // updating data
    builder.addCase(updateAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      const updatedAuthors = state.data.map((author) => {
        if (author.id == action.payload.object.id) {
          return {
            ...author,
            name: action.payload.object.name
          }
        }
        return author
      })
      state.data = updatedAuthors
    })

    // updating data
    builder.addCase(addAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      const updatedAuthors = [...state.data, action.payload.object]
      state.data = updatedAuthors
    })
    // deleting data
    builder.addCase(deleteAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      const filterById = [...state.data].filter((d) => {
        if (d.id !== action.payload.id) {
          return d
        }
      })
      state.data = filterById
    })
  }
})

export default userDataSlice.reducer
