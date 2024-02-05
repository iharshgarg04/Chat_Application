import { configureStore } from "@reduxjs/toolkit";
import themesliceReducer from "./themeslice";
import refreshSidebar from "./refreshSidebar";

export const store = configureStore({
    reducer:{
        themeKey : themesliceReducer,
        refreshKey:refreshSidebar,
    }
})