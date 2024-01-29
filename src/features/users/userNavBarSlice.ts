import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { openSnackbar } from "../snackbars/snackbarSlice";

import { getData } from "../../service/api";


interface UserNavBarState {
    id: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    avatar: string | undefined;
    role: string | undefined;
    purchasedProducts?: number;
    products?: number;
    sales?: number;
}

const initialState: UserNavBarState = {
    id: undefined,
    firstName: undefined,
    lastName: undefined,
    avatar: undefined,
    role: undefined,
    purchasedProducts: undefined,
    products: undefined,
    sales: undefined,
}


const userNavBarSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            
            Object.assign(state, action.payload);
        },
        clearUser: (state) => {
            state = initialState
        },
        updateData: (state, action) => {
            Object.assign(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            if(action.payload.message) return state;
            Object.assign(state, action.payload);
        })
        .addCase(fetchUserInfo.rejected, (state, action) => {
            state = initialState;
        })  
    }
})

export const { setUser, clearUser } = userNavBarSlice.actions;

export const fetchUserInfo:any = createAsyncThunk('user/fetchUserInfo', async (_, thunkAPI) => {
    try{
        const response = await getData('/navBar/userInfo');
        if(Object.keys(response)[0] === 'message'){
            thunkAPI.rejectWithValue(initialState);
            return thunkAPI.dispatch(
                openSnackbar({
                    open: true,
                    severity: 'warning',
                    message: 'Please login to see your profile.'
                })
            );
        }
        return response;
    } catch (err) {
        thunkAPI.dispatch(
            openSnackbar({
                open: true,
                severity: 'error',
                message: "Error fetching user data. Please try again."
            })
        );
    }
});

export default userNavBarSlice.reducer;