import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import candidateSliceReducer from "./candidateSlice";
import userSliceReducer from "./userSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    candidate: candidateSliceReducer,
    user: userSliceReducer
  },
});

export default store;
