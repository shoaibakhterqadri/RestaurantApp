import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userId: "", email: "", isPopup: false
}
const UserCounterSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        saveuserId: (state, { payload }) => {
            state.userId = payload
        },
        saveEmail: (state, { payload }) => {
            state.email = payload
        },
        logout: (state) => {
            state.userId = ''
        },
        setIsPopup: (state, { payload }) => {
            state.isPopup = payload
        },
    }
})

export const { saveuserId, logout, saveEmail, setIsPopup } = UserCounterSlice.actions

export default UserCounterSlice.reducer