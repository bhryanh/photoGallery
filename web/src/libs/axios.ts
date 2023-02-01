import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_HOST;

export const api = axios.create({
        baseURL: baseURL
    });