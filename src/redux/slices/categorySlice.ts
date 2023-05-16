import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Category, CategoryState } from '../../types'
import api from '../../api'
import { UUID } from 'crypto'

const initialState: CategoryState = {
  isLoading: false,
  error: null,
  msg: '',
  categories: [],
  category: {
    id: 0,
    name: ''
  }
}

export const fetchCategory = createAsyncThunk('category/fetch', async () => {
  try {
    const res = await api.get(`/category/all`)
    const Categories: Category[] = await res.data
    console.log(Categories)
    return {
      Categories
    }
  } catch (error) {
    console.log('Error:> ', error.message)
    throw error
  }
})

export const updateCategory = createAsyncThunk(
  'category/update',
  async (updatedObject: Category) => {
    try {
      const res = await api.put(`/category/update/${updatedObject.id}`, {
        name: updatedObject.name
      })
      const category: Category = await res.data
      console.log(category)
      return {
        category
      }
    } catch (error) {
      console.log('Error:> ', error.message)
      throw error
    }
  }
)
export const addCategory = createAsyncThunk('category/add', async (addedObject: Category) => {
  try {
    const res = await api.post(`/category/add`, {
      name: addedObject.name
    })
    const category: Category = await res.data
    console.log(category)
    return {
      category
    }
  } catch (error) {
    console.log('Error:> ', error.message)
    throw error
  }
})

export const deleteCategory = createAsyncThunk('category/delete', async (id: UUID) => {
  try {
    const res = await api.delete(`/category/delete/${id}`)
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

export const categorySlice = createSlice({
  name: 'CategoryData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetching data
    builder.addCase(fetchCategory.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCategory.rejected, (state) => {
      state.isLoading = false
      state.error = 'something went wrong'
    })
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.categories = action.payload.Categories
    })
    // updating data
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.category = action.payload.category
    })

    // updating data
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.category = action.payload.category
    })
    // deleting data
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.msg = action.payload.msg
    })
  }
})

export default categorySlice.reducer
