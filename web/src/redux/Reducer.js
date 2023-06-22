import { combineReducers } from "redux";
import { UserCounterSlice } from "./slices/User";


export default combineReducers({
    reducers: {
        user: UserCounterSlice
    }
});