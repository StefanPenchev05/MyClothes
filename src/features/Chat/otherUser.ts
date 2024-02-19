import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Avatar {
  avatar: string;
  fileName: string;
  uploadedAt: Date;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: Avatar | undefined;
  socket_id: string | null;
}

const initialState: User = {
    id: '',
    firstName: '',
    lastName: '',
    avatar: {
        avatar: '',
        fileName: '',
        uploadedAt: new Date(),
    },
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