import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  isLogin: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setIsLogin: (state) => {
      state.isLogin = true;
    },
  },
});

export { globalSlice };
export const { setMode, setIsLogin } = globalSlice.actions;
export default globalSlice.reducer;
