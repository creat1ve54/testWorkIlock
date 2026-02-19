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

  const {
    register,
    handleSubmit,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="todo-form">
      <div>
        <label className={`field ${errors.title ? 'field--error' : ''}`}>
          <div className="field__title">Название</div>
          <input
            type="text"
            placeholder="Введите название"
            {...register("title", { required: "Обязательное поле" })}
            aria-label="Нзавание задачи"
          />
          {errors.title && (
            <div className="field__error">{errors.title.message}</div>
          )}
        </label>

        <div className={`field ${errors.status ? 'field--error' : ''}`}>
          <div className="field__title">Статус</div>
          <div className="custom-switch">
            <label className="custom-switch__item">
              <input
                type="radio"
                {...register("status", { required: "Обязательное поле" })}
                value="В работе"
                aria-label="Стутус"
              />
              <span>В работе</span> 
            </label>
            <label className="custom-switch__item">
              <input
                type="radio"
                {...register("status", { required: "Обязательное поле" })}
                value="Выполнено"
                aria-label="Статус"
              />
              <span>Выполнено</span>
            </label>
          </div>
          {errors.status && (
            <div className="field__error">{errors.status.message}</div>
          )}
        </div>

        <label className={`field ${errors.description ? 'field--error' : ''}`}>
          <div className="field__title">Описание</div>
          <textarea
            rows={5}
            placeholder="Введите описание"
            {...register("description", {
              required: "Обязательное поле",
            })}
            aria-label="Описание задачи"
          />
          {errors.description && (
            <div className="field__error">{errors.description.message}</div>
          )}
        </label>
      </div>

      <div className="todo-form__btns">
        <button className="todo-form__btn todo-form__btn--submit" type="submit" aria-label="Отправить форму">
          {isEdit ? "Сохранить" : "Создать"}
        </button>
        <button
          className="todo-form__btn todo-form__btn--cancel"
          onClick={onClose}
          type="button"
          aria-label="Отменить"
        >
          Отменить
        </button>
      </div>
    </form>
  );
};

export default TodoForm;