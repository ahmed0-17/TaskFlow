import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlices";
import themeReducer from "../features/theme/themeSlice";
import searchReducer from "../features/search/searchSlice";

let persistedState;
try{
const savedState = localStorage.getItem("reduxState");
persistedState = savedState
? JSON.parse(savedState)
: undefined;
}catch(error){
    persistedState=undefined;
}

if (persistedState?.todo) {
  persistedState.todo.editingTodo = null;
}

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    theme: themeReducer,
    search: searchReducer,
  },
  preloadedState: persistedState,
});



store.subscribe(() => {
  try{
  localStorage.setItem(
    "reduxState",
    JSON.stringify(store.getState())
    
  );}catch(error){
    console.error("failed to  save state : ",error);
  }

});