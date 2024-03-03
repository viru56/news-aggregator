import axios, { AxiosError } from 'axios';
import { RootState } from '..';
import { NYTimesNewsType } from '../../types/news.type';
const apiKey = import.meta.env.VITE_NYTIMES_API_KEY;
const API_BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const Image_API_BASE_URL = 'https://static01.nyt.com/'

export const nyTimesNewsApi = async (state: RootState) => {
    const params:{
        'api-key': string;
        'page-size': number;
        page: number;
        q: string;
        'begin_date'?: string;
        'end_date'?: string;
    } = {
        'api-key': apiKey,
        'page-size': state.news.per_page,
        page: state.news.page,
        q: state.news.query
    };
    if(state.news.fromDate){
        params['begin_date'] = state.news.fromDate;
    }
    if(state.news.toDate){
        params['end_date'] = state.news.toDate;
    }
    try {
        const response = await axios.get(`${API_BASE_URL}`, {
            params
        });
        return {
            status: response.data.status,
            articles: response.data.response.docs.map((item: NYTimesNewsType) => ({
                author: item.byline?.original,
                content: item.snippet,
                description: item.lead_paragraph,
                publishedAt: item.pub_date,
                title: item.snippet,
                url: item.web_url,
                urlToImage: item.multimedia.length ? Image_API_BASE_URL+item.multimedia[0].url+'?quality=10&auto=webp' : '',
            })),
            totalResults: response.data.response.meta.hits,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = ((error as AxiosError).response?.data as {fault:{faultstring: string}})?.fault?.faultstring;
            throw new Error(errorMessage || 'An error occurred');
        }
        throw error;
    }
};