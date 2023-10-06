import { Box, Divider, Typography, Backdrop } from '@mui/material';
import { useEffect, useState } from 'react';
import User from './user';
import { getUsers } from '../services/user.service';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderImg from '../assets/loading.svg';
import Header from './header';
type User = {
  id: number,
  first_name: string;
  last_name: string;
  avatar: string;
}
const Loader = () => {
  return <Typography component="p" variant='body1' sx={{ textAlign: 'center', p: 2 }}>Loading...</Typography>
}
const EndMessage = () => {
  return (
    <Typography component="p" variant='body1' sx={{ textAlign: 'center', p: 2 }}>
      No More Users
    </Typography>
  )
}
export default function Users() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [fetching, setFetching] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const per_page = 10;
  const fetchUsers = async () => {
    if (fetching) return;
    setFetching(true);
    const data = await getUsers({ page: page + 1, per_page });
    setUsers((prev) => [...prev, ...data.data]);
    setTotalPages(data.total_pages)
    setPage(page + 1);
    setFetching(false);
  }
  useEffect(() => {
    fetchUsers();
    setTimeout(() => {
      setShowLoader(false);
    }, 3000)
  }, []);
  if (showLoader) {
    return (
      <Backdrop
        invisible={true}
        open={true}
      >
        <img src={LoaderImg} />
      </Backdrop>
    )
  }
  return (
    <>
      <Header />
      <InfiniteScroll
        hasMore={totalPages > 0 && page <= totalPages}
        dataLength={users.length}
        next={fetchUsers}
        loader={<Loader />}
        endMessage={<EndMessage />}
      >

        {users?.map((user, index) => (
          <Box component="div" key={index}>
            <User user={user} />
            <Divider sx={{ marginLeft: 3 }} />
          </Box>
        ))}
      </InfiniteScroll>
    </>
  );
}