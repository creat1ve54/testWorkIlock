import axios from "axios";
import { ITodo } from "../type";

export const instance = axios.create({
  baseURL: "https://json-server-1-osfy.onrender.com",
  headers: {
    Accept: "application/json",
  },
  // baseURL: "http://localhost:3004/",
});

export const todosAPI = {
  getTodos(page: number, limit: number) {
    return instance.get(`/todos?_page=${page}&_limit=${limit}`);
    // return instance.get("/todos");
  },
  getSearchTodos(q: string, page: number, limit: number) {
    return instance.get(`/todos?title_like=${q}&_page=${page}&_limit=${limit}`);
  },
};

export const todoAPI = {
  getTodo(id: string) {
    return instance.get(`/todos/${id}`);
  },
  postTodo(todo: Partial<ITodo>) {
    return instance.post(`/todos`, todo);
  },
  putTodo(id: string, updateTodo: Partial<ITodo>) {
    return instance.put(`/todos/${id}`, updateTodo);
  },
  delteTodo(id: string) {
    return instance.delete(`/todos/${id}`);
  },
};

export const usersAPI = {
  getUsers() {
    return instance.get("/users");
  },
};
