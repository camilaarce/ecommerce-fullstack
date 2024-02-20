import axios from 'axios';

const instance = axios.create({
    //baseURL: 'https://ecommerce-o9xm.onrender.com',
     baseURL: 'http://localhost:8000'
});

export default instance;
