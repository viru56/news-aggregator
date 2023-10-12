import { Backdrop } from '@mui/material';
import LoaderImg from '../assets/loading.svg';

export default function Loader() {
  return (
    <Backdrop invisible={true} open={true}>
      <img src={LoaderImg} />
    </Backdrop>
  );
}
