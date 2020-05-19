import axios from 'axios';
import { getToken } from "../adalConfig";

export default axios.create({
  baseURL: '/api/v1/',
    proxy: {
      host: 'http://localhost',
      port: 5000
    },
  headers: { Authorization: `Bearer ${getToken()}` }
});