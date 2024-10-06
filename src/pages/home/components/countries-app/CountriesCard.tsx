import {
  CardContent,
  CardDetails,
  CardImg,
  CardTitle,
  SingleCard,
} from "../../../../data/index.ts";
import countriesData from "../../../../data/countries.ts";
import styles from "./CountriesCard.module.css";

interface CountryData {
  name: string;
  population: string;
  flag: string;
  capital: string;
  id: string;
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
    <SingleCard
      renderId={data.id}
      renderTitle={<CardTitle title={data.name} />}
      renderImg={<CardImg img={data.flag} />}
    >
      <CardContent>
        <CardDetails label="population:" population={formattedPopulation} />
        <CardDetails label="Capital" population={data.capital} />
      </CardContent>
    </SingleCard>
  );
};
