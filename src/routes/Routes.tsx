import { Routes, Route } from "react-router";
import Main from "../app/pages/Main";
import DetailTodo from "../app/pages/DetailTodo";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/todo/:id" element={<DetailTodo />}></Route>
    </Routes>
  );
};

export default AppRoutes;