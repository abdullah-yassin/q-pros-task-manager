import axios from 'axios';

const baseUrl = 'https://q-pros-task-manager-default-rtdb.firebaseio.com/';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export default axiosInstance;
