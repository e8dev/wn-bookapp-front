import axios from 'axios';
import { apiBaseURL } from './api';

async function fetchData(url: string, method: string, data?: any): Promise<any> {
  try {
    const response = await axios({ method, url, data });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error fetching data');
  }
}

export async function getBooksApi(page: string | null) {
  return fetchData(apiBaseURL + `books/list?page=${page}`, 'GET');
}

export async function getBookByIDApi(id: string) {
  return fetchData(apiBaseURL + `books/details/${id}`, 'GET');
}

export async function editBookApi(id: string, data: any) {
  return fetchData(apiBaseURL + `books/item/${id}/edit`, 'POST', data);
}

export async function addBookApi(data: any) {
  return fetchData(apiBaseURL + `books/add`, 'POST', data);
}

export async function deleteBookApi(id: string) {
  return fetchData(apiBaseURL + `books/item/${id}`, 'DELETE');
}

export async function searchBookApi(s_text: string, s_item: string, page: string) {
  return fetchData(apiBaseURL + `books/list?page=${page}&search_q=${s_text}&search_item=${s_item}`, 'GET');
}
