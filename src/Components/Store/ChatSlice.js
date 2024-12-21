import { createSlice } from "@reduxjs/toolkit";

const ChatSlice = createSlice({
    name: "ChatSlice",

    initialState: {
        historyData: [],
        chatDataStatus: false,
        displayEditPromptSection: false,
    },

    reducers: {
        //= Add History data 
        addFirstHistoryData: (state, action) => {
            let { historyId, data } = action.payload;
            // state.chatData.historyId = historyId;
            // state.chatData.heading = heading;
            // state.chatData.data = [...state.chatData.data, data];
            let chatData = { historyId: historyId, heading: data.prompt, data: [data] }
            state.historyData = [...state.historyData, chatData];
        },

        addHistoryData: (state, action) => {
            let { historyId, data } = action.payload;
            // state.chatData.data = [...state.chatData.data, data];
            state.historyData[historyId].data = [...state.historyData[historyId].data, data];
        },

        setChatDataStatus: (state, action) => {
            state.chatDataStatus = action.payload
        },

        //= Update history data
        updateHistoryData: (state, action) => {
            // let { id, dataId, updatePrompt } = action.payload;
            // let prop = state.historyData[id].data[dataId].prompt
            // state.historyData = [...state.historyData, { prompt: updatePrompt }];
        },

        //= Display edit history section
        setDisplayEditPromptSection: (state, action) => {
            state.displayEditPromptSection = action.payload;
        },

        //= Rename history heading
        renameHistoryHeading: (state, action) => {
            state.historyData = action.payload
        }
    }
});

export default ChatSlice.reducer;

export const { addHistoryData, addFirstHistoryData, setChatDataStatus, updateHistoryData, setDisplayEditPromptSection, renameHistoryHeading, } = ChatSlice.actions;