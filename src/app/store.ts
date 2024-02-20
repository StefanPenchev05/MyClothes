import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userBaseInfo";
import snackbarReducer from "../features/snackbars/snackbarSlice";
import chatListReducer from "../features/Chat/chatListSlice";
import messageReducer from "../features/Chat/messageSlice";
import otherUserReducer from "../features/Chat/otherUser";
import productReducer from "../features/Products/productSlice";
import UserSettingsReducer from "../features/users/userSettingsSlice";
import SocketRedcer from "../features/socket/socketSlice";
import notificationReducer from "../components/Notification/notificationSlice";
import userGeneralSettingsReducer from "../features/users/userGeneralSettings";

import socketMiddleware from "../features/socket/socketMiddleware";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    snackbar: snackbarReducer,
    chatList: chatListReducer,
    message: messageReducer,
    otherUsers: otherUserReducer,
    product: productReducer,
    userSettings: UserSettingsReducer,
    socket: SocketRedcer,
    notifications: notificationReducer,
    generalSettings: userGeneralSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
