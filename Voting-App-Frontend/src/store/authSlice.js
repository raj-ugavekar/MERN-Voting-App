import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
    updateUserInfo:(state,action) =>{
      state.status = true;
      state.userData = action.payload;
    }
  },
});

export const { login, logout, updateUserInfo } = authSlice.actions;

const authSliceReducer = authSlice.reducer;

export default authSliceReducer;
