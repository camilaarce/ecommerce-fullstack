import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ecommerce-six-ashen-58.vercel.app/',
});

export default instance;
