import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { todosThunk } from "../../redux/todos/todosSlice";
import Header from "../components/Header";

const Main = () => {
  const dispatch = useAppDispatch();
  const { todos, isLoading, error } = useAppSelector(
    (state) => state.postsSlice,
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
              <div key={todo.id}>
                <h3>{todo.name ? todo.name : "Нет названия"}</h3>
                <p>{todo.title}</p>
                <div>Статус: {todo.completed.toString()}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
