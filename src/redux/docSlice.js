import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    docList: []
}

export const docSlice = createSlice({
    name: "doc",
    initialState,
    reducers: {
        setDocData: (state, action) => {
            state.docList = [...action.payload];
        }
    }
})
export const { setDocData } = docSlice.actions

export const docSliceReducers = docSlice.reducer