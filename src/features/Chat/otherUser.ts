import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  socket_id: string | null;
}

const initialState: User = {
    id: '',
    firstName: '',
    lastName: '',
    avatar: '',
    socket_id: null,
};

const otherUsersSlice = createSlice({
  name: 'otherUsers',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
        Object.assign(state, action.payload);
    },
    removeUser: (state) => {
        Object.assign(state, initialState);
    },
  },
});

export const { addUser, removeUser } = otherUsersSlice.actions;

export default otherUsersSlice.reducer;