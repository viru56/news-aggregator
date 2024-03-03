import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/index';
export default function BackdropComponent() {
  const open = useAppSelector((state: RootState) => state.backdrop.open);
  return (
    <Backdrop
      invisible={false}
      sx={{color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
}
