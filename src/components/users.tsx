import { Box, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import User from './user';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './header';
import Loader from './loader';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchUsers } from '../store/users';

const LoadingMessage = () => {
  return <Typography component="p" variant='body1' sx={{ textAlign: 'center', p: 2 }}>Loading...</Typography>
}
// show error mesage or show no more user in the end
const EndMessage = ({message}: {message: string}) => {
  return (
    <Typography component="p" variant='body1' sx={{ textAlign: 'center', p: 2 }}>
      {message ? message : 'No More Users'}
    </Typography>
  )
}
export default function Users() {
  const dispatch = useAppDispatch();
  const usersState = useAppSelector(state=> state.users);
   const [showLoader, setShowLoader] = useState(true);

   const getUsers = () => {
    dispatch(fetchUsers());
  }

  useEffect(() => {
    // hide loader after 3 seconds
    setTimeout(() => {
      setShowLoader(false);
    }, 3000)
    // get all users
    dispatch(fetchUsers());
  }, [dispatch]);

  if (showLoader) {
    return (
     <Loader />
    )
  }
  return (
    <>
      <Header />
      <InfiniteScroll
        hasMore={usersState.hasMore}
        dataLength={usersState.total}
        next={getUsers}
        loader={<LoadingMessage />}
        endMessage={<EndMessage message={usersState.error} />}
      >

        {usersState.data?.map((user, index) => (
          <Box component="div" key={index}>
            <User user={user} />
            <Divider sx={{ marginLeft: 3 }} />
          </Box>
        ))}
      </InfiniteScroll>
    </>
  );
}