import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;