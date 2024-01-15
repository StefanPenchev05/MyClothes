import { createSlice } from "@reduxjs/toolkit";

interface Message {
    message_id: string,
    sender: string,
    message: string,
    timestamp: string,
    reacted: string | null,
    seen: boolean,
}

const initialState: Message[] = [];

const messageSlice = createSlice({
    name: 'messages',
    initialState: initialState,
    reducers: {
        addChat: (state, action) => {
            Object.assign(state, action.payload);
        },
        addMessage: (state, action) => {
            state.push(action.payload);
        },
        updateMessage: (state, action) => {
            const messageIndex = state.findIndex(message => message.message_id === action.payload.message_id);
            state[messageIndex] = action.payload;
        },
        deleteMessage: (state, action) => {
            const messageIndex = state.findIndex(message => message.message_id === action.payload);
            state.splice(messageIndex, 1);
        },
        clearChat: (state) => {
            state.splice(0, state.length);
        }
    }
});

export const { addChat, addMessage, updateMessage, deleteMessage, clearChat } = messageSlice.actions;
export default messageSlice.reducer;