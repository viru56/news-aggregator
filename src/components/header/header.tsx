import Search from './search';
import NewsSource from './newsSource';
import { Grid } from '@mui/material';
import Title from './title';

function Header() {
  return (
    <>
      <Title />
      <Grid container spacing={1}>
        <Grid item sm={4} xs={12}>
          <NewsSource />
        </Grid>
        <Grid item sm={8} xs={12}>
          <Search />
        </Grid>
      </Grid>
    </>
  );
}

export default Header;
