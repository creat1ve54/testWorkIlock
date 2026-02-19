import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { todosThunk } from "../../redux/todos/todosSlice";
import Header from "../components/Header";
import TodoItem from "../components/TodoItem";

const Main = () => {
  const dispatch = useAppDispatch();
  const { todos, isLoading, error } = useAppSelector(
    (state) => state.todosSlice,
  );

  useEffect(() => {
    dispatch(todosThunk());
  }, []);

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
            <ul className="main__list">
              {todos.map((todo) => (
                <li key={todo.id} className="main__item">
                  <TodoItem todo={todo} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
