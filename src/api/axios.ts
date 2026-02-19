import axios from "axios";
import { ITodo } from "../type";

export const instance = axios.create({
  baseURL: "https://json-server-1-osfy.onrender.com",
  // baseURL: "http://localhost:3004/",
});

export const todosAPI = {
  getTodos() {
    return instance.get("/todos");
  },
  getSearchTodos(q: string) {
    return instance.get(`/todos?title:gte=${q}`);
  },
}

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
}