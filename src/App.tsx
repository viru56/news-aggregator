import Container from '@mui/material/Container';
 import NewsApi from './components/news-api/newsApi';
 import Backdrop from './lib/backdrop/backdrop';
import Header from './components/header/header';
export default function App() {
  return (
    <Container maxWidth="md">
      <Header />
      <NewsApi />
      <Backdrop />
    </Container>
  );
}