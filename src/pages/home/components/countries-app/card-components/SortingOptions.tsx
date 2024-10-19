import { ChangeEvent } from "react";
import styles from "../CountriesCard.module.css";
import { useParams } from "react-router-dom";
import { cardTranslations } from "./country/translations";

interface SortingOptionsProps {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const SortingOptions: React.FC<SortingOptionsProps> = ({ onChange }) => {
  const { lang } = useParams<{ lang?: string }>();
  const currentLang: keyof typeof cardTranslations =
    lang === "en" || lang === "ka" ? lang : "en";
  const content = cardTranslations[currentLang];
  return (
    <select className={styles.selectContainer} onChange={onChange}>
      <option value="low">{content.lowTo}</option>
      <option value="hight">{content.hightTo}</option>
    </select>
  );
};
