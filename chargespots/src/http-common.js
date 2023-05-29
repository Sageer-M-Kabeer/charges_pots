import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/login/",
  headers: {
    "Content-type": "application/json"
  }
});