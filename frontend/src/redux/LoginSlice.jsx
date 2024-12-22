import {createSlice} from "@reduxjs/toolkit"

export const LoginSlice = createSlice({
    name: 'login',
    initialState: {
       login:false
    },
    reducers: {
        islogin(state,action) {
            state.login = action.payload
        }
    }
})

export const {islogin} = LoginSlice.actions