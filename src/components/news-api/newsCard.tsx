import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import News from '../../assets/news.jpeg';
import { NewsType } from '../../types/news.type';
import { CardActionArea } from '@mui/material';

export default function NewsCard({
  article: { urlToImage, title, description, url, publishedAt, author },
}: {
  article: NewsType;
}) {

  const publishedAtDate = new Date(publishedAt).toLocaleDateString();
  
  return (
      <CardActionArea component="a" href={url} target="_blank" sx={{ textDecoration: 'none', color: 'inherit' }}>
      <Card sx={{ display: 'flex', cursor: 'pointer'}}>
        <CardMedia component="img" sx={{ width: 151 }} image={urlToImage || News} alt={'no image loaded'}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src=News;
        }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="subtitle1">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              {description || 'No description'}
            </Typography>
            <Box sx={{ pt:2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" display="block" gutterBottom>
                {author}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                {publishedAtDate}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Card>
        </CardActionArea>
  );
}
