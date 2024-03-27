import { createSlice } from "@reduxjs/toolkit";

interface IModalState {
  isOpen?: boolean;
}
const initialState: IModalState = {
  isOpen: false,
};

const guestUserModal = createSlice({
  name: "guestUserModal",
  initialState,
  reducers: {
    openGuestUserPopup(state) {
      state.isOpen = true;
    },
    closeGuestUserPopup(state) {
      state.isOpen = false;
    },
  },
});

export const { closeGuestUserPopup, openGuestUserPopup } =
  guestUserModal.actions;
export default guestUserModal.reducer;
