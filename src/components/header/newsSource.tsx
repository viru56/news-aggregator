import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { NewsApiType } from '../../types/news.type';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setNewsApi, fetchNews } from '../news-api/newsApiSlice';

export default function NewsSource() {
  const dispatch = useAppDispatch();
  const apiTpye = useAppSelector((state) => state.news.apiType);

  const handleChange = (event: SelectChangeEvent) => {
    const type = event.target.value as NewsApiType
    dispatch(setNewsApi(type));
    dispatch(fetchNews());
  };

  return (
    <>
    <FormControl size="small" fullWidth>
      <InputLabel id="news-source">News Source</InputLabel>
      <Select
        labelId="news-source"
        id="news-source"
        value={apiTpye}
        label="Select News Source"
        onChange={handleChange}
      >
        <MenuItem value={NewsApiType.GuardianApi}>{NewsApiType.GuardianApi}</MenuItem>
        <MenuItem value={NewsApiType.NewsApi}>{NewsApiType.NewsApi}</MenuItem>
        <MenuItem value={NewsApiType.NYTimesApi}>{NewsApiType.NYTimesApi}</MenuItem>
      </Select>
    </FormControl>
    </>
  );
}