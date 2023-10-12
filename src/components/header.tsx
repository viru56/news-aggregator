import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ p: 1, textAlign: 'center' }} color="primary">
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Users
        </Typography>
      </AppBar>
    </Box>
  );
}
