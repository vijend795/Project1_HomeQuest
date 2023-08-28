import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const lastLoginSlice = createSlice({
  name: "lastLoginUser",
  initialState: {
    userEmail: null,
    userStatus:null,
  },
  reducers: {
    setLastLoginUser: (state, action) => {
        console.log("action payload",action.payload)
      state.userEmail = action.payload.userEmail;
      state.userStatus = action.payload.userStatus;
      console.log("user last update State :",state)
    },
    
  },
});

export const { setLastLoginUser } = lastLoginSlice.actions;
export default lastLoginSlice.reducer




