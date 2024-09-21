import countriesData from "./countries.ts";
import styles from "./CountriesCard.module.css";

interface CountryData {
  name: string;
  population: string;
  flag: string;
  capital: string;
}
interface CountryProps {
  data: CountryData;
}

const typedCountriesData: CountryData[] = countriesData;

export const CountriesCard = () => {
  return (
    <div className={styles.container}>
      {typedCountriesData.map((element, i) => (
        <Country data={element} key={i} />
      ))}
    </div>
  );
};

const Country: React.FC<CountryProps> = ({ data }) => {
  const formattedPopulation = data.population.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    " "
  );

  return (
    <div className={styles.singleCard}>
      <h1>{data.name}</h1>
      <img src={data.flag} alt="flagImg" />
      <div>
        <div className={styles.populationNumberBox}>
          <span>Population:</span>
          <span>{formattedPopulation}</span>
        </div>
        <p>
          <span>Capital:</span>
          <small> {data.capital}</small>
        </p>
      </div>
    </div>
  );
};
