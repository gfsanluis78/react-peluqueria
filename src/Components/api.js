import axios from 'axios';

export default axios.create({
  baseURL: "https://localhost:44327/api/"
  //baseURL: process.env.REACT_APP_URL_BASE
});