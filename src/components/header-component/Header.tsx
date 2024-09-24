import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div className={styles.header}>
      <h1>WorldFacts</h1>
      <a href="#">Countries</a>
      <a href="#">Maps</a>
      <a href="#">References</a>
      <a href="About"></a>
    </div>
  );
};
