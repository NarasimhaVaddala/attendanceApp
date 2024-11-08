import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";


const initialState = {
    loading:false,
    error:"",
    message:"",

}



export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state , action)=>{
                
        }
    },


 
})


export const {login} = authSlice.actions;
export default authSlice.reducer;