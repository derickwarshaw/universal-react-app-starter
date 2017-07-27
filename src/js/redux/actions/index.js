import { FETCH_CONTENT } from './types';
import axios from 'axios';

export function getName() {
  return async function (dispatch, getState) {
    let {data} = await getUserFromAPI();
    dispatch({
      type: FETCH_CONTENT,
      payload: data
    });
  }
}
function getUserFromAPI() {
  return axios.get('https://jsonplaceholder.typicode.com/users/1');
}
