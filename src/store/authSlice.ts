import { IUserData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  authStatus: boolean;
  userData: IUserData | null;
};

const initialState: AuthState = {
  authStatus: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<IUserData>) {
      state.authStatus = true;
      state.userData = action.payload;
    },
    logout(state) {
      state.authStatus = false;
      state.userData = null;
    },
    updateUserData(state, action: PayloadAction<IUserData>) {
      state.userData = action.payload;
    },
  },
});

export const { login, logout, updateUserData } = authSlice.actions;

export default authSlice.reducer;
