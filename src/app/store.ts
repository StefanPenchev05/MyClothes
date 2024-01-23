import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/users/userNavBarSlice'
import snackbarReducer from '../features/snackbars/snackbarSlice'
import chatListReducer from '../features/Chat/chatListSlice'
import messageReducer from '../features/Chat/messageSlice'
import otherUserReducer from '../features/Chat/otherUser'
import productReducer from '../features/Products/productSlice'

export const store = configureStore({
    reducer:{
        userNavBar: userReducer,
        snackbar: snackbarReducer,
        chatList: chatListReducer,
        message: messageReducer,
        otherUsers: otherUserReducer,
        product: productReducer,
    },
});

export default store;