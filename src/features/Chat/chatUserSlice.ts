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
            state.push(action.payload);
        },
        removeChat: (state, action) => {
            const chatIndex = state.findIndex(chat => chat.chat_id === action.payload.chat_id);
            state.splice(chatIndex, 1);
        },
        updateChat: (state, action) => {
            const chatIndex = state.findIndex(chat => chat.chat_id === action.payload.chat_id);
            state[chatIndex] = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChatList.fulfilled, (state, action) => {
           Object.assign(state, action.payload);
        })
        .addCase(fetchChatList.pending, (state, action) => {

        })
        .addCase(fetchChatList.rejected, (state, action) => {
            state = initialChatListState;
        })  
    }
});

export const { addChat, removeChat, updateChat } = chatListSlice.actions;

export const fetchChatList = createAsyncThunk('chatList/fetchChatList', async (_, thunkAPI) => {
    try{
        const response = await getData('/user/message/getChatList');
        if(Object.keys(response)[0] === 'message'){
            thunkAPI.rejectWithValue(response);
            return thunkAPI.dispatch(
                openSnackbar({
                    open: true,
                    message: 'Error getting Chat List. Please try again later.',
                    severity: 'error'
                })
            );
        }
        console.log(response);
        return response;
    }catch(error){
        //return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export default chatListSlice.reducer;