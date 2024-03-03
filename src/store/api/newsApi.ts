import axios, { AxiosError } from 'axios';
import { RootState } from '..';
const apiKey = import.meta.env.VITE_NEWS_API_KEY;
const language = 'en';
const API_BASE_URL = 'https://newsapi.org/v2/';


export const newsApi = async (state: RootState) => {
    let url = API_BASE_URL;
    if(state.news.query === ''){
        url = API_BASE_URL + 'top-headlines';
    } else {
        url = API_BASE_URL + 'everything';
    }
    const params:{
        language: string;
        apiKey: string;
        pageSize: number;
        page: number;
        q: string;
        from?: string;
        to?: string;
    } = {
        language,
        apiKey: apiKey,
        pageSize: state.news.per_page,
        page: state.news.page,
        q: state.news.query ? `"${state.news.query}"` : ''
    };
    if(state.news.fromDate){
        params['from'] = state.news.fromDate;
    }
    if(state.news.toDate){
        params['to'] = state.news.fromDate;
    }
    try {
        const response = await axios.get(`${url}`, {
            params
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = ((error as AxiosError).response?.data as {message: string}).message;
            throw new Error(errorMessage || 'An error occurred');
        }
        throw error;
    }
};