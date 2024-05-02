import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export default axios.create({
  baseURL: BASE_URL,
});
