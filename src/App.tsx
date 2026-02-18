import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { todosThunk } from "./redux/todos/todosSlice";
function App() {
  const dispatch = useAppDispatch();
  const { todos, isLoading, error } = useAppSelector(
    (state) => state.postsSlice,
  );

  useEffect(() => {
    dispatch(todosThunk());
  }, []);

  console.log(todos);

  return (
    <>
      {isLoading ? (
        <div>...Загрузка</div>
      ) : (
        todos.map((todo) => (
          <div key={todo.id}>
            <h3>{todo.name ? todo.name : "Нет названия"}</h3>
            <p>{todo.title}</p>
            <div>Статус: {todo.completed.toString()}</div>
          </div>
        ))
      )}
    </>
  );
}

export default App;
