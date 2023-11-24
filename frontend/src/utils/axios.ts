import axios from 'axios';
import { HOST_API } from './config';

const instance = axios.create({
    baseURL: HOST_API,
});

instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default instance;
