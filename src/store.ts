import { configureStore } from '@reduxjs/toolkit'
import fetchDataSlice from './features/api/fetchDataSlice'

import userDataSlice from './features/login/loginDataSlice'

export const store = configureStore({
  reducer: {
    userData: userDataSlice,
    bookData: fetchDataSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
