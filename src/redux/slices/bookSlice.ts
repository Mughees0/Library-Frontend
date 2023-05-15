import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import {
  BookReq,
  BookRes,
  BookState,
  BorrowReq,
  BorrowRes,
  CopyReq,
  CopyRes,
  Decoded,
  ReturnReq
} from '../../types'
import axios from 'axios'
import { UUID } from 'crypto'
import jwtDecode from 'jwt-decode'
import api from '../../api'

const initialState: BookState = {
  isLoading: false,
  error: null,
  msg: '',
  book: {
    id: undefined,
    title: '',
    isbn: '',
    description: '',
    author: {
      id: undefined,
      authorName: '',
      email: '',
      phone: ''
    },
    category: {
      id: undefined,
      name: ''
    },
    publishedDate: '',
    publisher: '',
    cover: ''
  },
  books: [],
  borrowedBook: {
    id: '',
    user: {
      id: '',
      username: '',
      role: ''
    },
    bookCopy: {
      id: '',
      book: {
        id: '',
        title: '',
        description: '',
        author: {
          id: '',
          authorName: '',
          email: '',
          phone: ''
        },
        category: {
          id: '',
          name: ''
        },
        publishedDate: '',
        publisher: '',
        cover: ''
      },
      status: false
    },
    borrowDate: '',
    returnDate: ''
  },
  borrowedBooks: [],
  bookCopies: []
}

export const borrowBook = createAsyncThunk('book/borrow', async (object: BorrowReq) => {
  try {
    const res = await api.post(`/borrow/borrowOne`, {
      userId: object.userId,
      bookId: object.bookId
    })
    const book: BorrowRes = await res.data
    console.log(book)
    return {
      book
    }
  } catch (error) {
    console.log('Error:> ', error.message)
    throw error
  }
})
export const borrowedBooks = createAsyncThunk('book/borrowed', async (userId: UUID) => {
  try {
    const res = await api.get(`/borrow/all/${userId}`)
    const books: BorrowRes[] = await res.data
    console.log(books)
    return {
      books
    }
  } catch (error) {
    console.log('Error:> ', error.message)
    throw error
  }
})

export const returnBook = createAsyncThunk('book/return', async (object: ReturnReq) => {
  try {
    const res = await api.post(`/borrow/returnOne`, {
      userId: object.userId,
      bookCopyId: object.bookCopyId
    })
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
export const addCopies = createAsyncThunk('book/copies', async (object: CopyReq) => {
  try {
    const res = await api.post(`/bookcopy/add`, {
      bookId: object.bookId,
      quantity: object.quantity,
      status: object.status
    })
    const copies: CopyRes[] = await res.data
    console.log(copies)
    return {
      copies
    }
  } catch (error) {
    console.log('Error:> ', error.message)
    throw error
  }
})
export const fetchBooks = createAsyncThunk('books/fetch', async () => {
  try {
    const res = await api.get('/book/all')
    const books: BookRes[] = await res.data
    console.log(books)
    return {
      books
    }
  } catch (error) {
    console.log('Error:> ', error.message)
    throw error
  }
})
export const fetchBook = createAsyncThunk('books/fetchOne', async (id: UUID) => {
  try {
    const res = await api.get(`/book/${id}`)
    const book: BookRes = await res.data
    console.log(book)
    return {
      book
    }
  } catch (error) {
    console.log('Error:> ', error.message)
    throw error
  }
})
export const fetchBookCopies = createAsyncThunk('books/fetchCopies', async (id: UUID) => {
  try {
    const res = await api.get(`/bookcopy/all/${id}`)
    const copies: CopyRes[] = await res.data
    console.log(copies)
    return {
      copies
    }
  } catch (error) {
    console.log('Error:> ', error.message)
    throw error
  }
})
export const deleteBookCopies = createAsyncThunk('books/deleteCopies', async (id: UUID) => {
  try {
    const res = await api.delete(`/bookcopy/delete/${id}`)
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
export const countBookCopies = createAsyncThunk('books/countCopies', async (id: UUID) => {
  try {
    const res = await api.get(`/bookcopy/countAll/${id}`)
    const copies: number = await res.data
    console.log(copies)
    return {
      copies
    }
  } catch (error) {
    console.log('Error:> ', error.message)
    throw error
  }
})

export const updateBook = createAsyncThunk('books/update', async (updatedObject: BookReq) => {
  try {
    const res = await api.put(`/book/update/${updatedObject.id}`, {
      title: updatedObject.title,
      isbn: updatedObject.isbn,
      description: updatedObject.description,
      authorId: updatedObject.authorId,
      categoryId: updatedObject.categoryId,
      publishedDate: updatedObject.publishedDate,
      publisher: updatedObject.publisher,
      cover: updatedObject.cover
    })
    const books: BookRes[] = await res.data
    console.log(books)
    return {
      books
    }
  } catch (error) {
    console.log('Error:> ', error.message)
    throw error
  }
})

export const addBook = createAsyncThunk('books/add', async (addedObject: BookReq) => {
  try {
    const res = await api.post(`/book/add`, {
      title: addedObject.title,
      description: addedObject.description,
      isbn: addedObject.isbn,
      authorId: addedObject.authorId,
      categoryId: addedObject.categoryId,
      publishedDate: addedObject.publishedDate,
      publisher: addedObject.publisher,
      cover: addedObject.cover
    })
    const book: BookRes = await res.data
    console.log(book)
    return {
      book
    }
  } catch (error) {
    console.log('Error:> ', error.message)
    throw error
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
  try {
    const res = await api.delete(`/book/delete/${id}`)
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
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoading = false
      state.books = action.payload.books
    })

    // Adding copies
    builder.addCase(addCopies.fulfilled, (state, action) => {
      state.isLoading = false
      state.bookCopies = action.payload.copies
    })

    // fetching book copies
    builder.addCase(fetchBookCopies.fulfilled, (state, action) => {
      state.isLoading = false
      state.bookCopies = action.payload.copies
    })
    // Count book copies
    builder.addCase(countBookCopies.fulfilled, (state, action) => {
      state.isLoading = false
      state.bookCopies = action.payload.copies
    })
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoading = false
      state.book = action.payload.book
    })
    builder.addCase(borrowedBooks.fulfilled, (state, action) => {
      state.isLoading = false
      state.borrowedBooks = action.payload.books
    })
    // updating book
    builder.addCase(updateBook.fulfilled, (state, action) => {
      state.isLoading = false
    })
    // adding book
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.isLoading = false
      state.book = action.payload.book
    })
    builder.addCase(addBook.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    // deleting data
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.isLoading = false
      state.msg = action.payload.msg
    })
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    // filtering data
    builder.addCase(filterBookByName.fulfilled, (state, action) => {
      state.isLoading = false
      const filterByName = state.books.filter((d) => {
        return d.title.toLowerCase().includes(action.payload.name.toLowerCase())
      })
      state.books = filterByName
    })
    builder.addCase(filterBookByAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      const filterByAuthor = state.books.filter((d) => {
        return d.author.toLowerCase().includes(action.payload.name.toLowerCase())
      })
      state.books = filterByAuthor
    })
    // borrow update
    builder.addCase(borrowBook.fulfilled, (state, action) => {
      state.isLoading = false
      state.borrowedBook = action.payload.book
    })
    // return update
    builder.addCase(returnBook.fulfilled, (state, action) => {
      state.isLoading = false
      state.msg = action.payload.msg
    })
  }
})

export default userDataSlice.reducer
