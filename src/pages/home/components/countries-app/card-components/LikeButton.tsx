import styles from "../CountriesCard.module.css";

interface LikeButtonProps {
  handleUpRating: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ handleUpRating }) => {
  return (
    <button className={styles.likeBtn} onClick={handleUpRating}>
      like
    </button>
  );
};
