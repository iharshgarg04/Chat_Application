import { configureStore } from "@reduxjs/toolkit";
import themesliceReducer from "./themeslice";

export const store = configureStore({
    reducer:{
        themeKey : themesliceReducer
    }
})