export type UserType = {
  id: number,
  first_name: string;
  last_name: string;
  avatar: string;
}

export type UserStateType = {
  data: Array<UserType>;
  page: number;
  per_page: number;
  total_pages: number;
  total: number;
  loading: boolean;
  error: string;
  hasMore: boolean;
}