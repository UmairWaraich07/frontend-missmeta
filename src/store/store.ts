import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import guestUserPopupReducer from "./guestUserPopup.js";

// Define the root state type
export interface RootState {
  auth: ReturnType<typeof authReducer>;
  guestUserModal: ReturnType<typeof guestUserPopupReducer>;
  // Add other slices as needed
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    guestUserModal: guestUserPopupReducer,
  },
});

export { store };
