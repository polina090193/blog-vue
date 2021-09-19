import axios from "axios";

const url = /* 'http://localhost:8080/api' */ 'https://desolate-cove-91969.herokuapp.com/api';

export default axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json"
  }
});
