import React, { useEffect, useState } from "react";
import { ITodo } from "../../type";
import { useAppDispatch } from "../../redux/hooks";
import { postTodoThunk } from "../../redux/todos/todosSlice";
import { putTodoThunk } from "../../redux/todo/todoSlice";

const TodoForm = ({
  todo,
  isEdit = false,
  onClose,
}: {
  todo?: ITodo;
  isEdit?: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("В работе");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: Partial<ITodo> = {
      title: title.trim(),
      status,
      description: description.trim(),
      ...(isEdit && todo?.id ? { id: todo.id } : {}),
    };

    if (isEdit && todo) {
      dispatch(putTodoThunk({ id: todo.id, updateTodo: formData }));
    } else {
      dispatch(postTodoThunk(formData));
    }

    onClose();
  };

  useEffect(() => {
    if (todo && isEdit) {
      setTitle(todo.title);
      setStatus(todo.status);
      setDescription(todo.description || "");
    }
  }, [todo, isEdit]);

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <label className="field">
        <div className="field__title">Название</div>
        <input
          type="text"
          placeholder="Введите название"
          value={title}
          onChange={(e) => onChangeTitle(e)}
        />
        <div className="field__error"></div>
      </label>

      <div className="field">
        <div className="field__title">Статус</div>
        <div className="custom-switch">
          <label className="custom-switch__item">
            <input
              type="radio"
              name="status"
              onChange={(e) => onChangeStatus(e)}
              value="В работe"
              checked={status === "В работе"}
            />
            <span>В работe</span>
          </label>
          <label className="custom-switch__item">
            <input
              type="radio"
              name="status"
              onChange={(e) => onChangeStatus(e)}
              value="Выполнено"
              checked={status === "Выполнено"}
            />
            <span>Выполнено</span>
          </label>
        </div>
        <div className="field__error"></div>
      </div>

      <label className="field">
        <div className="field__title">Описание</div>
        <textarea
          placeholder="Введите описание"
          value={description}
          onChange={(e) => onChangeDescription(e)}
        />
        <div className="field__error"></div>
      </label>

      <div>
        <button type="submit">{isEdit ? "Сохранить" : "Создать"}</button>
        <button type="button">Отменить</button>
      </div>
    </form>
  );
};

export default TodoForm;
