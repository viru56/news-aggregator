import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserStateType } from '../types/user.type';
import { RootState } from './';
const API_BASE_URL = 'https://reqres.in/api/users/';

export const fetchUsers = createAsyncThunk('users/fetchUers', async (_, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const page = state.users.page + 1;
  const per_page = state.users.per_page;
  const response = await axios.get(`${API_BASE_URL}?page=${page}&&per_page=${per_page}`);
  return response.data;
});
export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    page: 0,
    per_page: 10,
    total_pages: 0,
    total: 0,
    loading: false,
    error: '',
    hasMore: true,
  } as UserStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }: PayloadAction<UserStateType>) => {
        state.data = [...state.data, ...payload.data];
        state.total = payload.total;
        state.page = payload.page;
        state.total_pages = payload.total_pages;
        state.loading = false;
        state.error = '';
        if (payload.page === payload.total_pages) {
          state.hasMore = false;
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log(action.error.message);
        state.error = action.error.message || 'Some error occurred';
        state.hasMore = false;
      });
  },
});

export default usersSlice.reducer;
