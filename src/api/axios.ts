import axios from "axios";

export const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const todosAPI = {
  getTodos() {
    return instance.get("/todos");
  },
  getTodo(id: number) {
    return instance.get(`/todos/${id}`);
  },
//   putSportsmans(sportsmansAndTeam) {
//     return instance.put("/sportsmans", { sportsmansAndTeam });
//   },
//   deleteSportsman(id) {
//     return instance.delete(`/sportsmans/${id}`, { id });
//   },
};