import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: {},
  },
  reducers: {
    postList: (state, action) => {
      state.post = action;
    },
    addPost: (state, action) => {
      state.post = { ...state.post, action };
    },
  },
});

export const { postList, addPost } = postSlice.actions;

export default postSlice.reducer;
