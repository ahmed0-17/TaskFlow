import {createSlice } from "@reduxjs/toolkit";

let initialState={theme:"light"}
let themeslice=createSlice({
    name:"theme",
    initialState,
    reducers:{
        toggleTheme:(state,action)=>{
            state.theme=state.theme=="light"?"dark":"light"},


    }

})

export const{toggleTheme}=themeslice.actions
export default themeslice.reducer