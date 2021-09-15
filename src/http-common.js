import axios from "axios";

const url = 'https://desolate-cove-91969.herokuapp.com/api';

export default axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json"
  }
});
