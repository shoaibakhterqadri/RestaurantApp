import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: "", currentPage: 'Dashboard'
}
const UserCounterSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        saveToken: (state, { payload }) => {
            state.token = payload
        },
        setCurrentPage: (state, { payload }) => {
            state.currentPage = payload
        },
    }
})

export const { saveToken, setCurrentPage } = UserCounterSlice.actions

export default UserCounterSlice.reducer