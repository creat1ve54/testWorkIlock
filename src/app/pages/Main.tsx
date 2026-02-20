import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSearchTodos, todosThunk } from "../../redux/todos/todosSlice";
import Header from "../components/Header";
import TodoItem from "../components/TodoItem";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { deleteTodoThunk } from "../../redux/todo/todoSlice";

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

  const handleDeleteTodo = async (id: string) => {
    await dispatch(deleteTodoThunk(id));

    if (todos.length === 1) {
      setSearchParams((prev) => {
        prev.set("page", "1");
        return prev;
      });
    } else {
      loadTodos(currentPageFromUrl, searchQueryFromUrl);
    }
  };

  const handleUpdateTodo = () => {
    loadTodos(currentPageFromUrl, searchQueryFromUrl);
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

  const loadTodos = useCallback(
    (page: number, query: string = "") => {
      if (query.trim()) {
        dispatch(getSearchTodos({ q: query, page }));
      } else {
        dispatch(todosThunk({ page }));
      }
    },
    [dispatch],
  );

   useEffect(() => {
    if (!isLoading && paginations.totalPages > 0) {
      const totalPages = paginations.totalPages;
      const currentPage = currentPageFromUrl;

      if (currentPage > totalPages) {
        setSearchParams(prev => {
          prev.set("page", totalPages.toString());
          if (searchQueryFromUrl.trim()) {
            prev.set("q", searchQueryFromUrl.trim());
          } else {
            prev.delete("q");
          }
          return prev;
        });
      }
      
      if (totalPages === 0 && currentPage > 1) {
        setSearchParams(prev => {
          prev.set("page", "1");
          if (searchQueryFromUrl.trim()) {
            prev.set("q", searchQueryFromUrl.trim());
          } else {
            prev.delete("q");
          }
          return prev;
        });
      }
    }
  }, [isLoading, paginations.totalPages, currentPageFromUrl, searchQueryFromUrl, setSearchParams]);

  useEffect(() => {
    loadTodos(currentPageFromUrl, searchQueryFromUrl);
  }, [currentPageFromUrl, searchQueryFromUrl, loadTodos]);

  return (
    <>
      <Header onUpdateTodo={handleUpdateTodo} />
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
                          <TodoItem
                            todo={todo}
                            onDeleteTodo={() => handleDeleteTodo(todo.id)}
                            onUpdateTodo={handleUpdateTodo}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>Таких задач нет</div>
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
