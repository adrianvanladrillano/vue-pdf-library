import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.100.77:8080",
  headers: {
    "Content-type": "application/json"
  }
});
