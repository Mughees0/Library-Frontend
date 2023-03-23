import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface Books {
  ISBN: string
  title: string
  description: string
  author: string
  publisher: string
  borrowed: boolean
  borrowerId: string
  publishedDate: string
  borrowDate: string
  returnDate: string
}

export type BooksDataState = {
  isLoading: boolean
  error: null | string
  data: Books[]
}

const initialState: BooksDataState = {
  isLoading: false,
  error: null,
  data: [
    {
      ISBN: '528388741-3',
      title: 'Theatre of Blood',
      description: 'Oth recurrent vertebral dislocation, sacr/sacrocygl region',
      author: 'Carlynn Dinnington',
      publisher: 'Ruecker Group',
      borrowed: false,
      borrowerId: '01GW3SZPHMHFX53RSE9F3TRC9Q',
      publishedDate: '29.08.2022',
      borrowDate: '31/03/2022',
      returnDate: '06/02/2023'
    }
  ]
}

export const fetchProductsThunk = createAsyncThunk('books/fetch', async () => {
  const res = await fetch(`http://localhost:5173/MOCK_DATA.json`)
  const books = await res.json()

  return {
    books,
    error: null
  }
})

export const userDataSlice = createSlice({
  name: 'bookData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchProductsThunk.rejected, (state) => {
      state.isLoading = false
      state.error = 'something went wrong'
    })
    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload.books
    })
  }
})

export default userDataSlice.reducer
