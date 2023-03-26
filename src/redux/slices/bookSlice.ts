import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { Book, BookState } from '../../types'

const initialState: BookState = {
  isLoading: false,
  error: null,
  msg: '',
  data: []
}

export const borrowBook = createAsyncThunk('book/borrow', async (object: Book) => {
  const res = await fetch('http://localhost:8080/Books/' + object.id, {
    method: 'PUT',
    body: JSON.stringify({
      ISBN: object.ISBN,
      title: object.title,
      description: object.description,
      author: object.author,
      publisher: object.publisher,
      borrowed: true,
      borrowerId: object.borrowerId,
      publishedDate: object.publishedDate,
      borrowDate: `${moment().format('DD/MM/YYYY')}`,
      returnDate: `${moment().add(1, 'M').format(`DD/MM/YYYY`)}`
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

export const returnBook = createAsyncThunk('book/return', async (object: Book) => {
  const res = await fetch('http://localhost:8080/Books/' + object.id, {
    method: 'PUT',
    body: JSON.stringify({
      ISBN: object.ISBN,
      title: object.title,
      description: object.description,
      author: object.author,
      publisher: object.publisher,
      borrowed: false,
      borrowerId: object.borrowerId,
      publishedDate: object.publishedDate,
      borrowDate: object.borrowDate,
      returnDate: object.returnDate
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

export const fetchBooks = createAsyncThunk('books/fetch', async () => {
  const res = await fetch(`http://localhost:8080/Books`)
  const books: Book[] = await res.json()
  return {
    books,
    error: null
  }
})

export const updateBook = createAsyncThunk('books/update', async (object: Book) => {
  const res = await fetch('http://localhost:8080/Books/' + object.id, {
    method: 'PUT',
    body: JSON.stringify({
      ISBN: object.ISBN,
      title: object.title,
      description: object.description,
      author: object.author,
      publisher: object.publisher,
      borrowed: object.borrowed,
      borrowerId: object.borrowerId,
      publishedDate: object.publishedDate,
      borrowDate: object.borrowDate,
      returnDate: object.returnDate
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

export const addBook = createAsyncThunk('books/add', async (object: Book) => {
  const res = await fetch('http://localhost:8080/Books/', {
    method: 'POST',
    body: JSON.stringify({
      id: object.id,
      ISBN: object.ISBN,
      title: object.title,
      description: object.description,
      author: object.author,
      publisher: object.publisher,
      borrowed: object.borrowed,
      borrowerId: object.borrowerId,
      publishedDate: object.publishedDate,
      borrowDate: object.borrowDate,
      returnDate: object.returnDate
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const msg = await res.json()
  return {
    msg: 'Book Added'
  }
})

export const filterBookByName = createAsyncThunk('books/filterName', async (name: string) => {
  const res = await fetch(`http://localhost:8080/Books?title_like=${name}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })
  const msg = await res.json()
  console.log(msg)

  return {
    msg
  }
})
export const filterBookByAuthor = createAsyncThunk('books/filterAuthor', async (name: string) => {
  const res = await fetch(`http://localhost:8080/Books?author_like=${name}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })
  const msg = await res.json()
  console.log(msg)

  return {
    msg
  }
})

export const deleteBook = createAsyncThunk('books/delete', async (id: number) => {
  const res = await fetch(`http://localhost:8080/Books/` + id, {
    method: 'DELETE'
  })
  const msg = await res.json()
  console.log(msg)
  return {
    msg: 'deleted'
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
      state.data = action.payload.books
    })
    // updating book
    builder.addCase(updateBook.fulfilled, (state, action) => {
      state.isLoading = false
    })
    // adding book
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.isLoading = false
      console.log(action.payload.msg)
    })
    // deleting data
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.isLoading = false
      console.log(action.payload.msg)
    })
    // filtering data
    builder.addCase(filterBookByName.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload.msg
    })
    builder.addCase(filterBookByAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload.msg
    })
    // borrow update
    builder.addCase(borrowBook.fulfilled, (state, action) => {
      state.isLoading = false
    })
    // return update
    builder.addCase(returnBook.fulfilled, (state, action) => {
      state.isLoading = false
    })
  }
})
export const {} = userDataSlice.actions
export default userDataSlice.reducer
