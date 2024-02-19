import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Avatar {
  avatar: string;
  fileName: string;
  uploadedAt: Date;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: Avatar | undefined;
  socket_id: string | null;
}

interface NotificationState {
  open: boolean;
  conversation_id: string | null;
  message: string | null;
  sender: User | null;
}
const initialState: NotificationState = {
  open: false,
  conversation_id: null,
  message: null,
  sender: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationState>) => {
      Object.assign(state, action.payload);
    },
    closeNotification: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
    clearNotification: (state) => {
      state.open = false;
      state.conversation_id = null;
      state.sender = null;
      state.message = null;
    },
  },
});

export const { setNotification, closeNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
