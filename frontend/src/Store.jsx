import { configureStore } from "@reduxjs/toolkit";
import { LoginSlice } from "./redux/LoginSlice";
import UserSlice from "./redux/UserSlice";
import ChangeSlice from "./redux/ChangeSlice";
import SocketSlice from "./redux/Socket";



export const Store=configureStore({
    reducer:{
        login:LoginSlice.reducer,
        user:UserSlice.reducer,
        change:ChangeSlice.reducer,
        socket:SocketSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})