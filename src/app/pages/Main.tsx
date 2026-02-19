import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { todosThunk } from "../../redux/todos/todosSlice";
import Header from "../components/Header";
import TodoItem from "../components/TodoItem";
import Search from "../components/Search";

const Main = () => {
  const dispatch = useAppDispatch();
  const { todos, isLoading, error } = useAppSelector(
    (state) => state.todosSlice,
  );

  const [searchQuery, setSearchQuery] = useState("");

  const filteredTodos = useMemo(() => {
    if (!searchQuery.trim()) return todos;

    const query = searchQuery.toLowerCase().trim();

    return todos.filter(
      (todo) =>
        (todo.title && todo.title.toLowerCase().includes(query)) ||
        (todo.description && todo.description.toLowerCase().includes(query)) ||
        (todo.status && todo.status.toLowerCase().includes(query)),
    );
  }, [todos, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    dispatch(todosThunk());
  }, [dispatch]);

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
            <div>
              <Search onSearch={handleSearch} />
              <ul className="main__list">
                {filteredTodos.map((todo) => (
                  <li key={todo.id} className="main__item">
                    <TodoItem todo={todo} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
