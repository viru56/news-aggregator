import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NewsDataType, NewsApiType, NewsApiResponseType } from '../../types/news.type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { guardianNewsApi } from '../../store/api/guardinNewsApi';
import { newsApi } from '../../store/api/newsApi';
import { nyTimesNewsApi } from '../../store/api/nyTimesNewsApi';


export const fetchNews = createAsyncThunk('news', async (_, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  if(state.news.apiType === NewsApiType.GuardianApi){
    return guardianNewsApi(state);
  } else if (state.news.apiType === NewsApiType.NewsApi){
    return newsApi(state);
  } else if (state.news.apiType === NewsApiType.NYTimesApi){
    return nyTimesNewsApi(state);
  }
});

export const newsApiSlice = createSlice({
  name: 'news-api',
  initialState: {
    data: [],
    page: 1,
    per_page: 10,
    total_pages: 0,
    loading: false,
    error: '',
    query: '',
    fromDate: '',
    toDate: '',
    apiType: localStorage.getItem('APP_NEWS_API') || NewsApiType.GuardianApi,
  } as NewsDataType,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setDate: (state, action: PayloadAction<{fromDate: string, toDate: string}>) => {
      state.fromDate = action.payload.fromDate;
      state.toDate = action.payload.toDate;
      state.page = 1;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.page = 1;
    },
    setNewsApi: (state, action: PayloadAction<NewsApiType>) => {
      localStorage.setItem('APP_NEWS_API', action.payload);
      state.apiType = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, { payload }: PayloadAction<NewsApiResponseType>) => {
        state.data = payload.articles;
        state.total_pages = payload.totalResults;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.error = action.error.message || 'Some error occurred';
        state.loading = false;
        state.data = [];
        state.total_pages = 0;
      });
  },
});
newsApiSlice

export const {
  setPage,
  setQuery,
  setNewsApi,
  setDate,
} = newsApiSlice.actions;

export default newsApiSlice.reducer;
