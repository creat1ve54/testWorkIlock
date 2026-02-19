import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteTodoThunk,
  getTodoThunk,
  putTodoThunk,
} from "../../redux/todo/todoSlice";
import Modal from "../components/Modal";
import TodoForm from "../components/TodoForm";
import { useModal } from "../../hooks/useModal";
import Header from "../components/Header";
import Svg from "../../assets/svg/Svg";
import { ITodo } from "../../type";

const DetailTodo = () => {
  const { isOpen, open, close } = useModal();
  const dispatch = useAppDispatch();
  const { todo, isLoading, error } = useAppSelector((state) => state.todoSlice);
  const params = useParams();
  const navigate = useNavigate();

  const onChangeStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (todo) {
      let status = todo.status === "Выполнено" ? "В работе" : "Выполнено";

      const newTodo: Partial<ITodo> = {
        ...todo,
        status: status,
      };

      dispatch(putTodoThunk({ id: todo.id, updateTodo: newTodo }));
    }
  };

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
    <div className="todo-detail">
      <Header isBack={true} />
      <div className="container">
        <div className="todo-detail__container">
          {isLoading ? (
            <div>...Загрузка</div>
          ) : error ? (
            <div>{error}</div>
          ) : !todo ? (
            <div>Нет такой задачи</div>
          ) : (
            <div className="todo-detail__info">
              <div className="todo-detail__id">#{todo.id}</div>
              <h2 className="todo-detail__title">{todo.title}</h2>
              <p className="todo-detail__description">{todo.description}</p>
              <div
                className={`todo-detail__status ${
                  todo.status === "Выполнено"
                    ? "todo-detail__status--complited"
                    : "todo-detail__status--pending"
                }`}
              >
                Статус: <span>{todo.status}</span>
              </div>

              <div className="todo-detail__btns">
                <button onClick={open} className="todo-detail__btn todo-detail__btn--edit">
                  <Svg name="edit" width={20} height={20} />
                </button>
                <button onClick={onDelete} className="todo-detail__btn todo-detail__btn--delete">
                  <Svg name="delete" width={20} height={20} />
                </button>
              </div>
              <Modal isOpen={isOpen} onClose={close} title="Создание задачи">
                <TodoForm onClose={close} todo={todo} isEdit={true} />
              </Modal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailTodo;
