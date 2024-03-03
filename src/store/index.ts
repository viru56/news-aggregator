import { configureStore } from '@reduxjs/toolkit';
import newsApiReducer from '../components/news-api/newsApiSlice';
import backdropReducer from '../lib/backdrop/backdropSlice';
export const store = configureStore({
  reducer: {
    backdrop: backdropReducer,
    news: newsApiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
