import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  token: null,
  rehydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
      state.rehydrated = true;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.token = null;
      state.rehydrated = true;
    },
    rehydrate: (state, action) => {
      state.status = !!action.payload.userData;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
      state.rehydrated = true;
    }
  },
});

export const { login, logout, rehydrate } = authSlice.actions;

export default authSlice.reducer;