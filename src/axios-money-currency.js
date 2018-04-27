import axios from 'axios';

const instance = axios.create({
  baseURL:
    'http://data.fixer.io/api/latest?access_key=1d3ca3a5cc3781a2f2d1d4863c29242d&format=1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default instance;
