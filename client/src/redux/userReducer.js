import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action;
    },
  },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
