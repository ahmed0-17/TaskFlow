import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },

    clearSearch: (state) => {
      state.query = "";
    },
  },
});

export const {
  setSearchQuery,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;