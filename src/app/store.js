import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlices";
import themeReducer from "../features/theme/themeSlice";

let persistedState;
try{
const savedState = localStorage.getItem("reduxState");


persistedState = savedState
? JSON.parse(savedState)
: undefined;
}catch(error){
    persistedState=undefined;
}


export const store = configureStore({
  reducer: {
    todo: todoReducer,
    theme: themeReducer,
  },
  preloadedState: persistedState,
});



store.subscribe(() => {
  localStorage.setItem(
    "reduxState",
    JSON.stringify(store.getState())
  );
});