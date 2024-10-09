import styles from "../CountriesCard.module.css";

type LikeButtonProps = {
  onClick: () => void;
};

export const LikeButton: React.FC<LikeButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.likeBtn} onClick={onClick}>
      like
    </button>
  );
};
