import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../service/api";

interface Adress {
  street: String;
  city: String;
  state: String;
  zip: String;
  country: String;
}

interface Avatar {
  avatar: string;
  fileName: string;
  uploadedAt: Date;
}

interface ProfileImages {
  url: string;
  uploadDate: Date;
}

interface GeneralSettings {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: "male" | "female" | "Don't want to state";
  role: "standardUser" | "designer" | "admin";
  phone: string;
  adress?: Adress;
  avatar: Avatar | null;
  profileImages: ProfileImages[] | ProfileImages | null;
}

const initialState: GeneralSettings = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  dateOfBirth: "",
  gender: "male",
  role: "standardUser",
  phone: "",
  adress: {
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  },
  avatar: {
    avatar: "",
    fileName: "",
    uploadedAt: new Date(),
  },
  profileImages: [
    {
      url: "",
      uploadDate: new Date(),
    },
  ],
};

export const fetchGeneralSettings = createAsyncThunk(
  "generalSettings/fetchGeneralSettings",
  async (_, thunkAPI) => {
    const response = await getData(`/user/settings/general`);
    return response;
  }
);

const generalSettingsSlice = createSlice({
  name: "generalSettings",
  initialState,
  reducers: {
    changedAvatar: (state, action: PayloadAction<Avatar>) => {
      state.avatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchGeneralSettings.fulfilled,
      (state, action: PayloadAction<GeneralSettings>) => {
        return action.payload;
      }
    );
  },
});

export const { changedAvatar } = generalSettingsSlice.actions;
export default generalSettingsSlice.reducer;
