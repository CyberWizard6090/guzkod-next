import { createSlice } from '@reduxjs/toolkit';

type SearchState = {
  isOpen: boolean;
};
const initialState: SearchState = {
  isOpen: false,
};
const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    openSearch: (state) => {
      state.isOpen = true;
    },
    closeSearch: (state) => {
      state.isOpen = false;
    },
  },
});
export const { openSearch, closeSearch } = SearchSlice.actions;
export default SearchSlice.reducer;
