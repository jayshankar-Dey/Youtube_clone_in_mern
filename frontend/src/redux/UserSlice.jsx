import {createSlice} from "@reduxjs/toolkit"

 const UserSlice = createSlice({
    name: 'User',
    initialState: {
       user:"hiii"
    },
    reducers: {
        setData(state,action) {
            state.user = action.payload
        }
    }
})

export const {setData} = UserSlice.actions
export default UserSlice