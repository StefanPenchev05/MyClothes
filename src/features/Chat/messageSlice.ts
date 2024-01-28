import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  conversation_id: string;
  message_id: string;
  sender: string;
  message: string;
  timestamp: string;
  reacted: string | null;
  seen: boolean;
}

const initialState: Message[] = [];

const messageSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    addChat: (state, action) => {
      Object.assign(state, action.payload);
    },
    addMessage: (state, action) => {
      state.push(action.payload);
    },
    addMessageToTop: (state, action: PayloadAction<Message[]>) => {
      action.payload.map((message) => {
        state.unshift(message);
      });
    },
    updateMessage: (state, action) => {
      const messageIndex = state.findIndex(
        (message) => message.message_id === action.payload.message_id
      );
      state[messageIndex].seen = true;
    },
    deleteMessage: (state, action) => {
      const messageIndex = state.findIndex(
        (message) => message.message_id === action.payload
      );
      state.splice(messageIndex, 1);
    },
    clearChat: (state, action) => {
      state.splice(0, state.length);
    },
  },
});

export const {
  addChat,
  addMessage,
  updateMessage,
  addMessageToTop,
  deleteMessage,
  clearChat,
} = messageSlice.actions;
export default messageSlice.reducer;
