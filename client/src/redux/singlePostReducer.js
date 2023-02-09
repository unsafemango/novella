import { createSlice } from "@reduxjs/toolkit";

export const singlePostSlice = createSlice({
  name: "single_post",
  initialState: {
    single_post: null,
  },
  reducers: {
    url: (state, action) => {
      state.single_post = action;
    },
  },
});

export const { url } = singlePostSlice.actions;

export default singlePostSlice.reducer;
