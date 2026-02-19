import React, { useEffect, useState } from "react";
import { ITodo } from "../../type";
import { useAppDispatch } from "../../redux/hooks";
import { postTodoThunk } from "../../redux/todos/todosSlice";
import { putTodoThunk } from "../../redux/todo/todoSlice";
import { useForm, SubmitHandler } from "react-hook-form";

export type TodoFormInputs = {
  title: string;
  status: string;
  description: string;
};
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

  const [title, setTitle] = useState(todo?.title || "");
  const [status, setStatus] = useState(todo?.status || "В работе");
  const [description, setDescription] = useState(todo?.description || "");
  const [createdAt, setCreatedAt] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TodoFormInputs>({
    defaultValues: {
      title: todo?.title || "",
      status: todo?.status || "В работе",
      description: todo?.description || "",
    },
  });

  const onSubmit: SubmitHandler<TodoFormInputs> = (data) => {
    const formData: Partial<ITodo> = {
      ...data,
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
    // <form onSubmit={(e) => onSubmit(e)} className="todo-form">
    <form onSubmit={handleSubmit(onSubmit)} className="todo-form">
      <div>
        <label className={`field ${errors.title && 'field--error'}`} >
          <div className="field__title">Название</div>
          <input
            type="text"
            placeholder="Введите название"
            {...register("title", { required: "Обязательное поле" })}
          />
          {errors.title && (
            <div className="field__error">{errors.title.message}</div>
          )}
        </label>

        <div className={`field ${errors.status && 'field--error'}`}>
          <div className="field__title">Статус</div>
          <div className="custom-switch">
            <label className="custom-switch__item">
              <input
                type="radio"
                {...register("status", { required: "Обязательное поле" })}
                value="В работе"
                checked={status === "В работе"}
              />
              <span>В работe</span>
            </label>
            <label className="custom-switch__item">
              <input
                type="radio"
                {...register("status", { required: "Обязательное поле" })}
                value="Выполнено"
                checked={status === "Выполнено"}
              />
              <span>Выполнено</span>
            </label>
          </div>
          {errors.status && (
            <div className="field__error">{errors.status.message}</div>
          )}
        </div>

        <label className={`field ${errors.description && 'field--error'}`}>
          <div className="field__title">Описание</div>
          <textarea
            rows={5}
            placeholder="Введите описание"
            {...register("description", {
              required: "Обязательное поле",
            })}
          />
          {errors.description && (
            <div className="field__error">{errors.description.message}</div>
          )}
        </label>
      </div>

      <div className="todo-form__btns">
        <button className="todo-form__btn todo-form__btn--submit" type="submit">
          {isEdit ? "Сохранить" : "Создать"}
        </button>
        <button
          className="todo-form__btn todo-form__btn--cancel"
          onClick={onClose}
          type="button"
        >
          Отменить
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
