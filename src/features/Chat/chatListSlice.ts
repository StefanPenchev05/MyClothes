import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { openSnackbar } from "../snackbars/snackbarSlice";
import dayjs from "dayjs";

interface ChatList {
  chat_id: string;
  user_id: string;
  lastMessage: {
    message_id: string;
    sender: string;
    message: string;
    timestamp: string;
    reacted: string | null;
    seen: boolean;
  };
  lastMessageTime: string;
  timesnap: string;
  totalMessages: number;
}

const initialChatListState: ChatList[] = [];

const chatListSlice = createSlice({
  name: "chatList",
  initialState: initialChatListState,
  reducers: {
    addChat: (state, action: PayloadAction<ChatList[] | ChatList>) => {
      if (action.payload instanceof Array) {
        let chats = action.payload.map((chat) => {
          let timeAgo;
          const now = dayjs();
          const messageTime = dayjs(chat.timesnap);
          const hours = now.diff(messageTime, "hour");
          const diffDays = now.diff(messageTime, "day");
          const minutes = now.diff(messageTime, "minute");
          const diffWeeks = now.diff(messageTime, "week");
          const diffMonths = now.diff(messageTime, "month");

          if (minutes < 60) {
            timeAgo = minutes + " minute" + (minutes > 1 ? "s" : "") + " ago";
          } else if (hours < 24) {
            timeAgo = hours + " hour" + (hours > 1 ? "s" : "") + " ago";
          } else if (diffDays < 7) {
            timeAgo = diffDays + " day" + (diffDays > 1 ? "s" : "") + " ago";
          } else if (diffWeeks < 4) {
            timeAgo = diffWeeks + " week" + (diffWeeks > 1 ? "s" : "") + " ago";
          } else {
            timeAgo =
              diffMonths + " month" + (diffMonths > 1 ? "s" : "") + " ago";
          }

          return { ...chat, timesnap: timeAgo };
        });
        return chats as ChatList[];
      } else {
        return [...state, action.payload];
      }
    },
    updateChat: (state, action) => {
      const chatIndex = state.findIndex(
        (chat) => chat.chat_id === action.payload.chat_id
      );
      state[chatIndex] = action.payload;
    },
    updateLastMessage: (state, action) => {
      const chatIndex = state.findIndex(
        (chat) => chat.chat_id === action.payload.chat_id
      );
      if (chatIndex !== -1) {
        state[chatIndex].lastMessage = action.payload.message;
        const now = dayjs();
        const messageTime = dayjs(action.payload.timesnap);
        let timeAgo;
        const minutes = now.diff(messageTime, "minute");
        const hours = now.diff(messageTime, "hour");
        const diffDays = now.diff(messageTime, "day");
        const diffWeeks = now.diff(messageTime, "week");
        const diffMonths = now.diff(messageTime, "month");

        if (minutes < 60) {
          timeAgo = minutes + " minute" + (minutes > 1 ? "s" : "") + " ago";
        } else if (hours < 24) {
          timeAgo = hours + " hour" + (hours > 1 ? "s" : "") + " ago";
        } else if (diffDays < 7) {
          timeAgo = diffDays + " day" + (diffDays > 1 ? "s" : "") + " ago";
        } else if (diffWeeks < 4) {
          timeAgo = diffWeeks + " week" + (diffWeeks > 1 ? "s" : "") + " ago";
        } else {
          timeAgo =
            diffMonths + " month" + (diffMonths > 1 ? "s" : "") + " ago";
        }

        state[chatIndex].lastMessageTime = "0";
      }
    },
    moveChatToStart: (state, action: PayloadAction<string>) => {
      const chatIndex = state.findIndex(
        (chat) => chat.chat_id === action.payload
      );
      if (chatIndex !== -1) {
        const chat = state[chatIndex];
        state.splice(chatIndex, 1);
        state.unshift(chat);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(deleteChat.fulfilled, (state, action) => {
      return state.filter((chat) => chat.chat_id !== action.payload);
    });
  },
});

export const { addChat, updateChat, updateLastMessage, moveChatToStart } =
  chatListSlice.actions;

export const deleteChat = createAsyncThunk(
  "chatList/deleteChat",
  async (chatId: string, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:5500/user/message/delete/${chatId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      ).then((res) => res.json());

      if (Object.keys(response)[0] === "message") {
        thunkAPI.rejectWithValue(response);
        return thunkAPI.dispatch(
          openSnackbar({
            open: true,
            message: "Error deleting chat. Please try again later.",
            severity: "error",
          })
        );
      }

      return chatId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const selectChatList = (state: any) => state.chatList;
export default chatListSlice.reducer;
