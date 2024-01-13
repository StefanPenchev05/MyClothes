import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/users/userNavBarSlice'
import snackbarReducer from '../features/snackbars/snackbarSlice'
import chatListReducer from '../features/Chat/chatUserSlice'

export const store = configureStore({
    reducer:{
        userNavBar: userReducer,
        snackbar: snackbarReducer,
        chatList: chatListReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;