import axios from 'axios';
import { RootState } from '..';
import { GuardianNewsType } from '../../types/news.type';
const apiKey = import.meta.env.VITE_GUARDIAN_API_KEY;
const API_BASE_URL = 'https://content.guardianapis.com/search';


export const guardianNewsApi = async (state: RootState) => {
    const params:{
        'api-key': string;
        'page-size': number;
        page: number;
        q: string;
        'from-date'?: string;
        'to-date'?: string;
    } = {
        'api-key': apiKey,
        'page-size': state.news.per_page,
        page: state.news.page,
        q: state.news.query ? `"${state.news.query}"` : ''
    };
    if(state.news.fromDate){
        params['from-date'] = state.news.fromDate;
    }
    if(state.news.toDate){
        params['to-date'] = state.news.toDate;
    }
    const response = await axios.get(`${API_BASE_URL}`, {
        params
    });
    return {
        status: response.data.response.status,
        articles: response.data.response.results.map((item: GuardianNewsType) => ({
            author: '',
            content: '',
            description: '',
            publishedAt: item.webPublicationDate,
            title: item.webTitle,
            url: item.webUrl,
            urlToImage: '',
        })),
        totalResults: response.data.response.total,
    };
};