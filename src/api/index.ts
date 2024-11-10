import axios, { CreateAxiosDefaults } from 'axios';

const axiosConfig: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_BASE_URL || '/api',
};

export const httpClient = axios.create(axiosConfig);
