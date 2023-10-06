import Axios from 'axios';
type Params = {
  per_page: number,
  page: number
}

export const getUsers = async(params: Params) => {
  try {
    const result = await Axios.get(`https://reqres.in/api/users?page=${params.page}&&per_page=${params.per_page}`);
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}