import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/access/'/* 'https://desolate-cove-91969.herokuapp.com/api/access/' */;

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();