import { createSlice } from "@reduxjs/toolkit";

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

const userBaseInfo = createSlice({
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

export const { setUser, clearUser } = userBaseInfo.actions;
export default userBaseInfo.reducer;
