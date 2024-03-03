import { useState } from 'react';
import {setQuery, fetchNews} from '../news-api/newsApiSlice';
import { useAppDispatch } from '../../store/hooks';

 import Paper from '@mui/material/Paper';
 import InputBase from '@mui/material/InputBase';
 import Divider from '@mui/material/Divider';
 import DateDialog from './datepicker.dialog';
import { IconButton,  Tooltip } from '@mui/material';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
 import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch();
  const handleSearch = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(setQuery(searchText));
    dispatch(fetchNews());
  };
  return (
    <>
    <Paper
      component="form"
      variant='outlined'
      sx={{ display: 'flex', alignItems: 'center' }}
      onSubmit={handleSearch}
    >
      <Tooltip title="Select Date Range">
            <IconButton aria-label="date-range" color="secondary" onClick={()=> setOpen(true)}>
              <EditCalendarIcon />
            </IconButton>
          </Tooltip>
          
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search news..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        autoCorrect='on'
        autoFocus
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type='submit' color="primary" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
    <DateDialog
        open={open}
        onClose={()=>  setOpen(false)}
      />
    </>
  );
}
