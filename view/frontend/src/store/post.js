// title and body are required
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";
import axios from "axios";
import Cookies from "js-cookie";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    allPosts: [],
    error: null,
    displayedPosts: [],
    validationErrors: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.allPosts = action.payload;
        state.error = null;
        state.displayedPosts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.validationErrors = action.payload.errors;
        state.error = action.payload.errors;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.error = null;
        state.displayedPosts = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.validationErrors = action.payload.errors;
        state.error = action.payload.errors;
      });
  },
});

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { rejectWithValue }) => {
    const res = await csrfFetch("/api/posts", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(await res.json());
    }
    return data.posts;
  }
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async ( postId , { rejectWithValue }) => {
    const res = await csrfFetch(`/api/posts/${postId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(await res.json());
    }
    return data;
  }
);

export default postSlice.reducer;
