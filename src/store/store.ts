import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";

// Define the root state type
export interface RootState {
  auth: ReturnType<typeof authReducer>;
  // Add other slices as needed
}

const store = configureStore({
  reducer: authReducer,
});

export { store };
