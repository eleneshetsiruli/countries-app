import { useParams } from "react-router-dom";
import styles from "./newCountry.module.css";
import { cardTranslations } from "../country/translations";

interface NewCountryProps {
  handleSubmitNewCountry: (ev: React.FormEvent<HTMLFormElement>) => void;
  handleChangeInput: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  value: {
    name: string;
    population: string;
    capital: string;
    flag: string;
    id: string;
    rating: number;
    deleted: boolean;
    originalIndex: number;
  };
  errorMessage: {
    name: string;
    population: string;
    capital: string;
  };
}

export const NewCountry = ({
  handleSubmitNewCountry,
  handleChangeInput,
  value,
  errorMessage,
}: NewCountryProps) => {
  const { lang } = useParams<{ lang?: string }>();
  const currentLang: keyof typeof cardTranslations =
    lang === "en" || lang === "ka" ? lang : "en";
  const content = cardTranslations[currentLang];
  return (
    <form className={styles.countryForm} onSubmit={handleSubmitNewCountry}>
      <div>
        <input
          value={value.name}
          name="name"
          type="text"
          placeholder={content.countryName}
          onChange={handleChangeInput}
        />
        <p className={styles.errorMessage}> {errorMessage.name}</p>
      </div>

      <div>
        <input
          value={value.population}
          name="population"
          type="text"
          placeholder={content.population}
          onChange={handleChangeInput}
        />
        <p className={styles.errorMessage}> {errorMessage.population}</p>
      </div>
      <div>
        <input
          value={value.capital}
          name="capital"
          type="text"
          placeholder={content.capital}
          onChange={handleChangeInput}
        />
        <p className={styles.errorMessage}> {errorMessage.capital}</p>
      </div>
      <button type="submit">{content.add}</button>
    </form>
  );
};
