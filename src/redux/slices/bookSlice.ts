import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { Book, BookState } from '../../types'

const initialState: BookState = {
  isLoading: false,
  error: null,
  msg: '',
  data: []
}

export const borrowBook = createAsyncThunk('book/borrow', async (object: Book) => {
  return {
    object
  }
})

export const returnBook = createAsyncThunk('book/return', async (object: Book) => {
  return {
    object
  }
})

export const fetchBooks = createAsyncThunk('books/fetch', async () => {
  const res = await fetch(`http://localhost:5173/db.json`)
  const books: Book[] = await res.json()
  return {
    books,
    error: null
  }
})

export const updateBook = createAsyncThunk('books/update', async (object: Book) => {
  return {
    object
  }
})

export const addBook = createAsyncThunk('books/add', async (object: Book) => {
  return {
    object
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

export const userDataSlice = createSlice({
  name: 'bookData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetching data
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchBooks.rejected, (state) => {
      state.isLoading = false
      state.error = 'something went wrong'
    })
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload.books.Books
    })
    // updating book
    builder.addCase(updateBook.fulfilled, (state, action) => {
      state.isLoading = false
      const updatedBooks = state.data.map((book) => {
        if (book.id == action.payload.object.id) {
          return {
            ...book,
            ISBN: action.payload.object.ISBN,
            title: action.payload.object.title,
            description: action.payload.object.description,
            author: action.payload.object.author,
            publisher: action.payload.object.publisher,
            borrowed: action.payload.object.borrowed,
            borrowerId: action.payload.object.borrowerId,
            publishedDate: action.payload.object.publishedDate,
            borrowDate: action.payload.object.borrowDate,
            returnDate: action.payload.object.returnDate
          }
        }
        return book
      })
      state.data = updatedBooks
    })
    // adding book
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.isLoading = false
      const updatedBooks = [...state.data, action.payload.object]
      state.data = updatedBooks
    })
    // deleting data
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.isLoading = false
      const filterById = [...state.data].filter((d) => {
        if (d.id !== action.payload.id) {
          return d
        }
      })
      state.data = filterById
    })
    // filtering data
    builder.addCase(filterBookByName.fulfilled, (state, action) => {
      state.isLoading = false
      const filterByName = state.data.filter((d) => {
        return d.title.toLowerCase().includes(action.payload.name.toLowerCase())
      })
      state.data = filterByName
    })
    builder.addCase(filterBookByAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      const filterByAuthor = state.data.filter((d) => {
        return d.author.toLowerCase().includes(action.payload.name.toLowerCase())
      })
      state.data = filterByAuthor
    })
    // borrow update
    builder.addCase(borrowBook.fulfilled, (state, action) => {
      state.isLoading = false
      const updatedBooks = state.data.map((book) => {
        if (book.id == action.payload.object.id) {
          return {
            ...book,
            borrowed: true,
            borrowDate: `${moment().format('DD/MM/YYYY')}`,
            returnDate: `${moment().add(1, 'M').format(`DD/MM/YYYY`)}`
          }
        }
        return book
      })
      state.data = updatedBooks
    })
    // return update
    builder.addCase(returnBook.fulfilled, (state, action) => {
      state.isLoading = false
      const updatedBooks = state.data.map((book) => {
        if (book.id == action.payload.object.id) {
          return {
            ...book,
            borrowed: false
          }
        }
        return book
      })
      state.data = updatedBooks
    })
  }
})

export default userDataSlice.reducer
