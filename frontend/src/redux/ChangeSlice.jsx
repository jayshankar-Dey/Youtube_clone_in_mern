import {createSlice} from "@reduxjs/toolkit"

 const ChangeSlice = createSlice({
    name: 'change',
    initialState: {
        change:null
    },
    reducers: {
        setChange(state,action) {
            state.change = action.payload
        }
    }
})

export const {setChange} = ChangeSlice.actions
export default ChangeSlice