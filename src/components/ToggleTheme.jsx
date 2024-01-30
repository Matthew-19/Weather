import React from "react";
import "../App.css";
import { FaRegSun, FaRegMoon } from "react-icons/fa6";

export default function ToggleTheme(props) {
  const { handleToggle, theme } = props;

  const toggle_small =
    theme === "light" ? (
      <FaRegSun className="sun--icon" />
    ) : (
      <FaRegMoon className="moon--icon" />
    );

  const toggle_icon = window.innerWidth > 1024 ? (
    <div className="button--group">
      <FaRegSun className="sun--icon" />
      <div className="toggle--darkMode">
        <div className="circle"></div>
      </div>
      <FaRegMoon className="moon--icon" />
    </div>
  ) : (
    toggle_small
  );

  return (
    <div onClick={handleToggle} className="toggle--theme">
      {toggle_icon}
    </div>
  );
}
