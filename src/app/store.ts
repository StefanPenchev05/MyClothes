import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userNavBarSlice";
import snackbarReducer from "../features/snackbars/snackbarSlice";
import chatListReducer from "../features/Chat/chatListSlice";
import messageReducer from "../features/Chat/messageSlice";
import otherUserReducer from "../features/Chat/otherUser";
import productReducer from "../features/Products/productSlice";
import UserSettingsReducer from "../features/users/userSettingsSlice";
import SocketRedcer from "../features/socket/socketSlice";
import ProfileReducer from "../features/userProfile/userProfileSlice";
import notificationReducer from "../components/Notification/notificationSlice";

import socketMiddleware from "../features/socket/socketMiddleware";

export const store = configureStore({
  reducer: {
    userNavBar: userReducer,
    snackbar: snackbarReducer,
    chatList: chatListReducer,
    message: messageReducer,
    otherUsers: otherUserReducer,
    product: productReducer,
    userProfile: ProfileReducer,
    userSettings: UserSettingsReducer,
    socket: SocketRedcer,
    notifications: notificationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
