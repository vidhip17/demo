import { API_URL, setAuthHeader } from "../Api";
import axios from 'axios';

export const fetchAllAnnouncements = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthHeader(token);
    }
    return axios.get(`${API_URL}/api/announcements/getAllAnnouncemnt`);
};

export const fetchAllActivePublicshedAnnouncements = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthHeader(token);
    }
    return axios.get(`${API_URL}/api/announcements/getAllIsActiveAndPublisedAnnouncemnt`);
};

export const getAnnouncementById = async (id) => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthHeader(token);
    }
    return axios.get(`${API_URL}/api/announcements/getAnnouncement/${id}`);
};

export const saveAnnouncement = async (data) => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthHeader(token);
    }
    return axios.post(`${API_URL}/api/announcements/saveAnnouncement`, data);
};

export const updateAnnouncement = async (data, id) => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthHeader(token);
    }
    return axios.put(`${API_URL}/api/announcements/updateAnnouncement/${id}`, data);
};

export const deleteAnnouncement = async (id) => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthHeader(token);
    }
    return axios.delete(`${API_URL}/api/announcements/deleteAnnouncement/${id}`);
};