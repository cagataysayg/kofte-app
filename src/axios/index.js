import axios from "axios";
import cookies from "../cookies";

export default axios.create({
  baseURL: "http://144.91.113.217:5000",
  headers: { authorization: cookies.get("accessToken") },
});
