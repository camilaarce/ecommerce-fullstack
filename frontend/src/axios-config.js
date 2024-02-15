import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ecommerce-o9xm.onrender.com',
});

export default instance;
