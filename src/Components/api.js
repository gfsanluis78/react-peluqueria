import axios from 'axios';

export default axios.create({
  baseURL: "https://localhost:44327/api/"
  //baseURL: process.env.REACT_APP_URL_BASE
});

export const axiosPrivate = axios.create({
  baseURL: "https://localhost:44327/api/",
  headers: { 'Content-Type': 'application/json' },
  //withCredentials: true
});