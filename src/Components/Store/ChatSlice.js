import { createSlice } from "@reduxjs/toolkit";

const ChatSlice = createSlice({
    name: "ChatSlice",

    initialState: {
        allPromptData: [],
        displayChatSection: {
            chatSection: false,
            promptSection: false,
            editPromptSection: false,
        }
    },

    reducers: {
        //= Add prompt data 
        addPromptData: (state, action) => {
            state.allPromptData = [...state.allPromptData, action.payload];
            state.displayChatSection = { ...state.displayChatSection, chatSection: true, promptSection: true };
        },

        //= Update prompt data
        updatePromptData: (state, action) => {
            state.allPromptData = action.payload;
            state.displayChatSection = { ...state.displayChatSection, promptSection: true, editPromptSection: false };
        },

        //= Display edit prompt section
        displayEditPromptSection: (state, action) => {
            let { promptSection, editPromptSection } = action.payload
            state.displayChatSection = { ...state.displayChatSection, promptSection: promptSection, editPromptSection: editPromptSection };
        }
    }
});

export default ChatSlice.reducer;

export const { addPromptData, updatePromptData, displayEditPromptSection } = ChatSlice.actions;