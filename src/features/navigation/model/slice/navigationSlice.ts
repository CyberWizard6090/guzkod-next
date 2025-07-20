// features/navigation/model/slice/navigationSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NavigationItem } from '../types/navigation';
import { getNavigation } from '../api/navigation.api';
import { sidebarData } from '../utils/navigation-data';

type NavigationState = {
  items: NavigationItem[];
  loading: boolean;
  error: string | null;
}

const initialState: NavigationState = {
  items: [],
  loading: false,
  error: null,
};

// Асинхронный thunk для загрузки меню
export const fetchNavigation = createAsyncThunk(
  'navigation/fetchNavigation',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await getNavigation();
      if (error) {
        return rejectWithValue(error.message);
      }
      return [...sidebarData, ...data.layout];
    } catch (e) {
      return rejectWithValue('Ошибка загрузки навигации');
    }
  },
);

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavigation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNavigation.fulfilled, (state, action: PayloadAction<NavigationItem[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchNavigation.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default navigationSlice.reducer;
