import Avatar from '@mui/material/Avatar';
import { Grid, Typography } from '@mui/material';
import { UserType } from '../types/user.type';

export default function User({ user }: { user: UserType }) {
  return (
    <Grid container alignItems="center" spacing={{ md: 6, sm: 3, xs: 2 }} sx={{ p: 4 }}>
      <Grid item>
        <Avatar src={user.avatar} sx={{ width: 56, height: 56 }} />
      </Grid>
      <Grid item>
        <Typography variant="h6">
          {user.first_name} {user.last_name}
        </Typography>
      </Grid>
    </Grid>
  );
}
