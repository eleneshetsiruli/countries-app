import styles from "./Hero.module.css";

export const HeroSection = () => {
  return (
    <div className={styles.heroSectionContainer}>
      <div className={styles.heroContent}>
        <h2>Explore the World's Facts</h2>
        <h3>Discover detailed information about countries around the globe.</h3>
        <p>195 Countries</p>
        <p>7.8 Billion People</p>
      </div>
      <div className={styles.searchContent}>
        <input
          className={styles.findInput}
          type="text"
          placeholder="Find countrie..."
        />
        <button className={styles.arrowLogo}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
