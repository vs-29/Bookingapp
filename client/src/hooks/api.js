
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8800'
});

export default axiosInstance;
