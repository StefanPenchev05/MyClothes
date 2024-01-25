import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { openSnackbar } from "../snackbars/snackbarSlice";
import { useParams } from 'react-router-dom';
import { getData } from "../../service/api";

interface UserProfileState {
    id: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    avatar: string | undefined;
    profileImages:userImages[]|undefined;
    rating?:number|undefined;
    role: string | undefined;
    purchasedProducts?: number;
    products?: number;
    sales?: number;
}
interface userImages{
    url:string;
}

const initialState: UserProfileState = {
    id: undefined,
    firstName: undefined,
    lastName: undefined,
    avatar: undefined,
    profileImages:undefined,
    role: undefined,
    purchasedProducts: undefined,
}

const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUser: (state, action) => {
            Object.assign(state, action.payload);
        },
        clearUser: (state) => {
            state = initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfileInfo.fulfilled, (state, action) => {
            Object.assign(state, action.payload);
        })
        .addCase(fetchProfileInfo.rejected, (state, action) => {
            state = initialState;
        })  
    }
})

export const {setUser,clearUser} = ProfileSlice.actions;

export const fetchProfileInfo:any = createAsyncThunk('profile/fetchProfileInfo', async (token: string,thunkAPI)=>{
    try{
        console.log(token)
        const response = await getData(`/user/profile/${token}`)
        if(Object.keys(response)[0]==='message'){
            thunkAPI.rejectWithValue(initialState);
            return thunkAPI.dispatch(
                openSnackbar({
                    open: true,
                    severity: 'warning',
                    message: 'User not found'
                })
            );
        }
        console.log(response)
        console.log(response.profileImages)
        return response;
        
    }
    catch(err){
        thunkAPI.dispatch(
            openSnackbar({
                open: true,
                severity: 'error',
                message: "Error fetching user data. Please try again."
            })
        );
    }
})

export default ProfileSlice.reducer;
   