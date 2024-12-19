import { createSlice } from "@reduxjs/toolkit";

const ChatSlice = createSlice({
    name: "ChatSlice",

    initialState: {
        allPromptData: [],
        promptData: {
            heading: "",
            data: []
        },
        displayEditPromptSection: false,
    },

    reducers: {
        //= Add prompt data 
        addPromptData: (state, action) => {
            let { id, heading, data } = action.payload;
            state.promptData.heading = heading;
            state.promptData.data = [...state.promptData.data, data];
            state.allPromptData[id] = state.promptData;
        },

        //= Update prompt data
        updatePromptData: (state, action) => {
            let { id, dataId, updatePrompt } = action.payload;
            // let prop = state.allPromptData[id].data[dataId].prompt
            // state.allPromptData = [...state.allPromptData, { prompt: updatePrompt }];
        },

        //= Display edit prompt section
        setDisplayEditPromptSection: (state, action) => {
            state.displayEditPromptSection = action.payload;
        },

        //= Rename prompt heading
        renamePromptHeading: (state, action) => {
            state.allPromptData = action.payload
        }
    }
});

export default ChatSlice.reducer;

export const { autoAddPromptData, addPromptData, updatePromptData, setDisplayEditPromptSection, renamePromptHeading } = ChatSlice.actions;