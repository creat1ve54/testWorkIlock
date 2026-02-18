import React, { useEffect, useState } from "react";
import Svg from "../../assets/svg/Svg";

const Header = () => {
  const [themeLigth, setThemeLigth] = useState(true);

  useEffect(() => {
    // Проверка сохраненной темы в localStorage
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

  const toggleTheme = () => setThemeLigth((prev) => !prev);

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
        </div>
      </div>
    </div>
  );
};

export default Header;
