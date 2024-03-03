import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import {
  Button,
  Container,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {fetchNews, setDate} from '../../components/news-api/newsApiSlice';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function DateDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;
  const dispatch = useAppDispatch();
  const newsState = useAppSelector((state) => state.news);
  const date = new Date().toISOString().split('T')[0];
  const [fromDate, setFromDate] = useState(newsState.fromDate || date);
  const [toDate, setToDate] = useState(newsState.toDate || date);
  const handleClose = () => {
    onClose();
  };
  const handleSubmit = () => {
    dispatch(setDate({fromDate, toDate}));
    dispatch(fetchNews());
    onClose();
  };
const handleClear = () => {
  setFromDate(date);
  setToDate(date);
  onClose();
  dispatch(setDate({fromDate:'', toDate:''}));
  dispatch(fetchNews());
}

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth="sm"
      fullWidth={true}
      className="dialog"
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" component="span">
          Select Date Range
        </Typography>
        <IconButton onClick={handleClose}>
          <Cancel />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Container maxWidth="sm">
          <Grid container direction="column" spacing={2}>
            <Grid item sm={12}>
              <TextField
                variant="outlined"
                type="date"
                label="From date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                variant="outlined"
                type="date"
                label="To date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
      <DialogActions>
      <Button onClick={handleClear} color='inherit'
        >Clear</Button>
        <Button onClick={handleSubmit} 
        variant='outlined'
        disabled={
          (new Date(toDate) < new Date(fromDate)) ||
          (new Date(toDate) > new Date()) ||
          (new Date(fromDate) > new Date())
          }>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
