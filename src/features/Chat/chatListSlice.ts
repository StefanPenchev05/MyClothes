import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { openSnackbar } from "../snackbars/snackbarSlice";

import { getData } from "../../service/api";

interface ChatList {
    chat_id: string,
    user_id: string,
    lastMessage: string,
    lastMessageTime: string,
}

const initialChatListState: ChatList[] = [];

const chatListSlice = createSlice({
    name: 'chatList',
    initialState: initialChatListState,
    reducers: {
        addChat: (state, action) => {
            Object.assign(state, action.payload);
        },
        updateChat: (state, action) => {
            const chatIndex = state.findIndex(chat => chat.chat_id === action.payload.chat_id);
            state[chatIndex] = action.payload;
        },
        updateLastMessage: (state, action) => {
            const chatIndex = state.findIndex(chat => {return chat.chat_id === action.payload.chat_id});
            state[chatIndex].lastMessage = action.payload.message;
            state[chatIndex].lastMessageTime = action.payload.timestamp;

        }
    }
});

export const { addChat, updateChat, updateLastMessage } = chatListSlice.actions;

export const deleteChat = createAsyncThunk('chatList/deleteChat', async(chatId: string, thunkAPI) => {
    try{
        const response = await fetch(`http://localhost:5500/user/message/delete/${chatId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }, 
            credentials: 'include'
        })
            .then(res => res.json());
        if(Object.keys(response)[0] === 'message'){
            thunkAPI.rejectWithValue(response);
            return thunkAPI.dispatch(
                openSnackbar({
                    open: true,
                    message: 'Error deleting chat. Please try again later.',
                    severity: 'error'
                })
            );
        }

        return chatId;
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const selectChatList = (state: any) => state.chatList;
export default chatListSlice.reducer;