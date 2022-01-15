import axios from "axios";
const URL = "https://jsonplaceholder.typicode.com/";

export default {
  getAllPosts() {
    return axios.get(URL + `posts`);
  },
  getPosts(number) {
    return axios.get(URL + `posts?_limit=` + number);
  },
  getPostId(id) {
    return axios.get(URL + `posts/` + id);
  },
  getUserId(id) {
    return axios.get(URL + `users/` + id);
  },
  getUsers() {
    return axios.get(URL + `users`);
  },
};
