import { configureStore } from "@reduxjs/toolkit";
import CombineReducers from "./CombineReducer";

const Store = configureStore({
    reducer: CombineReducers
});

export default Store;