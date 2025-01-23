import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  name: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.name = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.name = null;
    },
    updateUser: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
