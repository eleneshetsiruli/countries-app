import { NavLink, NavLinkRenderProps } from "react-router-dom";
import styles from "./Header.module.css";

const handleActiveNav = ({ isActive }: NavLinkRenderProps) => {
  return isActive ? styles.activeNavItem : "";
};

export const Header = () => {
  return (
    <div className={styles.header}>
      <h1>WorldFacts</h1>
      <NavLink className={handleActiveNav} to={"/"}>
        Home
      </NavLink>
      <NavLink className={handleActiveNav} to={"about"}>
        About
      </NavLink>
      <NavLink className={handleActiveNav} to={"maps"}>
        Maps
      </NavLink>
      <NavLink className={handleActiveNav} to={"/"}>
        References
      </NavLink>
    </div>
  );
};
