import axios from 'axios';
import { apiBaseURL } from './api';

export async function getBooksApi(page: string | null) {
    try {
        const response = await axios.get(apiBaseURL + `books/list?page=${page}`);
        return response.data;
    } catch (error) {
        //throw new Error('Error fetching books: ' + error);
        console.error('Error:', error);
    }
}

export async function getBookByIDApi(id: string) {
  try {
      const response = await axios.get(apiBaseURL + `books/details/${id}`);
      return response.data;
  } catch (error) {
      //throw new Error('Error fetching books: ' + error);
      console.error('Error:', error);
  }
}

export async function editBookApi(id: string, data: any) {
  try {
      const response = await axios.post(apiBaseURL + `books/item/` + id + `/edit`, data);
      return response.data;
  } catch (error) {
      //throw new Error('Error fetching books: ' + error);
      console.error('Error:', error);
  }
}

export async function addBookApi(data: any) {
  try {
      const response = await axios.post(apiBaseURL + `books/add`, data);
      return response.data;
  } catch (error) {
      //throw new Error('Error fetching books: ' + error);
      console.error('Error:', error);
  }
}

export async function deleteBookApi(id: string) {
    try {
        const response = await axios.delete(apiBaseURL + `books/item/` + id);
        return response.data;
    } catch (error) {
        //throw new Error('Error fetching books: ' + error);
        console.error('Error:', error);
    }
  }
  


