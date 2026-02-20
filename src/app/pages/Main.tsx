import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSearchTodos, todosThunk } from "../../redux/todos/todosSlice";
import Header from "../components/Header";
import TodoItem from "../components/TodoItem";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";

const Main = () => {
  const dispatch = useAppDispatch();
  const { todos, paginations, isLoading, error } = useAppSelector(
    (state) => state.todosSlice,
  );

  const [searchQuery, setSearchQuery] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const searchQueryFromUrl = searchParams.get("q") || "";

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());

      if (searchQuery.trim()) {
        prev.set("q", searchQuery.trim());
      } else {
        prev.delete("q");
      }

      return prev;
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    setSearchParams((prev) => {
      if (query.trim()) {
        prev.set("q", query.trim());
        prev.set("page", "1");
      } else {
        prev.delete("q");
        prev.delete("page");
      }
      return prev;
    });
  };

  useEffect(() => {
    if (searchQueryFromUrl) {
      dispatch(
        getSearchTodos({ q: searchQueryFromUrl, page: currentPageFromUrl }),
      );
    } else {
      dispatch(todosThunk({ page: currentPageFromUrl }));
    }
  }, [dispatch, currentPageFromUrl, searchQueryFromUrl]);

  return (
    <>
      <Header />
      <div className="main">
        <div className="container">
          <div className="main__container">
            <Search onSearch={handleSearch} value={searchQueryFromUrl} />
            {isLoading ? (
              <div>Загрузка...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <>
                <div>
                  {todos.length > 0 ? (
                    <ul className="main__list">
                      {todos.map((todo) => (
                        <li key={todo.id} className="main__item">
                          <TodoItem todo={todo} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>Такой задачи нет</div>
                  )}
                </div>
                {paginations.totalPages > 1 && (
                  <Pagination
                    paginations={paginations}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
