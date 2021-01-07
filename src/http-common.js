import axios from "axios";

export default axios.create({
  baseURL: "https://5fa103ace21bab0016dfd97e.mockapi.io/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});
