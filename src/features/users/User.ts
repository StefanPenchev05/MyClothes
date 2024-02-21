import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: UserType = {
  id: undefined,
  firstName: undefined,
  lastName: undefined,
  avatar: undefined,
  role: undefined,
  purchasedProducts: undefined,
  products: undefined,
  sales: undefined,
};

const User = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    clearUser: (state) => {
      state = initialState;
    },
    updateData: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const selectFirstName = (state: RootState) => state.userReducer.firstName;
export const selectAvatar = (state: RootState) => state.userReducer.avatar;

export const { setUser, clearUser } = User.actions;
export default User.reducer;
