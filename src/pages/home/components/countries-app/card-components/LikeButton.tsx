import styles from "../CountriesCard.module.css";

export const LikeButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button className={styles.likeBtn} onClick={onClick}>
      like
    </button>
  );
};
