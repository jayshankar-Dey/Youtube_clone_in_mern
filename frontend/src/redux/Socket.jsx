import { createSlice } from "@reduxjs/toolkit";




const SocketSlice=createSlice({
    name: 'socket',
    initialState:{
        socket:null
    },
    reducers:{
        setSocket:(state,action)=>{
            state.socket=action.payload
        }
    }
})

export default SocketSlice
export const {setSocket}=SocketSlice.actions