import countriesData from "./countries-app/countries.ts";

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
    <div className="container">
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
    <div className="single-card">
      <h1>{data.name}</h1>
      <img src={data.flag} alt="flagImg" />
      <div className="more-info">
        <div className="population-number-box">
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
