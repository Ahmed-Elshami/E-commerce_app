import { configureStore } from "@reduxjs/toolkit";
import { categoriyReducer } from "./CategorySlice";

export let store =configureStore({
    reducer:{
        category:categoriyReducer
    }
})