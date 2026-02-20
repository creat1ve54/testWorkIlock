import React, { useEffect, useState } from "react";
import Svg from "../../assets/svg/Svg";
import { useModal } from "../../hooks/useModal";
import Modal from "./Modal";
import TodoForm from "./TodoForm";
import { useNavigate } from "react-router-dom";
import Users from "./Users";

const Header = ({ isBack = false }: { isBack?: boolean }) => {
  const {
    isOpen: isTodoModalOpen,
    open: openTodoModal,
    close: closeTodoModal,
  } = useModal();

  const {
    isOpen: isUsersModalOpen,
    open: openUsersModal,
    close: closeUsersModal,
  } = useModal();
  const [themeLigth, setThemeLigth] = useState(true);
  const navigation = useNavigate();

  const onBack = () => {
    navigation(-1);
  };

  const onChangeTheme = () => {
    setThemeLigth((prev) => {
      const theme = !prev ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);

      return !prev;
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setThemeLigth(savedTheme === "light");
    }
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header__container">
          <div className="header__left">
            {isBack ? (
              <button
                className="header__back"
                onClick={onBack}
                aria-label="Назад"
              >
                <Svg name="arrow-left" width={20} height={20} />
                <span>Назад</span>
              </button>
            ) : (
              <div className="header__logo">
                <Svg name="task" width={40} height={40} />
                Менеджер задач
              </div>
            )}
          </div>

          <div className="header__right">
            <label className="header__switch">
              <input
                type="checkbox"
                checked={themeLigth}
                onChange={onChangeTheme}
                aria-label="Переключатель темы"
              />
              {themeLigth ? (
                <Svg name="moon" width={20} height={20} />
              ) : (
                <Svg name="sun" width={20} height={20} />
              )}
            </label>
            <button
              onClick={openTodoModal}
              className="header__add"
              aria-label="Добавить задачу"
            >
              <Svg name="task-add" width={20} height={20} />
              <span>Добавить задачу</span>
            </button>
            <Modal
              isOpen={isTodoModalOpen}
              onClose={closeTodoModal}
              title="Добавить задачу"
              className="modal-todo-form"
            >
              <TodoForm onClose={closeTodoModal} />
            </Modal>

            <button
              onClick={openUsersModal}
              className="header__user"
              aria-label="Список пользователей"
            >
              <Svg name="user" width={20} height={20} />
            </button>

            <Modal
              isOpen={isUsersModalOpen}
              onClose={closeUsersModal}
              title="Список пользователь"
              className="modal-users"
            >
              <Users onClose={closeUsersModal} />
            </Modal>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
