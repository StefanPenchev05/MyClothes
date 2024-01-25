import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../service/api";

interface Address{
    street: string;
    city: string;
    state: string
    country: string;
    zipCode: string;
}

interface Product{
    id: string;
    name: string;
    price: number;
    description: string;
    images: string;
    category: string;
    designer: string;
    rating: number;
    comments: Comment[];
    quantity: number;
}

interface User {
    username: string;
    email: string;
    dateOfBirth: Date;
    gender: "male" | "female" | "Don't want to state";
    address: Address[];
    phone: string;
    purchasedProducts: Product[];
    profileImages: string[];
}


interface UserSettingsState {
    user: User | null;
    status: "idle" | "loading" | "failed";
    error: string | null;
}

const initialState: UserSettingsState = {
    user : null,
    status: "idle",
    error: null
}


const userSettingsSlice = createSlice({
    name: "userSettings",
    initialState,
    reducers: {
        clearUserSettings: (state) => {
            state.user = null;
        },
    },extraReducers: (builder) => {
        builder.addCase(fetchUserSettings.pending, (state) => {
            state.status = "loading";
        })
        builder.addCase(fetchUserSettings.fulfilled, (state, action) => {
            state.status = "idle";
            state.user = action.payload;
        })
        builder.addCase(updateUserSettings.pending, (state) => {
            state.status = "loading";
        })
        builder.addCase(updateUserSettings.fulfilled, (state, action) => {
            state.status = "idle";
            state.user = action.payload;
        })
    }
});

export const fetchUserSettings = createAsyncThunk('userSettings/fetchUserSettings', async (_, thunkAPI) => {
    try{
        const response = await getData('/user/generalSettings/');
        if(Object.keys(response)[0] === 'message'){
            thunkAPI.rejectWithValue(initialState);
            return thunkAPI.dispatch(
                thunkAPI.dispatch(clearUserSettings())
            );
        }
        return response;
    }catch(err){
        return thunkAPI.rejectWithValue(initialState);
    }
});

export const updateUserSettings = createAsyncThunk(
    "userSettings/updateUserSettings",
    async (user: User) => {
        const response = await fetch(`/api/users/${user.username}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        return data;
    }
)

export const { clearUserSettings } = userSettingsSlice.actions;
export default userSettingsSlice.reducer;
