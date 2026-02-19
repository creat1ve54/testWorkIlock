import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { todosThunk } from "../../redux/todos/todosSlice";
import Header from "../components/Header";
import { Link } from "react-router";

const Main = () => {
  const dispatch = useAppDispatch();
  const { todos, isLoading, error } = useAppSelector(
    (state) => state.todosSlice,
  );

  useEffect(() => {
    dispatch(todosThunk());
  }, []);

  console.log(todos);

  return (
    <div className="main">
      <Header />
      <div className="container">
        <div className="main__container">
          {isLoading ? (
            <div>Загрузка...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            todos.map((todo) => (
              <Link to={`/todo/${todo.id}`} key={todo.id}>
                <h3>{todo.title}</h3>
                <p>{todo.description ? todo.description : "Нет описания"}</p>
                <div>Статус: {todo.status}</div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
