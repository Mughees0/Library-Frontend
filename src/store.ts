import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./redux/slices/bookSlice";
import authorSlice from "./redux/slices/authorSlice";
import userSlice from "./redux/slices/userSlice";

export const store = configureStore({
  reducer: {
    bookData: bookSlice,
    authorData: authorSlice,
    userData: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
