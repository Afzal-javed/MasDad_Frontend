import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    fullName: "",
    id: "",
    token: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.email = action.payload.user?.email;
            state.fullName = action.payload.user?.fullName;
            state.id = action.payload.user?.id;
            state.token = action.payload.token
        },
        logout: (state, action) => {
            state.email = "";
            state.fullName = "";
            state.id = "";
            state.token = ""
        }
    }
})

export const { login, logout } = userSlice.actions;

export const userSliceReducer = userSlice.reducer;