import { createSlice } from "@reduxjs/toolkit";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
  autoHideDuration: number;
}

const initialState: SnackbarState = {
  open: false,
  message: "",
  severity: "success",
  autoHideDuration: 6000,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
      Object.assign(state, action.payload);
      state.open = true;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
