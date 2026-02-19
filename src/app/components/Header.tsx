import React, { useEffect, useState } from "react";
import Svg from "../../assets/svg/Svg";
import { useModal } from "../../hooks/useModal";
import Modal from "./Modal";
import TodoForm from "./TodoForm";

const Header = () => {
  const { isOpen, open, close } = useModal();
  const [themeLigth, setThemeLigth] = useState(true);

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

  const onAddTodo = () => {};

  const onChangeTheme = () => {
    setThemeLigth((prev) => !prev);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header__container">
          <div>
            <Svg name="task" width={40} height={40} />
            Менеджер задач
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={themeLigth}
                onChange={onChangeTheme}
              />
              {themeLigth ? (
                <Svg name="moon" width={40} height={40} />
              ) : (
                <Svg name="sun" width={40} height={40} />
              )}
            </label>
          </div>

          <button onClick={open}>Добавить задачу</button>

          <Modal isOpen={isOpen} onClose={close} title="Создание задачи">
            <TodoForm onClose={close}/>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Header;
