import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './slices/User'
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    version: 1,
    storage
}
const reducer = combineReducers({
    user: UserReducer
})
const persistedReducer = persistReducer(persistConfig, reducer)
const store = configureStore({
    reducer: persistedReducer
})
export default store