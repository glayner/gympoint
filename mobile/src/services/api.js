import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.25.29:3334',
});

export default api;
