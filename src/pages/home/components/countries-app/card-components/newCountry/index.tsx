import styles from "./newCountry.module.css";

interface NewCountryProps {
  handleSubmitNewCountry: (ev: React.FormEvent<HTMLFormElement>) => void;
}

export const NewCountry = ({ handleSubmitNewCountry }: NewCountryProps) => {
  return (
    <form className={styles.countryForm} onSubmit={handleSubmitNewCountry}>
      <input name="countryName" type="text" placeholder="Country Name" />
      <input name="countryPopulation" type="text" placeholder="Population" />
      <input name="countryCapital" type="text" placeholder="Capital" />
      <button type="submit">Add Country</button>
    </form>
  );
};
