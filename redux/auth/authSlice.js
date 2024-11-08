import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state , action)=>{

        }
    },


    extraReducers:(builder)=>{
        
    }
})


export const {login} = authSlice.actions;
export default authSlice.reducer;