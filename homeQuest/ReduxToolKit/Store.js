import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/UserSlice";
import favPropertySlice from "./slices/FavPropertySlice";
import allPropertySlice from "./slices/AllPropertySlice";
import  lastLoginSlice  from "./slices/LastLoginSlice";


const Store =configureStore({
    reducer:{
        users:userSlice,
        favProperties:favPropertySlice,
        allProperties:allPropertySlice,
        lastLoginUser:lastLoginSlice,
    }
    
})

export default Store