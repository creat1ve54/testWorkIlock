import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteTodoThunk, getTodoThunk } from "../../redux/todo/todoSlice";
import Modal from "../components/Modal";
import TodoForm from "../components/TodoForm";
import { useModal } from "../../hooks/useModal";

const DetailTodo = () => {
  const { isOpen, open, close } = useModal();
  const dispatch = useAppDispatch();
  const { todo, isLoading, error } = useAppSelector((state) => state.todoSlice);
  const params = useParams();
  const navigate = useNavigate();

  const onDelete = () => {
    if (todo) {
      dispatch(deleteTodoThunk(todo.id)).then(() => {
        navigate("/");
      });
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getTodoThunk(params.id));
    }
  }, []);

  return (
    <div className="todo">
      <div className="container">
        <div className="todo__container">
          {isLoading ? (
            <div>...Загрузка</div>
          ) : error ? (
            <div>{error}</div>
          ) : !todo ? (
            <div>Нет такой задачи</div>
          ) : (
            <div>
              <div className="todo__id">#{todo.id}</div>
              <div className="todo__title">{todo.title}</div>
              <div className="todo__description">{todo.description}</div>
              <div className="todo__status">{todo.status}</div>

              <div>
                <button onClick={open}>Изменить</button>
                <button onClick={onDelete}>Удалить</button>
              </div>
              <Modal isOpen={isOpen} onClose={close} title="Создание задачи">
                <TodoForm onClose={close} todo={todo} isEdit={true}/>
              </Modal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailTodo;
