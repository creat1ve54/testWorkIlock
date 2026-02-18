import { Routes, Route } from "react-router";
import Main from "../app/pages/Main";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
    </Routes>
  );
};

export default AppRoutes;