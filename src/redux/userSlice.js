import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    fullName: "",
    password: "",
    id: "",
    token: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        register: (state, action) => {
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.password = action.payload.password;
        },
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

export const { register, login, logout } = userSlice.actions;

export const userSliceReducer = userSlice.reducer;