import { useParams } from "react-router-dom";
import styles from "../CountriesCard.module.css";
import { cardTranslations } from "./country/translations";

interface LikeButtonProps {
  handleUpRating: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ handleUpRating }) => {
  const { lang } = useParams<{ lang?: string }>();
  const currentLang: keyof typeof cardTranslations =
    lang === "en" || lang === "ka" ? lang : "en";
  const content = cardTranslations[currentLang];

  return (
    <button className={styles.likeBtn} onClick={handleUpRating}>
      {content.like}
    </button>
  );
};
