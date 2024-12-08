import { combineReducers } from "@reduxjs/toolkit";
import ChatSlice from "./ChatSlice"

const CombineReducers = combineReducers({
    ChatSlice: ChatSlice
});

export default CombineReducers;