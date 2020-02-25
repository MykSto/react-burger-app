import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-app-76fb9.firebaseio.com/'
});

export default instance;
