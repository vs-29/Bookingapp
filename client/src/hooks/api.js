
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://vsp-booking.onrender.com'
});

export default axiosInstance;
