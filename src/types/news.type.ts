export type NewsType = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
  urlToImage: string;
};
export type GuardianNewsType = {
  id: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
};
export type NYTimesNewsType = {
  snippet: string;
  pub_date: string;
  webTitle: string;
  web_url: string;
  lead_paragraph:string;
  byline: {
    original: string;
  };
  multimedia: Array<{
    url: string;
  }>
};

export type NewsDataType = {
  data: Array<NewsType>;
  page: number;
  per_page: number;
  total_pages: number;
  loading: boolean;
  error: string;
  query:string;
  fromDate: string;
  toDate: string;
  apiType: string;
};

export enum NewsApiType {
  NewsApi = 'news api',
  GuardianApi = 'the guardian',
  NYTimesApi = 'new york times',
}

export type NewsApiResponseType = {
  status: string;
  totalResults: number;
  articles: NewsType[];
};