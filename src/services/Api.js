import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8989';

export const setAuthHeader = (token) => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const register = async (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const login = async (userData) => {
    return axios.post(`${API_URL}/login`, userData);
};

export const fetchItems = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthHeader(token);
        // return axios.get(`${API_URL}/api/items`);
    }
    // throw new Error('Unauthorized');
    return axios.get(`${API_URL}/api/items`);
};

export const addItem = async (itemData) => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthHeader(token);
        // return axios.post(`${API_URL}/api/items`, itemData);
    }
    return axios.post(`${API_URL}/api/items`, itemData);
};

export const editItem = async (itemId, itemData) => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthHeader(token);
        // return axios.put(`${API_URL}/api/items/${itemId}`, itemData);
    }
    return axios.put(`${API_URL}/api/items/${itemId}`, itemData);
};

export const getItemById = async (itemId) => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthHeader(token);
        // return axios.get(`${API_URL}/api/items/${itemId}`);
    }
    return axios.get(`${API_URL}/api/items/${itemId}`);
};

export const deleteItemById = async (itemId) => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthHeader(token);
        // return axios.delete(`${API_URL}/api/items/${itemId}`);
    }
    return axios.delete(`${API_URL}/api/items/${itemId}`);
};

export const logout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthHeader(token);
        localStorage.clear();
        return axios.post(`${API_URL}/signout`);
    }
};
