import React from "react";
import { Link } from "react-router-dom";
import { ITodo } from "../../type";
import Svg from "../../assets/svg/Svg";
import { deleteTodoThunk, putTodoThunk } from "../../redux/todo/todoSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useModal } from "../../hooks/useModal";
import Modal from "./Modal";
import TodoForm from "./TodoForm";

const TodoItem = ({ todo }: { todo: ITodo }) => {
  const { isOpen, open, close } = useModal();
  const dispatch = useAppDispatch();

  const onChangeStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let status = todo.status === "Выполнено" ? "В работе" : "Выполнено";

    const newTodo: Partial<ITodo> = {
      ...todo,
      status: status,
    };

    dispatch(putTodoThunk({ id: todo.id, updateTodo: newTodo }));
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(deleteTodoThunk(todo.id));
  };

  const onEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    open();
  };

  return (
    <>
      <Link
        className={`todo ${
          todo.status === "Выполнено" ? "todo--complited" : ""
        }`}
        to={`/todo/${todo.id}`}
      >
        <div className="todo__up">
          <h3 className="todo__title">{todo.title}</h3>
          <p className="todo__description">
            {todo.description ? todo.description : "Нет описания"}
          </p>
        </div>
        <div className="todo__bottom">
          <div
            className={`todo__status ${
              todo.status === "Выполнено"
                ? "todo__status--complited"
                : "todo__status--pending"
            }`}
          >
            Статус: <span>{todo.status}</span>
          </div>
          <div className="todo__btns">
            <button
              className="todo__btn todo__btn--complited"
              onClick={(e) => onChangeStatus(e)}
              aria-label="Изменить статус"
            >
              {todo.status === "Выполнено" ? (
                <Svg name="pending" width={14} height={14} />
              ) : (
                <Svg name="complited" width={20} height={20} />
              )}
            </button>
            <button
              className="todo__btn todo__btn--edit"
              onClick={(e) => onEdit(e)}
              aria-label="Изменить задачу"
            >
              <Svg name="edit" width={20} height={20} />
            </button>
            <button
              className="todo__btn todo__btn--delete"
              onClick={(e) => onDelete(e)}
              aria-label="Удалить задачу"
            >
              <Svg name="delete" width={20} height={20} />
            </button>
          </div>
        </div>
      </Link>

      <Modal
        isOpen={isOpen}
        onClose={close}
        title="Создание задачи"
        className="modal-todo-form"
      >
        <TodoForm onClose={close} todo={todo} isEdit={true} />
      </Modal>
    </>
  );
};

export default TodoItem;
