import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import userReducer from "./slices/userSlice";
import taskReducer from "./slices/tasksSlice";

const reducers = combineReducers({
  users: userReducer,
  tasks: taskReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
