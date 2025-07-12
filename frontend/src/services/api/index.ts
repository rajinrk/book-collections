import { createAxiosInstance } from './axiosConfig';

const defaultHeader = { 'Content-type': 'application/json' };

const getToken = () => localStorage.getItem(import.meta.env.TOKEN_NAME);

const authHeader = () => getToken() && `Bearer ${getToken()}`;

// Auth APIs
export const loginAPI = async (values: any): Promise<any> => {
  return createAxiosInstance({
    url: '/api/auth/login',
    method: 'POST',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data: values,
  });
};

export const registerAPI = async (values: any): Promise<any> => {
  return createAxiosInstance({
    url: '/api/auth/register',
    method: 'POST',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data: values,
  });
};

// Budget APIs
export const getBooksAPI = async (params: any): Promise<any> => {
  return createAxiosInstance({
    url: `/api/books`,
    method: 'GET',
    headers: { ...defaultHeader, Authorization: authHeader() },
    params,
  });
};

export const createBooksAPI = async (data: any): Promise<any> => {
  return createAxiosInstance({
    url: '/api/books/add-book',
    method: 'POST',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data,
  });
};

export const updateBookAPI = async (data: any): Promise<any> => {
  return createAxiosInstance({
    url: `/api/books/edit-book`,
    method: 'PUT',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data,
  });
};

export const deleteBookAPI = async (data: any): Promise<any> => {
  return createAxiosInstance({
    url: `/api/books/delete-book/${data._id}`,
    method: 'DELETE',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data,
  });
};
