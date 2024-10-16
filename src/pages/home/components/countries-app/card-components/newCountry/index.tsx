import styles from "./newCountry.module.css";

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
  return (
    <form className={styles.countryForm} onSubmit={handleSubmitNewCountry}>
      <div>
        <input
          value={value.name}
          name="name"
          type="text"
          placeholder="Country Name"
          onChange={handleChangeInput}
        />
        <p className={styles.errorMessage}> {errorMessage.name}</p>
      </div>
      <div>
        <input
          value={value.population}
          name="population"
          type="text"
          placeholder="Population"
          onChange={handleChangeInput}
        />
        <p className={styles.errorMessage}> {errorMessage.population}</p>
      </div>
      <div>
        <input
          value={value.capital}
          name="capital"
          type="text"
          placeholder="Capital"
          onChange={handleChangeInput}
        />
        <p className={styles.errorMessage}> {errorMessage.capital}</p>
      </div>
      <button type="submit">Add Country</button>
    </form>
  );
};
