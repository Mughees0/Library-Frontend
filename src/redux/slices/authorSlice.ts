import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Author, AuthorState, Book, BookState } from "../../types";

const initialState: AuthorState = {
  isLoading: false,
  error: null,
  msg: "",
  data: [
    {
      id: 0,
      name: "Start",
    },
  ],
};

export const fetchAuthor = createAsyncThunk("author/fetch", async () => {
  const res = await fetch(`http://localhost:8080/Author`);
  const authors: Author[] = await res.json();
  return {
    authors,
    error: null,
  };
});

export const updateAuthor = createAsyncThunk(
  "author/update",
  async (object: Author) => {
    const res = await fetch("http://localhost:8080/Author/" + object.id, {
      method: "PUT",
      body: JSON.stringify({
        name: object.name,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const msg = await res.json();
    return {
      msg: "Updated",
    };
  }
);
export const addAuthor = createAsyncThunk(
  "author/add",
  async (object: Author) => {
    const res = await fetch("http://localhost:8080/Author/", {
      method: "POST",
      body: JSON.stringify({
        id: object.id,
        name: object.name,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const msg = await res.json();
    return {
      msg: "Author Added",
    };
  }
);

export const deleteAuthor = createAsyncThunk(
  "author/delete",
  async (id: number) => {
    const res = await fetch(`http://localhost:8080/Author/` + id, {
      method: "DELETE",
    });
    const msg = await res.json();
    console.log(msg);
    return {
      msg: "deleted",
    };
  }
);

export const userDataSlice = createSlice({
  name: "bookData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetching data
    builder.addCase(fetchAuthor.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAuthor.rejected, (state) => {
      state.isLoading = false;
      state.error = "something went wrong";
    });
    builder.addCase(fetchAuthor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.authors;
    });
    // updating data
    builder.addCase(updateAuthor.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    // updating data
    builder.addCase(addAuthor.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload.msg);
    });
    // deleting data
    builder.addCase(deleteAuthor.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload.msg);
    });
  },
});
export const {} = userDataSlice.actions;
export default userDataSlice.reducer;
