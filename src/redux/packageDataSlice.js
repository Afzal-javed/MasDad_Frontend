import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allData: []
    // id: "",
    // title: "",
    // planPackage: "",
    // list: []
}

export const packageDataSlice = createSlice({
    name: "packageData",
    initialState,
    reducers: {
        packageDetail: (state, action) => {
            // console.log(action.payload);
            state.allData = [...action.payload];
            // state.id = action.payload.id;
            // state.title = action.payload.title,
            //     state.planPackage = action.payload.planPackage
            // state.list = [...action.payload.list]
        }
    }
})
export const { packageDetail } = packageDataSlice.actions

export const packageSliceReducer = packageDataSlice.reducer