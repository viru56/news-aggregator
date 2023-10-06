import Avatar from '@mui/material/Avatar';
import { Grid, Typography } from '@mui/material';

type User = {
  id: number,
  first_name: string;
  last_name: string;
  avatar: string;
}
export default function User({user}:{user:User}) {
  return (
    <Grid container alignItems="center" spacing={{md: 6, sm: 3, xs: 2}} sx={{p:4}}>
    <Grid item>
      <Avatar src={user.avatar} sx={{width: 56, height: 56}} />
    </Grid>
    <Grid item>
      <Typography variant='h6'>{user.first_name} {user.last_name}</Typography>
    </Grid>
  </Grid>
  );
}