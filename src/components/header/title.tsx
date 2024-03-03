import { Box, Typography } from '@mui/material';
export default function Title() {
    return <Box sx={{ my: 2, textAlign: "center" }}>
    <Typography variant="h5" component="h1" fontWeight={600}>
      News Aggregator
    </Typography>
    </Box>
  }