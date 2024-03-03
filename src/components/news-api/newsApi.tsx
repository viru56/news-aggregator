import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import NewsCard from './newsCard';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setPage, fetchNews } from './newsApiSlice';
import { showBackdrop } from '../../lib/backdrop/backdropSlice';

export default function NewsApi() {
  const dispatch = useAppDispatch();
  const newsState = useAppSelector((state) => state.news);
  useEffect(() => {
    dispatch(showBackdrop(newsState.loading));
  }, [newsState.loading, dispatch]);
  const getNews = useCallback(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    getNews();
  }, [getNews]);
  useEffect(() => {
    if(newsState.error){
      alert(newsState.error);
    }
  },[newsState.error])
  const nextPage = () => {
    dispatch(setPage(newsState.page + 1));
    getNews();
  }
  const previousPage = () => {
    dispatch(setPage(newsState.page - 1));
    getNews();
  }
  const isLastPage = (newsState.per_page * (newsState.page)) > newsState.total_pages;
  const pageInfo = `${((newsState.page - 1) * newsState.per_page) || 1} - ${isLastPage ? newsState.total_pages : (newsState.per_page * (newsState.page))}  of ${newsState.total_pages} articles`;
  return (
    <>
        {
            newsState.total_pages > 0 &&
        <Box component="div" sx={{ float: 'right' }}>
            <Typography variant="body2" component="span" sx={{ my: 2 }}>
            {pageInfo}
            </Typography>
            <IconButton color="primary" disabled={newsState.page === 1} onClick={previousPage}>
            <NavigateBeforeIcon />
            </IconButton>
            <IconButton color="primary" 
            onClick={nextPage}
            disabled={(newsState.per_page * (newsState.page)) >= newsState.total_pages}>
            <NavigateNextIcon />
            </IconButton>
        </Box>
        }
      <Grid container spacing={2} sx={{ my: 2 }}>
        {newsState.data.map((article, index) => (
          <Grid xs={12} item key={index}>
            <NewsCard article={article} />
          </Grid>
        ))}
      </Grid>
      {
        newsState.total_pages === 0 && <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
          {newsState.loading ? 'Loading...' : 'No news found'}
          </Typography>
      }
    </>
  );
}
