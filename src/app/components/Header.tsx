import React, { useEffect, useState } from "react";
import Svg from "../../assets/svg/Svg";
import { useModal } from "../../hooks/useModal";
import Modal from "./Modal";
import TodoForm from "./TodoForm";
import { useNavigate } from "react-router";

const Header = ({ isBack = false }: { isBack?: boolean }) => {
  const { isOpen, open, close } = useModal();
  const [themeLigth, setThemeLigth] = useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setThemeLigth(savedTheme === "light");
    }
  }, []);

  useEffect(() => {
    const theme = themeLigth ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [themeLigth]);

  const onBack = () => {
    navigation(-1);
  };

  const onChangeTheme = () => {
    setThemeLigth((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__container">
          <div className="header__left">
            {isBack ? (
              <button className="header__back" onClick={onBack}>
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
              />
              {themeLigth ? (
                <Svg name="moon" width={20} height={20} />
              ) : (
                <Svg name="sun" width={20} height={20} />
              )}
            </label>
            <button onClick={open} className="header__add">
              <Svg name="task-add" width={20} height={20} />
              <span>Добавить задачу</span>
            </button>

            <button onClick={open} className="header__user">
              <Svg name="user" width={20} height={20} />
            </button>

            <Modal isOpen={isOpen} onClose={close} title="Добавить задачу">
              <TodoForm onClose={close} />
            </Modal>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
